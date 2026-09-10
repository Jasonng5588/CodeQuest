import re

def fix_python_track():
    path = 'src/lib/data/python-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix line 94
    content = content.replace('"No keyword needed  just write name = "Alex""', '"No keyword needed - just write name = \'Alex\'"')
    content = content.replace('"No keyword needed — just write name = "Alex""', '"No keyword needed - just write name = \'Alex\'"')

    # Fix explanation_md backtick issue
    # The string `explanation_md: `# List Comprehensions` should be `explanation_md: \`# List Comprehensions`
    # Let's just find `explanation_md: `# List Comprehensions` and remove the trailing backtick.
    content = content.replace('explanation_md: `# List Comprehensions`\n', 'explanation_md: `# List Comprehensions\n')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_react_track():
    path = 'src/lib/data/react-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix line 112
    content = content.replace(
        "{ description: `formatUser('alice`, 25) returns 'User: ALICE is 25 years old'', expected_output: `User: ALICE is 25 years old` },",
        "{ description: `formatUser('alice', 25) returns 'User: ALICE is 25 years old'`, expected_output: `User: ALICE is 25 years old` },"
    )
    
    # Fix line 213
    content = content.replace(
        "{ description: `renderList(['Apple`, 'Banana', 'Cherry']) formats correctly', expected_output: `1. Apple, 2. Banana, 3. Cherry` },",
        "{ description: `renderList(['Apple', 'Banana', 'Cherry']) formats correctly`, expected_output: `1. Apple, 2. Banana, 3. Cherry` },"
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_python_track()
fix_react_track()
print("Fixed!")
