import sys

replacements = {
    'src/lib/data/nodejs-track.ts': [
        ('{ description: `GET / -> 200`, expected_output: `{"status":200,"body":{"status":"ok`}}\' },',
         '{ description: `GET / -> 200`, expected_output: `{"status":200,"body":{"status":"ok"}}` },'),
         
        ('{ description: `GET /users -> 200`, expected_output: `{"status":200,"body":["Alice`,"Bob"]}\' },',
         '{ description: `GET /users -> 200`, expected_output: `{"status":200,"body":["Alice","Bob"]}` },'),
         
        ('{ description: `Missing -> 404`, expected_output: `{"status":404,"body":"Not Found`}\' },',
         '{ description: `Missing -> 404`, expected_output: `{"status":404,"body":"Not Found"}` },'),
         
        ("hints: [\"Check startsWith('^') for caret\", 'Split by '.' and map to Number'],",
         "hints: [\"Check startsWith('^') for caret\", \"Split by '.' and map to Number\"],")
    ],
    'src/lib/data/php-track.ts': [
        ('{ description: `200 ok`, expected_output: `{"ok":true,"status":200,"data":["Alice`,"Bob"],"error":null}\' },',
         '{ description: `200 ok`, expected_output: `{"ok":true,"status":200,"data":["Alice","Bob"],"error":null}` },')
    ]
}

for filepath, reps in replacements.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in reps:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Replacements done!")
