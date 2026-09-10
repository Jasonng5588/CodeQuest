import re

def fix_vue():
    path = 'src/lib/data/vue-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # line 54-55 issue
    content = content.replace("```\\`,", "````,")
    content = content.replace("starter_code: \\`function", "starter_code: `function")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_nodejs():
    path = 'src/lib/data/nodejs-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # src/lib/data/nodejs-track.ts(58,19): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
    # It means something like `"string" - "string"` or `Date() - Date()` without parsing.
    # Let's just fix Date - Date in string...
    # I'll just restore nodejs-track.ts from transcript to be safe.
    pass

fix_vue()
