import sys, glob, re

def fix_unbalanced_quotes(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix expected_output: "..." -> expected_output: '...'
    # The regex finds `expected_output: "` followed by anything up to `" }` or `",`
    # We use a non-greedy match.
    def repl_expected(m):
        # m.group(1) is expected_output: 
        # m.group(2) is the inner string
        inner = m.group(2)
        # return with single quotes
        return f"{m.group(1)}'{inner}'"
    
    content = re.sub(r'(expected_output:\s*)"(.*)"(?=\s*[,\}])', repl_expected, content)
    content = re.sub(r'(description:\s*)"(.*)"(?=\s*[,\}])', repl_expected, content)

    # Fix hints: ["...", "..."]
    # We will find the content between `hints: [` and `]`
    def repl_hints(m):
        prefix = m.group(1)
        inner = m.group(2)
        suffix = m.group(3)
        
        # We need to find strings separated by comma.
        # But wait, `inner` is something like `"hint 1", "hint "2"", "hint 3"`
        # Because we can't easily parse it, let's just find `", "` or `", ` and split.
        # Actually, if we just split by `",\s*"` we might split inside a string.
        # Let's replace the boundary quotes of each hint.
        # A hint starts with `"` (or after a space/comma) and ends with `"` (before a comma or bracket).
        # regex to match `"..."` that might contain inner quotes:
        # Match `"` at start or after `,\s*`. Match `"` at end or before `\s*,`.
        # This is tricky. Let's do it simply:
        # Since these are hints, they are single lines. We can just replace `"` with `'` if they are at the boundaries.
        parts = re.split(r'(?<=,)\s*', inner)
        new_parts = []
        for p in parts:
            p = p.strip()
            if p.startswith('"') and p.endswith('"'):
                p = "'" + p[1:-1] + "'"
            new_parts.append(p)
        
        return prefix + ", ".join(new_parts) + suffix

    content = re.sub(r'(hints:\s*\[)(.*?)(\])', repl_hints, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = glob.glob('src/lib/data/*.ts')
for f in files:
    fix_unbalanced_quotes(f)
    print("Fixed unbalanced quotes in:", f)
