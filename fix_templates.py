import sys, glob, re
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)

def revert_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to find: `starter_code: "` (or other keys) 
    # up to the matching closing `"` that is followed by a comma
    
    keys = ['explanation_md', 'starter_code', 'reference_solution']
    
    for key in keys:
        # Pattern: key: "content",
        # Because content has actual literal newlines, we must use re.DOTALL
        # The closing quote is usually `",` or `"` at the end of the line
        pattern = re.compile(rf'({key}:\s*)"(.*?)",\n', re.DOTALL)
        
        def replacer(m):
            prefix = m.group(1)
            inner = m.group(2)
            # 1. Unescape \" to "
            inner = inner.replace('\\"', '"')
            # 2. Return with backticks
            return f'{prefix}`{inner}`,\n'
        
        content = pattern.sub(replacer, content)

        # Also cover case where it ends with `"` without comma (e.g. at end of block)
        pattern2 = re.compile(rf'({key}:\s*)"(.*?)"\n', re.DOTALL)
        def replacer2(m):
            prefix = m.group(1)
            inner = m.group(2)
            inner = inner.replace('\\"', '"')
            return f'{prefix}`{inner}`\n'
        content = pattern2.sub(replacer2, content)

    # Also fix the weird cases where explanation_md is like: explanation_md: "# Function Basics
    # (no opening backtick)
    # Pattern: explanation_md: "# ... (until next key or closing brace)
    # Actually, my previous fix script just removed the first backtick. Let's just restore it:
    content = re.sub(r'(explanation_md:\s*)"?#', r'\1`#', content)
    # The ending quote for these corrupted explanation_mds...
    # It might be `",` instead of \` `,`. Let's just run TS check and see what's left.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = glob.glob('src/lib/data/*.ts')
for f in files:
    revert_file(f)
    print("Processed:", f)
