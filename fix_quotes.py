import sys, glob, re
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)

def fix_all_quotes(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find: \"word\" and replace with "word"
    # Actually, the mangling escaped ALL double quotes that the regex saw.
    # So `id: \"js-u2\"` became exactly that in the file.
    # Let's replace `\"` with `"` everywhere, EXCEPT if it's inside `""` (but we don't have `""` that contains `\"` legitimately unless we intended to escape it).
    # Wait, `\\"` in TS means it's an escaped quote.
    # Let's just fix the object keys and simple string values:
    # Pattern: \s*([a-zA-Z0-9_]+):\s*\\"([^\\"]*)\\"
    content = re.sub(r'([a-zA-Z0-9_]+):\s*\\"([^\\"]*)\\"', r'\1: "\2"', content)
    
    # Also fix arrays: [ \"...\", \"...\" ]
    content = re.sub(r'\\"(.*?)\\"', r'"\1"', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = glob.glob('src/lib/data/*.ts')
for f in files:
    fix_all_quotes(f)
    print("Fixed quotes in:", f)
