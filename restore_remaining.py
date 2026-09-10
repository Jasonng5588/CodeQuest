import json

transcript_path = r"C:\Users\jack8\.gemini\antigravity-ide\brain\4d29338d-2897-4cb4-bf63-f5e345d76ad5\.system_generated\logs\transcript_full.jsonl"
files_to_restore = [
    "src/lib/data/python-track.ts",
    "src/lib/data/react-track.ts",
    "src/lib/data/remaining-tracks.ts"
]

file_contents = {f: None for f in files_to_restore}

# We want the LAST write to each file in that transcript
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
                            if target.replace('\\', '/').endswith(f_path):
                                file_contents[f_path] = args.get('CodeContent')
        except Exception as e:
            pass

for filepath, content in file_contents.items():
    if content:
        with open(filepath, 'w', encoding='utf-8') as out:
            out.write(content)
        print(f"Restored {filepath}")
    else:
        print(f"NOT FOUND: {filepath}")
