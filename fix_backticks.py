import sys, glob, re

def fix_inner_backticks(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    keys = ['explanation_md', 'starter_code', 'reference_solution']
    for key in keys:
        idx = 0
        while True:
            # find key
            match = re.search(rf'{key}:\s*`', content[idx:])
            if not match:
                break
            
            start = idx + match.end()
            
            end = start
            while True:
                end = content.find('`', end)
                if end == -1:
                    break
                
                # Check if it's the real end
                after = content[end+1:end+20]
                
                # Real end usually has a comma or closes the object
                if after.startswith(',') or after.lstrip().startswith('}') or after.lstrip().startswith(']'):
                    # But if it's part of ```, it's NOT the real end
                    if content[end-2:end+1] == '```':
                        end += 1
                        continue
                    # REAL END
                    break
                else:
                    end += 1

            if end != -1:
                inner = content[start:end]
                # escape unescaped backticks
                inner = re.sub(r'(?<!\\)`', r'\`', inner)
                # escape unescaped ${
                inner = re.sub(r'(?<!\\)\$\{', r'\${', inner)
                
                content = content[:start] + inner + content[end:]
                idx = start + len(inner) + 1
            else:
                idx = start

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = glob.glob('src/lib/data/*.ts')
for f in files:
    fix_inner_backticks(f)
    print("Fixed backticks in:", f)
