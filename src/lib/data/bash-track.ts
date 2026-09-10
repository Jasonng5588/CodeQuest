import type { StaticTrack } from "./lesson-content";

export const BASH_TRACK: StaticTrack = {
  id: "bash",
  title: "Bash / Shell",
  description: `Command the terminal. Scripts, pipes, and automation.`,
  color: "#4eaa25",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "bash-u1",
      track_id: "bash",
      title: "Bash / Shell Part 1",
      description: `Core concepts of Bash / Shell`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "bash-u1-l1",
          unit_id: "bash-u1",
          track_id: "bash",
          type: "concept",
          title: "Variables & Strings",
          explanation_md: `## Bash Variables

\`\`\`bash
#!/bin/bash
name="Alice"
age=30
echo "Hello, $name! You are $age years old."

# String operations
echo \${#name}        # length: 5
echo \${name^^}       # uppercase: ALICE
echo \${name:0:3}     # slice: Ali
\`\`\`

### Challenge
Write \`formatGreeting(name)\` returning \`"Hello, NAME! (N chars)"\`.`,
          starter_code: `function formatGreeting(name) {
  return "Hello, " + name + "! (" + name.length + " chars)";
}
console.log(formatGreeting("Alice"));
console.log(formatGreeting("Bob"));`,
          reference_solution: `function formatGreeting(name) { return "Hello, " + name + "! (" + name.length + " chars)"; }
console.log(formatGreeting("Alice"));
console.log(formatGreeting("Bob"));`,
          hints: ['Use .length for string length'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice greeting`, expected_output: `Hello, Alice! (5 chars)` },
            { description: `Bob greeting`, expected_output: `Hello, Bob! (3 chars)` },
          ],
        },
        {
          id: "bash-u1-l2",
          unit_id: "bash-u1",
          track_id: "bash",
          type: "concept",
          title: "Conditionals & Loops",
          explanation_md: `## Bash Control Flow

\`\`\`bash
# Conditionals
if [ $age -gt 18 ]; then
    echo "Adult"
elif [ $age -eq 18 ]; then
    echo "Just 18"
else
    echo "Minor"
fi

# For loop
for i in {1..5}; do
    echo "Item $i"
done

# While loop
count=0
while [ $count -lt 5 ]; do
    echo "Count: $count"
    ((count++))
done
\`\`\`

### Challenge
Write \`ageCategory(age)\` returning \`"Minor"\`, \`"Adult"\`, or \`"Senior"\` (65+).`,
          starter_code: `function ageCategory(age) {
  if (age < 18) return "Minor";
  if (age >= 65) return "Senior";
  return "Adult";
}
console.log(ageCategory(10));
console.log(ageCategory(30));
console.log(ageCategory(70));`,
          reference_solution: `function ageCategory(age) {
  if (age < 18) return "Minor";
  if (age >= 65) return "Senior";
  return "Adult";
}
console.log(ageCategory(10));
console.log(ageCategory(30));
console.log(ageCategory(70));`,
          hints: ['Check age < 18 first, then >= 65'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Minor`, expected_output: `Minor` },
            { description: `Adult`, expected_output: `Adult` },
            { description: `Senior`, expected_output: `Senior` },
          ],
        },
        {
          id: "bash-u1-l3",
          unit_id: "bash-u1",
          track_id: "bash",
          type: "concept",
          title: "Functions & Arguments",
          explanation_md: `## Bash Functions

\`\`\`bash
greet() {
    local name=$1  # $1 is first argument
    local greeting=\${2:-"Hello"}  # default value
    echo "$greeting, $name!"
}

greet "Alice"           # Hello, Alice!
greet "Bob" "Hi"        # Hi, Bob!

# Return values
add() {
    echo \$(( $1 + $2 ))
}
result=\$(add 3 4)
echo $result  # 7
\`\`\`

### Challenge
Write \`greet(name, greeting="Hello")\` returning \`"GREETING, NAME!"\`.`,
          starter_code: `function greet(name, greeting = "Hello") {
  return greeting + ", " + name + "!";
}
console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));`,
          reference_solution: `function greet(name, greeting="Hello") { return greeting + ", " + name + "!"; }
console.log(greet("Alice"));
console.log(greet("Bob","Hi"));`,
          hints: ['Use a default parameter value'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Default greeting`, expected_output: `Hello, Alice!` },
            { description: `Custom greeting`, expected_output: `Hi, Bob!` },
          ],
        },
        {
          id: "bash-u1-l4",
          unit_id: "bash-u1",
          track_id: "bash",
          type: "challenge",
          title: "Shell Scripting Boss",
          explanation_md: `## Boss: File Processing Script

Bash scripts process files line by line:

\`\`\`bash
#!/bin/bash
while IFS=',' read -r name score grade; do
    if (( score >= 90 )); then
        echo "$name: A"
    elif (( score >= 80 )); then
        echo "$name: B"
    else
        echo "$name: C"
    fi
done < grades.csv
\`\`\`

### Boss Challenge
Write \`gradeStudents(students)\` — each student has \`{name, score}\`. Return \`"NAME: GRADE"\` lines.`,
          starter_code: `function gradeStudents(students) {
  return students.map(s => {
    let grade;
    if (s.score >= 90) grade = "A";
    else if (s.score >= 80) grade = "B";
    else if (s.score >= 70) grade = "C";
    else grade = "F";
    return s.name + ": " + grade;
  }).join("\\n");
}
console.log(gradeStudents([
  {name:"Alice",score:95},
  {name:"Bob",score:82},
  {name:"Carol",score:68},
]));`,
          reference_solution: `function gradeStudents(students) {
  return students.map(s => {
    const g = s.score>=90?"A":s.score>=80?"B":s.score>=70?"C":"F";
    return s.name+": "+g;
  }).join("\\n");
}
console.log(gradeStudents([{name:"Alice",score:95},{name:"Bob",score:82},{name:"Carol",score:68}]));`,
          hints: ['Use a ternary chain or if/else for grades'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice gets A`, expected_output: `Alice: A` },
            { description: `Bob gets B`, expected_output: `Bob: B` },
            { description: `Carol gets F`, expected_output: `Carol: F` },
          ],
        },
      ],
    },
    {
      id: "bash-u2",
      track_id: "bash",
      title: "Bash / Shell Part 2",
      description: `Core concepts of Bash / Shell`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "bash-u2-l1",
          unit_id: "bash-u2",
          track_id: "bash",
          type: "concept",
          title: "Pipes & Redirection",
          explanation_md: `## Bash Pipes

\`\`\`bash
# Pipe: output of one command becomes input of next
cat data.txt | sort | uniq | wc -l

# Redirect output
echo "hello" > output.txt   # overwrite
echo "world" >> output.txt  # append

# Process substitution
diff <(ls dir1) <(ls dir2)

# Common pipe commands
ls | grep ".txt"     # filter files
ps aux | grep nginx  # find process
cat log | tail -100  # last 100 lines
\`\`\`

### Challenge
Simulate pipes: write \`pipe(...fns)\` that composes functions left-to-right.`,
          starter_code: `function pipe(...fns) {
  return function(input) {
    return fns.reduce((acc, fn) => fn(acc), input);
  };
}
const process = pipe(
  arr => arr.filter(x => x > 0),
  arr => arr.map(x => x * 2),
  arr => arr.sort((a,b)=>a-b),
);
console.log(process([-1, 3, -2, 5, 1]).join(","));`,
          reference_solution: `function pipe(...fns) { return input => fns.reduce((acc,fn)=>fn(acc),input); }
const process=pipe(arr=>arr.filter(x=>x>0),arr=>arr.map(x=>x*2),arr=>arr.sort((a,b)=>a-b));
console.log(process([-1,3,-2,5,1]).join(","));`,
          hints: ['Use reduce to chain functions'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Positive, doubled, sorted`, expected_output: `2,6,10` },
          ],
        },
        {
          id: "bash-u2-l2",
          unit_id: "bash-u2",
          track_id: "bash",
          type: "concept",
          title: "Regular Expressions",
          explanation_md: `## Regex in Bash

\`\`\`bash
# Pattern matching
if [[ "$email" =~ ^[a-z]+@[a-z]+\\.[a-z]+$ ]]; then
    echo "Valid email"
fi

# sed: stream editor
echo "Hello World" | sed 's/World/Bash/'  # Hello Bash
echo "abc123" | sed 's/[0-9]//g'          # abc

# grep with regex
grep -E '^[0-9]+$' file.txt   # lines of only digits
grep -oE '[0-9]+' file.txt    # extract all numbers
\`\`\`

### Challenge
Write \`extractNumbers(text)\` — returns all numbers found in the text as an array.`,
          starter_code: `function extractNumbers(text) {
  const matches = text.match(/\\d+/g);
  return matches ? matches.map(Number) : [];
}
console.log(extractNumbers("I have 3 cats and 12 dogs").join(","));
console.log(extractNumbers("no numbers here").join(","));`,
          reference_solution: `function extractNumbers(text) { return (text.match(/\\d+/g)||[]).map(Number); }
console.log(extractNumbers("I have 3 cats and 12 dogs").join(","));
console.log(extractNumbers("no numbers here").join(","));`,
          hints: ['Use match(/\\d+/g) to find all digit sequences'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Extracts 3 and 12`, expected_output: `3,12` },
            { description: `Empty for no numbers`, expected_output: `` },
          ],
        },
        {
          id: "bash-u2-l3",
          unit_id: "bash-u2",
          track_id: "bash",
          type: "concept",
          title: "Process Management",
          explanation_md: `## Process Control

\`\`\`bash
# Background processes
sleep 30 &   # run in background
jobs         # list background jobs
fg %1        # bring job 1 to foreground
kill %1      # kill job 1

# Special variables
echo $$      # current PID
echo $!      # PID of last background process
echo $?      # exit code of last command

# Trap signals
trap "echo 'Caught SIGINT'; exit 1" SIGINT
trap cleanup EXIT  # run cleanup on exit

# Process substitution
count=\$(ps aux | wc -l)
echo "Running processes: $count"
\`\`\`

### Challenge
Write \`runWithTimeout(fn, timeoutMs)\` — runs fn, returns \`"TIMEOUT"\` if it would exceed timeoutMs (simulate: if fn() throws, return its error).`,
          starter_code: `function runWithTimeout(fn, timeoutMs) {
  try {
    const result = fn();
    return result;
  } catch (e) {
    if (e.message === "TIMEOUT") return "TIMEOUT";
    return "ERROR: " + e.message;
  }
}
console.log(runWithTimeout(() => "success", 1000));
console.log(runWithTimeout(() => { throw new Error("TIMEOUT"); }, 100));`,
          reference_solution: `function runWithTimeout(fn, timeoutMs) {
  try { return fn(); } catch(e) { return e.message==="TIMEOUT"?"TIMEOUT":"ERROR: "+e.message; }
}
console.log(runWithTimeout(()=>"success",1000));
console.log(runWithTimeout(()=>{throw new Error("TIMEOUT");},100));`,
          hints: ['Use try/catch', 'Check if error message is TIMEOUT'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Success`, expected_output: `success` },
            { description: `Timeout`, expected_output: `TIMEOUT` },
          ],
        },
        {
          id: "bash-u2-l4",
          unit_id: "bash-u2",
          track_id: "bash",
          type: "challenge",
          title: "Automation Boss",
          explanation_md: `## Boss: Build Automation Script

Bash automates repetitive tasks:

\`\`\`bash
#!/bin/bash
set -e  # exit on error

BUILD_DIR="./build"
mkdir -p $BUILD_DIR

for file in src/*.js; do
    basename=\$(basename "$file" .js)
    echo "Building $basename..."
    npx babel "$file" -o "$BUILD_DIR/$basename.min.js"
done

echo "Build complete! \$(ls $BUILD_DIR | wc -l) files"
\`\`\`

### Boss
Write \`buildPipeline(files, steps)\` — applies each step function to each file.
Return \`"Built: FILENAME"\` for each successful file.`,
          starter_code: `function buildPipeline(files, steps) {
  const results = [];
  for (const file of files) {
    try {
      let f = file;
      for (const step of steps) f = step(f);
      results.push("Built: " + f);
    } catch (e) {
      results.push("Error: " + file + " - " + e.message);
    }
  }
  return results.join("\\n");
}
console.log(buildPipeline(
  ["app.js", "utils.js"],
  [f => f.replace(".js", ".min.js"), f => "dist/" + f]
));`,
          reference_solution: `function buildPipeline(files, steps) {
  return files.map(file => {
    try { let f=file; for(const s of steps) f=s(f); return "Built: "+f; }
    catch(e) { return "Error: "+file+" - "+e.message; }
  }).join("\\n");
}
console.log(buildPipeline(["app.js","utils.js"],[f=>f.replace(".js",".min.js"),f=>"dist/"+f]));`,
          hints: ['Apply each step in sequence', 'Wrap in try/catch for error handling'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `app.js built`, expected_output: `Built: dist/app.min.js` },
            { description: `utils.js built`, expected_output: `Built: dist/utils.min.js` },
          ],
        },
      ],
    },
  ],
};
