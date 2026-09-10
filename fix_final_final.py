import re

def fix_api_route():
    path = 'src/app/api/progress/route.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        "async function updateStreak(admin: ReturnType<typeof createClient>, userId: string)",
        "async function updateStreak(admin: any, userId: string)"
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_unit_path_map():
    path = 'src/components/tracks/UnitPathMap.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # isAvailable = ... issue
    # Wait, if it references itself, maybe there is `isAvailable` used later inside a function?
    content = content.replace(
        "const isAvailable = allPreviousUnitsComplete && prevLessonInUnitDone;",
        "const isAvailable: boolean = Boolean(allPreviousUnitsComplete && prevLessonInUnitDone);"
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_nodejs():
    path = 'src/lib/data/nodejs-track.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        "hints: ['Use .join('/')'],",
        "hints: [\"Use .join('/')\"],"
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_remaining():
    path = 'src/lib/data/remaining-tracks.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The string evaluates ${config.navColor} etc. We need to escape them.
    content = content.replace("${config.navColor}", "\\${config.navColor}")
    content = content.replace("${config.sidebarWidth}", "\\${config.sidebarWidth}")
    content = content.replace("${config.mainWidth}", "\\${config.mainWidth}")
    content = content.replace("${config.cardColor}", "\\${config.cardColor}")
    content = content.replace("${config.footerColor}", "\\${config.footerColor}")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_api_route()
fix_unit_path_map()
fix_nodejs()
fix_remaining()
print("Fixed final issues!")
