import sys, glob, re

def fix_with_backticks(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix ,, -> ,
    content = re.sub(r',\s*,', ',', content)
    
    # We want to replace the boundary single quotes of expected_output and description with backticks
    # expected_output: '...' -> expected_output: `...`
    # We also need to unescape \' if there are any.
    def repl_expected(m):
        prefix = m.group(1)
        inner = m.group(2)
        # The inner might contain unescaped single quotes, escaped single quotes, etc.
        # We just wrap it in backticks and escape any unescaped backticks or ${
        inner = inner.replace("\\'", "'")
        inner = re.sub(r'(?<!\\)`', r'\`', inner)
        inner = re.sub(r'(?<!\\)\$\{', r'\${', inner)
        return prefix + "`" + inner + "`"

    # Match `expected_output: '...'` or `expected_output: "..."`
    content = re.sub(r"""(expected_output:\s*)['"](.*?)['"](?=\s*[,}])""", repl_expected, content)
    content = re.sub(r"""(description:\s*)['"](.*?)['"](?=\s*[,}])""", repl_expected, content)

    # For hints, we have strings like '...', "..."
    # We will find the contents of hints: [...] and replace any string literal with a backtick literal
    def repl_hints(m):
        inner = m.group(2)
        
        # A hint string is a string inside the array. We can match `'(.*?)'` or `"(.*?)"`
        # But wait, `'(.*?)'` might stop at the first internal `'` (like in `Don't`).
        # This is why regex fails on broken syntax.
        # Let's just fix the specific broken things:
        # `Don't` -> `Don\'t` is already broken.
        pass
        
    # Actually, a simpler way: let's just fix the few remaining TS errors using multi_replace_file_content!
    # There are only a few errors left! Let's check TS output.
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = glob.glob('src/lib/data/*.ts')
for f in files:
    fix_with_backticks(f)
