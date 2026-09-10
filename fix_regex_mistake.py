import sys, glob, re

def fix_regex_mistake(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The regex in fix_final.py matched:
    # description: "...", icon: "database"
    # and turned it into:
    # description: `..., icon: "database` (or something similar depending on the exact quotes)
    # Actually, it turned it into:
    # description: `Advanced SQL, JSON, CTEs, and window functions`, icon: "database',
    
    # We want to match:
    # description: `(.*?)`, icon: "(.*?)',
    # and turn it back to:
    # description: "$1", icon: "$2",
    
    # Let's check exactly what it produced.
    # description: `Advanced SQL, JSON, CTEs, and window functions`, icon: "database',
    
    # It seems the `inner` was: `Advanced SQL, JSON, CTEs, and window functions", icon: "database`
    # Wait, my regex was:
    # (description:\s*)['"](.*?)['"](?=\s*[,}])
    # It matched:
    # description: "Advanced SQL, JSON, CTEs, and window functions", icon: "database",
    # group(1): description:
    # group(2): Advanced SQL, JSON, CTEs, and window functions", icon: "database
    # It replaced with:
    # description: `Advanced SQL, JSON, CTEs, and window functions", icon: "database`
    # Wait, in the file it is:
    # description: `Advanced SQL, JSON, CTEs, and window functions`, icon: "database',
    # How did that happen?
    
    # Let's just use regex to fix:
    # description: `(.*?)`, icon: "(.*?)', -> description: "$1", icon: "$2",
    # Or just fix the exact pattern in the file!
    
    def repl_desc(m):
        desc = m.group(1).replace('`', '')
        icon = m.group(2)
        return f'description: "{desc}", icon: "{icon}",'

    content = re.sub(r'description:\s*`([^`]*)`,\s*icon:\s*"([^"\']*)\',\s*', repl_desc, content)
    
    # And for c-cpp-swift-tracks.ts:
    content = re.sub(r'description:\s*`([^`]*)`,\s*icon:\s*\'([^"\']*)\',\s*', repl_desc, content)

    # Let's also just fix ANY `icon: "xxx'` or `icon: 'xxx'` that is broken.
    content = re.sub(r'icon:\s*["\']([a-zA-Z0-9_\-]+)["\'],', r'icon: "\1",', content)

    # What about expected_output that might have matched across other properties?
    # test_cases: [{ description: '...', expected_output: `...` }]
    # Since expected_output is the LAST property in the test_case object, it probably matched cleanly up to ` }`.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = glob.glob('src/lib/data/*.ts')
for f in files:
    fix_regex_mistake(f)
