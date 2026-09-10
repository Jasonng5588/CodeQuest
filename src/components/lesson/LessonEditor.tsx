"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Play, RotateCcw, Lightbulb, CheckCheck, AlertCircle,
  ChevronRight, BookOpen, Swords, Zap, Wrench, Trophy, ArrowLeft, X, Copy, Check
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";

interface TestCase {
  description?: string;
  expected_output?: string;
  input?: string;
}

interface TestResult {
  passed: boolean;
  description: string;
  expected: string;
  actual: string;
}

interface LessonEditorProps {
  lesson: {
    id: string;
    title: string;
    type: string;
    explanation_md: string;
    starter_code: string;
    reference_solution: string;
    hints: string[];
    test_cases: TestCase[];
    xp_reward: number;
    unit_id?: string;
  };
  trackId: string;
  trackTitle: string;
  nextLessonId?: string;
}

const TYPE_ICONS = {
  concept:   BookOpen,
  challenge: Swords,
  boss:      Zap,
  project:   Wrench,
};

const TYPE_COLORS = {
  concept:   "#6366f1",
  challenge: "#06b6d4",
  boss:      "#f59e0b",
  project:   "#10b981",
};

function normalizeOutput(s: string): string {
  return s.replace(/\r\n/g, "\n").trim();
}

// ── JavaScript execution engine (for JS tracks) ─────────────────────────
function runCode(code: string, testCases: TestCase[]): { results: TestResult[]; consoleOutput: string[] } {
  const originalLog = console.log;
  const captured: string[] = [];
  const mockLog = (...args: unknown[]) => {
    const str = args.map(a => {
      if (typeof a === "object" && a !== null) return JSON.stringify(a);
      return String(a);
    }).join(" ");
    captured.push(str);
  };

  try {
    console.log = mockLog as typeof console.log;
    // eslint-disable-next-line no-new-func
    const fn = new Function(code);
    fn();
    console.log = originalLog;
  } catch (err) {
    console.log = originalLog;
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      results: testCases.map(tc => ({
        passed: false,
        description: tc.description ?? "Test",
        expected: tc.expected_output ?? "",
        actual: `Error: ${errMsg}`,
      })),
      consoleOutput: [`Error: ${errMsg}`],
    };
  }

  return buildResults(captured, testCases);
}

// ── Pyodide Python execution engine ──────────────────────────────────────
let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoading;
  pyodideLoading = (async () => {
    // Dynamically load pyodide from CDN
    if (!(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.6/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    pyodideInstance = await (window as any).loadPyodide();
    return pyodideInstance;
  })();
  return pyodideLoading;
}

async function runPython(code: string, testCases: TestCase[]): Promise<{ results: TestResult[]; consoleOutput: string[] }> {
  try {
    const pyodide = await getPyodide();
    const captured: string[] = [];

    // Redirect Python stdout
    pyodide.runPython(`
import sys
from io import StringIO
_output_buffer = StringIO()
sys.stdout = _output_buffer
`);

    try {
      pyodide.runPython(code);
    } catch (err: any) {
      const errMsg = String(err).replace(/^PythonError: /, "").split("\n").pop() ?? String(err);
      return {
        results: testCases.map(tc => ({
          passed: false,
          description: tc.description ?? "Test",
          expected: tc.expected_output ?? "",
          actual: `Error: ${errMsg}`,
        })),
        consoleOutput: [`Error: ${errMsg}`],
      };
    }

    const output: string = pyodide.runPython(`_output_buffer.getvalue()`);
    // Restore stdout
    pyodide.runPython(`sys.stdout = sys.__stdout__`);

    output.split("\n").forEach(line => { if (line !== "") captured.push(line); });
    return buildResults(captured, testCases);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      results: testCases.map(tc => ({
        passed: false,
        description: tc.description ?? "Test",
        expected: tc.expected_output ?? "",
        actual: `Error: ${errMsg}`,
      })),
      consoleOutput: [`Error: ${errMsg}`],
    };
  }
}

// ── Shared result builder ─────────────────────────────────────────────────
function buildResults(captured: string[], testCases: TestCase[]): { results: TestResult[]; consoleOutput: string[] } {
  const allOutput = normalizeOutput(captured.join("\n"));
  const outputLines = allOutput.split("\n").map(l => l.trim());

  const results: TestResult[] = testCases.map(tc => {
    const expected = normalizeOutput(tc.expected_output ?? "");
    const expectedLines = expected.split("\n").map(l => l.trim());

    let passed = false;
    if (expected === "") {
      passed = true;
    } else if (expectedLines.length === 1) {
      passed = outputLines.some(line => line === expected) || allOutput.includes(expected);
    } else {
      passed = outputLines.join("\n").includes(expectedLines.join("\n")) || allOutput.includes(expected);
    }

    return {
      passed,
      description: tc.description ?? "Output check",
      expected,
      actual: allOutput,
    };
  });

  return { results, consoleOutput: captured };
}

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
}

function CodeEditor({ value, onChange, readOnly = false }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineCount = value.split("\n").length;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    const ta = e.currentTarget;
    const { selectionStart, selectionEnd } = ta;
    const val = ta.value;

    if (e.key === "Tab") {
      e.preventDefault();
      const newVal = val.substring(0, selectionStart) + "  " + val.substring(selectionEnd);
      onChange(newVal);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 2;
          textareaRef.current.selectionEnd = selectionStart + 2;
        }
      });
    } else if (e.key === "Enter") {
      const lineStart = val.lastIndexOf("\n", selectionStart - 1) + 1;
      const currentLine = val.substring(lineStart, selectionStart);
      const indent = currentLine.match(/^(\s*)/)?.[1] ?? "";
      const extra = currentLine.trimEnd().endsWith("{") ? "  " : "";
      e.preventDefault();
      const newVal = val.substring(0, selectionStart) + "\n" + indent + extra + val.substring(selectionEnd);
      onChange(newVal);
      const newPos = selectionStart + 1 + indent.length + extra.length;
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newPos;
          textareaRef.current.selectionEnd = newPos;
        }
      });
    }
  }, [readOnly, onChange]);

  return (
    <div style={{ display: "flex", height: "100%", background: "#1e1e1e", overflow: "hidden" }}>
      <style>{`
        .cq-editor-gutter {
          width: 48px;
          flex-shrink: 0;
          background: #1e1e1e;
          border-right: 1px solid #2d2d2d;
          padding-top: 14px;
          text-align: right;
          user-select: none;
          overflow: hidden;
        }
        .cq-editor-gutter span {
          display: block;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
          font-size: 13px;
          line-height: 1.7;
          color: #444;
          padding-right: 10px;
        }
        .cq-editor-textarea {
          flex: 1;
          padding: 14px 16px;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
          font-size: 14px;
          line-height: 1.7;
          color: #d4d4d4;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          tab-size: 2;
          white-space: pre;
          overflow: auto;
          caret-color: #aeafad;
        }
        .cq-editor-textarea::selection { background: rgba(99,102,241,0.3); }
      `}</style>
      <div className="cq-editor-gutter">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="cq-editor-textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}

const PYTHON_TRACKS = new Set(["python"]);

export default function LessonEditor({ lesson, trackId, trackTitle, nextLessonId }: LessonEditorProps) {
  const [code, setCode] = useState(lesson.starter_code);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const { refreshProfile } = useUser();

  // Eagerly start loading Pyodide in background for Python tracks
  useEffect(() => {
    if (PYTHON_TRACKS.has(trackId)) {
      getPyodide().then(() => setPyodideReady(true)).catch(() => {});
    }
  }, [trackId]);

  const TypeIcon = TYPE_ICONS[lesson.type as keyof typeof TYPE_ICONS] ?? Swords;
  const typeColor = TYPE_COLORS[lesson.type as keyof typeof TYPE_COLORS] ?? "#6366f1";
  const allPassed = results !== null && (results.length === 0 || results.every(r => r.passed));

  async function handleRun() {
    setRunning(true);
    setResults(null);
    setConsoleOutput([]);

    let res: TestResult[];
    let out: string[];

    if (PYTHON_TRACKS.has(trackId)) {
      const r = await runPython(code, lesson.test_cases);
      res = r.results;
      out = r.consoleOutput;
    } else {
      const r = runCode(code, lesson.test_cases);
      res = r.results;
      out = r.consoleOutput;
    }

    setResults(res);
    setConsoleOutput(out);
    setRunning(false);

    const isSuccess = res.length === 0 || res.every(r => r.passed);
    if (isSuccess && !completed) {
      setCompleted(true);
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetch("/api/progress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
              trackId,
              unitId: lesson.unit_id || trackId + "-u1",
              lessonId: lesson.id,
              xpReward: lesson.xp_reward,
            }),
          });
          // Refresh XP in Navbar immediately (fallback if realtime not enabled)
          setTimeout(() => refreshProfile(), 500);
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }
  }

  function handleReset() {
    setCode(lesson.starter_code);
    setResults(null);
    setConsoleOutput([]);
    setShowSolution(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(showSolution ? lesson.reference_solution : code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const displayCode = showSolution ? lesson.reference_solution : code;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 72px)", overflow: "hidden" }}>

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 20px", background: "var(--surface-1)", borderBottom: "1px solid var(--border)",
        flexShrink: 0, gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <a href={`/tracks/${trackId}`} style={{
            display: "flex", alignItems: "center", gap: "5px",
            color: "var(--text-muted)", textDecoration: "none", fontSize: "13px", flexShrink: 0,
          }}>
            <ArrowLeft size={14} />{trackTitle}
          </a>
          <span style={{ color: "var(--border)", flexShrink: 0 }}>›</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "5px", flexShrink: 0,
              padding: "3px 10px", borderRadius: "20px",
              background: `${typeColor}20`, border: `1px solid ${typeColor}40`,
              color: typeColor, fontSize: "12px", fontWeight: "600",
            }}>
              <TypeIcon size={12} />
              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
            </div>
            <span style={{ fontWeight: "700", fontSize: "15px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {lesson.title}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "4px 12px", borderRadius: "20px",
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
            color: "#f59e0b", fontSize: "12px", fontWeight: "700",
          }}>
            <Trophy size={12} />
            +{lesson.xp_reward} XP
          </div>
          {lesson.hints.length > 0 && (
            <button onClick={() => { setShowHint(true); setHintIndex(0); }} style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "8px",
              background: "var(--surface-2)", border: "1px solid var(--border)",
              color: "var(--text-secondary)", fontSize: "13px", cursor: "pointer",
            }}>
              <Lightbulb size={14} color="#f59e0b" /> Hint
            </button>
          )}
        </div>
      </div>

      {/* Split layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left: Instructions */}
        <div style={{
          width: "380px", flexShrink: 0, overflow: "auto", padding: "24px",
          borderRight: "1px solid var(--border)", background: "var(--surface-1)",
        }}>
          {lesson.test_cases.length > 0 && (
            <div style={{
              marginBottom: "20px", padding: "12px 16px",
              background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "10px",
            }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#6366f1", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {lesson.test_cases.length} Test Case{lesson.test_cases.length > 1 ? "s" : ""}
              </div>
              {lesson.test_cases.map((tc, i) => (
                <div key={i} style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                  <span style={{ color: "#6366f1" }}>›</span> {tc.description}
                </div>
              ))}
            </div>
          )}
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: mdToHtml(lesson.explanation_md) }}
            style={{ fontSize: "14px", lineHeight: "1.75", color: "var(--text-secondary)" }}
          />
        </div>

        {/* Right: Editor + Console */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Editor toolbar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "6px 14px", background: "#1a1a1a", borderBottom: "1px solid #2d2d2d",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}>
                {showSolution ? "solution.js (read-only)" : "main.js"}
              </span>
              {showSolution && (
                <span style={{
                  fontSize: "10px", padding: "1px 8px", borderRadius: "10px",
                  background: "rgba(245,158,11,0.15)", color: "#f59e0b", fontWeight: "700",
                }}>SOLUTION</span>
              )}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={handleCopy} style={{
                display: "flex", alignItems: "center", gap: "4px",
                padding: "4px 10px", borderRadius: "6px",
                background: "transparent", border: "1px solid #333",
                color: copied ? "#4ade80" : "#777", fontSize: "12px", cursor: "pointer",
              }}>
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleReset} style={{
                display: "flex", alignItems: "center", gap: "4px",
                padding: "4px 10px", borderRadius: "6px",
                background: "transparent", border: "1px solid #333",
                color: "#777", fontSize: "12px", cursor: "pointer",
              }}>
                <RotateCcw size={11} /> Reset
              </button>
              <button onClick={() => setShowSolution(!showSolution)} style={{
                display: "flex", alignItems: "center", gap: "4px",
                padding: "4px 10px", borderRadius: "6px",
                background: showSolution ? "rgba(245,158,11,0.15)" : "transparent",
                border: showSolution ? "1px solid rgba(245,158,11,0.4)" : "1px solid #333",
                color: showSolution ? "#f59e0b" : "#777",
                fontSize: "12px", cursor: "pointer",
              }}>
                {showSolution ? "Hide Solution" : "Solution"}
              </button>
            </div>
          </div>

          {/* Instant-loading code editor */}
          <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
            <CodeEditor
              value={displayCode}
              onChange={v => { if (!showSolution) setCode(v); }}
              readOnly={showSolution}
            />
          </div>

          {/* Console panel */}
          <div style={{
            height: "220px", flexShrink: 0, display: "flex", flexDirection: "column",
            background: "#111", borderTop: "1px solid #2d2d2d",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "6px 14px", background: "#161616", borderBottom: "1px solid #2d2d2d", flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "11px", color: "#555", fontFamily: "monospace", fontWeight: "700", letterSpacing: "0.08em" }}>CONSOLE</span>
                {results !== null && (
                  <span style={{ fontSize: "11px", fontWeight: "700", color: allPassed ? "#4ade80" : "#f87171" }}>
                    {allPassed ? `✓ ${results.length} passed` : `✗ ${results.filter(r => !r.passed).length}/${results.length} failed`}
                  </span>
                )}
              </div>
              <button
                onClick={handleRun}
                disabled={running}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 20px", borderRadius: "8px", border: "none",
                  background: running ? "#1a3a2a" : "#16a34a",
                  color: "white", fontSize: "13px", fontWeight: "700",
                  cursor: running ? "not-allowed" : "pointer",
                  boxShadow: running ? "none" : "0 2px 8px rgba(22,163,74,0.35)",
                }}
              >
                <Play size={13} fill="white" />
                {running ? "Running..." : "Run Code"}
              </button>
            </div>

            <div style={{
              flex: 1, overflow: "auto", padding: "10px 16px",
              fontFamily: "JetBrains Mono, Consolas, monospace", fontSize: "13px",
              display: "flex", flexDirection: "column", gap: "3px",
            }}>
              {consoleOutput.map((line, i) => (
                <div key={i} style={{ color: line.startsWith("Error") ? "#f87171" : "#d4d4d4", lineHeight: "1.6" }}>
                  <span style={{ color: "#444", marginRight: "8px", userSelect: "none" }}>›</span>
                  {line}
                </div>
              ))}

              {results !== null && results.length > 0 && (
                <div style={{ marginTop: consoleOutput.length > 0 ? "8px" : 0, display: "flex", flexDirection: "column", gap: "3px" }}>
                  {results.map((r, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: "8px",
                      padding: "5px 10px", borderRadius: "6px",
                      background: r.passed ? "rgba(22,163,74,0.1)" : "rgba(239,68,68,0.08)",
                      border: `1px solid ${r.passed ? "rgba(22,163,74,0.2)" : "rgba(239,68,68,0.15)"}`,
                    }}>
                      {r.passed
                        ? <CheckCheck size={14} color="#4ade80" style={{ marginTop: 2, flexShrink: 0 }} />
                        : <AlertCircle size={14} color="#f87171" style={{ marginTop: 2, flexShrink: 0 }} />
                      }
                      <div>
                        <span style={{ color: r.passed ? "#86efac" : "#fca5a5", fontSize: "12px", fontWeight: "600" }}>
                          {r.description}
                        </span>
                        {!r.passed && (
                          <div style={{ color: "#666", fontSize: "11px", marginTop: "2px" }}>
                            expected: <span style={{ color: "#fbbf24" }}>{r.expected}</span>
                            {" · got: "}<span style={{ color: "#f87171" }}>{r.actual.substring(0, 80)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {consoleOutput.length === 0 && results === null && (
                <span style={{ color: "#333", fontSize: "12px" }}>
                  Write your solution and click Run Code to test it...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success overlay */}
      {allPassed && completed && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "var(--surface-1)", borderRadius: "20px",
            padding: "48px 40px", textAlign: "center", maxWidth: "380px", width: "90%",
            border: "1px solid rgba(22,163,74,0.3)",
            boxShadow: "0 0 60px rgba(22,163,74,0.15)",
          }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "rgba(22,163,74,0.15)", border: "2px solid #16a34a",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <CheckCheck size={34} color="#4ade80" />
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "6px" }}>Challenge Complete!</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "14px" }}>All tests passed</p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 20px", borderRadius: "20px", marginBottom: "28px",
              background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b", fontWeight: "800", fontSize: "18px",
            }}>
              <Trophy size={18} />+{lesson.xp_reward} XP
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setCompleted(false)} style={{
                padding: "10px 20px", borderRadius: "10px",
                background: "var(--surface-2)", border: "1px solid var(--border)",
                color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px",
              }}>Keep Editing</button>
              {nextLessonId ? (
                <a href={`/tracks/${trackId}/${nextLessonId}`} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "700",
                }}>
                  Next Lesson <ChevronRight size={16} />
                </a>
              ) : (
                <a href={`/tracks/${trackId}`} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "700",
                }}>
                  Back to Track <ChevronRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hint modal */}
      {showHint && lesson.hints.length > 0 && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 900,
        }}>
          <div style={{
            background: "var(--surface-1)", borderRadius: "16px",
            padding: "28px", maxWidth: "420px", width: "90%",
            border: "1px solid rgba(245,158,11,0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700" }}>
                <Lightbulb size={18} color="#f59e0b" />
                Hint {hintIndex + 1} of {lesson.hints.length}
              </div>
              <button onClick={() => { setShowHint(false); setHintIndex(0); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                <X size={18} />
              </button>
            </div>
            <div style={{
              padding: "14px 16px", borderRadius: "10px",
              background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)",
              marginBottom: "16px",
            }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", margin: 0, fontSize: "14px" }}>
                {lesson.hints[hintIndex]}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {hintIndex > 0 && (
                <button onClick={() => setHintIndex(i => i - 1)} style={{
                  padding: "8px 14px", borderRadius: "8px",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  color: "var(--text-secondary)", cursor: "pointer", fontSize: "13px",
                }}>Prev</button>
              )}
              {hintIndex < lesson.hints.length - 1 && (
                <button onClick={() => setHintIndex(i => i + 1)} style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "8px 14px", borderRadius: "8px",
                  background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
                  color: "#f59e0b", cursor: "pointer", fontSize: "13px",
                }}>
                  Next Hint <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function mdToHtml(md: string): string {
  return md
    .replace(/^# (.+)$/gm, '<h1 style="font-size:20px;font-weight:800;color:var(--text-primary);margin:0 0 14px">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:15px;font-weight:700;color:var(--text-primary);margin:18px 0 8px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:13px;font-weight:700;color:var(--text-primary);margin:14px 0 6px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code style="background:rgba(99,102,241,0.1);padding:2px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:12px;color:#a78bfa">$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="background:#141414;padding:14px 16px;border-radius:10px;overflow:auto;margin:12px 0;border:1px solid #2d2d2d"><code style="font-family:JetBrains Mono,monospace;font-size:13px;color:#d4d4d4;white-space:pre;line-height:1.6">$1</code></pre>')
    .replace(/^- (.+)$/gm, '<li style="margin:5px 0;padding-left:4px;color:var(--text-secondary)">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="padding-left:20px;margin:8px 0">$&</ul>')
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}