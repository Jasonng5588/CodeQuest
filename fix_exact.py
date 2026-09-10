import sys

replacements = {
    'src/lib/data/html-css-tracks.ts': [
        ('hints: ["Use a template literal to build the string", "Use an if statement to check newTab", "Add target="_blank" attribute when newTab is true", ],', 
         'hints: ["Use a template literal to build the string", "Use an if statement to check newTab", "Add target=\\"_blank\\" attribute when newTab is true"],'),
         
        ('hints: ["Map each option to an <option value="...">...</option> string", "Join options with empty string", "Wrap in <select id=id name=id>...</select>", ],',
         'hints: ["Map each option to an <option value=\\"...\\">...</option> string", "Join options with empty string", "Wrap in <select id=id name=id>...</select>"],'),
         
        ('{ description: `between(\'sm`, \'lg\') = correct range\', expected_output: `(min-width: 640px) and (max-width: 1023px)` },',
         '{ description: `between(\'sm\', \'lg\') = correct range`, expected_output: `(min-width: 640px) and (max-width: 1023px)` },')
    ],
    'src/lib/data/java-track.ts': [
        ("hints: ['Concatenate name + ' says ' + sound'],", 
         "hints: [\"Concatenate name + ' says ' + sound\"],"),
         
        ("hints: ['Check each condition and throw appropriately', 'Use .includes('@') for email check'],",
         "hints: ['Check each condition and throw appropriately', \"Use .includes('@') for email check\"],"),
         
        ('{ description: `Serialized JSON contains name`, expected_output: `{"name":"Alice`,"age":30,"scores":[95,87,92]}\' },',
         '{ description: `Serialized JSON contains name`, expected_output: `{"name":"Alice","age":30,"scores":[95,87,92]}` },')
    ],
    'src/lib/data/jquery-bootstrap-tracks.ts': [
        ("hints: [\"Level 3 = 16px\", 'No side char for 'all''],",
         "hints: [\"Level 3 = 16px\", \"No side char for 'all'\"],")
    ],
    'src/lib/data/kotlin-track.ts': [
        ('{ description: `Grouped by length`, expected_output: `{"3":["cat`,"dog","elk"],"4":["bear\',"deer"]}\' },',
         '{ description: `Grouped by length`, expected_output: `{"3":["cat","dog","elk"],"4":["bear","deer"]}` },'),
         
        ('{ description: `success`, expected_output: `Data: {"name":"Alice`}\' },',
         '{ description: `success`, expected_output: `Data: {"name":"Alice"}` },')
    ],
    'src/lib/data/lesson-content.ts': [
        ('hints: ["Use the return keyword to send back a value`, "The function body goes inside curly braces {}", "return a + b; is all you need inside", ],',
         'hints: ["Use the return keyword to send back a value", "The function body goes inside curly braces {}", "return a + b; is all you need inside"],')
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
