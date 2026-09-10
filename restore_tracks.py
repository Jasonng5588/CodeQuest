import json, re

transcript_path = r"C:\Users\jack8\.gemini\antigravity-ide\brain\4d29338d-2897-4cb4-bf63-f5e345d76ad5\.system_generated\logs\transcript_full.jsonl"
files_to_restore = [
    "src/lib/data/db-sass-tracks.ts",
    "src/lib/data/html-css-tracks.ts",
    "src/lib/data/lesson-content.ts",
    "src/lib/data/more-tracks.ts",
    "src/lib/data/remaining-tracks.ts",
    "src/lib/data/vue-track.ts",
    "src/lib/data/typescript-track.ts",
    "src/lib/data/sql-track.ts",
    "src/lib/data/c-cpp-swift-tracks.ts",
    "src/lib/data/git-track.ts",
    "src/lib/data/go-track.ts",
    "src/lib/data/advanced-tracks.ts"
]

file_contents = {f: None for f in files_to_restore}

# We want the LAST write to each file BEFORE I started messing with python scripts
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            entry = json.loads(line)
            if 'tool_calls' in entry and entry['tool_calls']:
                for tc in entry['tool_calls']:
                    if tc.get('name') == 'write_to_file':
                        args = tc.get('args', {})
                        target = args.get('TargetFile', '')
                        for f_path in files_to_restore:
                            # Use exact or ends with (handling absolute paths)
                            if target.replace('\\', '/').endswith(f_path):
                                file_contents[f_path] = args.get('CodeContent')
                    elif tc.get('name') == 'replace_file_content' or tc.get('name') == 'multi_replace_file_content':
                        # These also modify files, we might need to apply them or just get the latest version if possible.
                        # Actually, my first "fix_templates.py" script was run after all standard track population.
                        pass
        except Exception as e:
            pass

for filepath, content in file_contents.items():
    if content:
        with open(filepath, 'w', encoding='utf-8') as out:
            out.write(content)
        print(f"Restored {filepath}")
    else:
        print(f"NOT FOUND: {filepath}")
