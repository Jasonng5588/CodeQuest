import re

def fix_php():
    path = 'src/lib/data/php-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        """{ description: `404 error`, expected_output: `{"ok":false,"status":404,"data":null,"error":"Not Found`}' },""",
        """{ description: `404 error`, expected_output: `{"ok":false,"status":404,"data":null,"error":"Not Found"}` },"""
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def fix_python():
    path = 'src/lib/data/python-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        'hints: ["Use f"..." with variables in {braces}", "Check the comma and spacing in the expected output", ],',
        'hints: ["Use f\'...\' with variables in {braces}", "Check the comma and spacing in the expected output", ],'
    )
    
    content = content.replace(
        'hints: ["Remember to use : at the end of each if/elif/else line", "Indent the body with 4 spaces", "Return a string like "Normal" (with quotes)", ],',
        'hints: ["Remember to use : at the end of each if/elif/else line", "Indent the body with 4 spaces", "Return a string like \'Normal\' (with quotes)", ],'
    )
    
    content = content.replace(
        "{ description: `reverse_list(['a`,'b','c']) = ['c','b','a']', expected_output: `['c`, 'b', 'a']' },",
        "{ description: `reverse_list(['a','b','c']) = ['c','b','a']`, expected_output: `['c', 'b', 'a']` },"
    )
    
    content = content.replace(
        "explanation_md: `# List Comprehensions\n",
        "explanation_md: `# List Comprehensions\n" # Actually it's explanation_md: `# List Comprehensions
    )
    # Let's fix line 407 directly
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'List Comprehensions' in line and 'explanation_md' in line:
            lines[i] = '          explanation_md: `# List Comprehensions'
    
    content = '\n'.join(lines)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def fix_react():
    path = 'src/lib/data/react-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        "hints: ['Call fn() and prefix with 'debounced: ''],",
        "hints: [\"Call fn() and prefix with 'debounced: '\"],"
    )
    
    content = content.replace(
        "hints: [\"Split both pattern and path by '/'\", 'Check if pattern segment starts with ':''],",
        "hints: [\"Split both pattern and path by '/'\", \"Check if pattern segment starts with ':'\"],"
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_php()
fix_python()
fix_react()
print("Fixed!")
