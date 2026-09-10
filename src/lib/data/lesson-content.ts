/**
 * Complete static lesson content — all tracks
 * Used as fallback when DB is empty, and as seed source for DB population
 */
import { PYTHON_TRACK } from "./python-track";
import { HTML_TRACK, CSS_TRACK } from "./html-css-tracks";
import { TYPESCRIPT_TRACK } from "./typescript-track";
import { SQL_TRACK } from "./sql-track";
import { VUE_TRACK } from "./vue-track";
import { REACT_TRACK } from "./react-track";
import { JAVA_TRACK } from "./java-track";
import { GO_TRACK } from "./go-track";
import { BASH_TRACK } from "./bash-track";
import { GIT_TRACK } from "./git-track";
import { CSHARP_TRACK } from "./csharp-track";
import { RUST_TRACK } from "./rust-track";
import { NODEJS_TRACK } from "./nodejs-track";
import { ANGULAR_TRACK } from "./angular-track";
import { PHP_TRACK } from "./php-track";
import { KOTLIN_TRACK } from "./kotlin-track";
import { JQUERY_TRACK, BOOTSTRAP_TRACK } from "./jquery-bootstrap-tracks";
import { C_TRACK, CPP_TRACK, SWIFT_TRACK } from "./c-cpp-swift-tracks";
import { R_TRACK, INTRO_TRACK, DSA_TRACK, AI_BASICS_TRACK, CYBERSECURITY_TRACK } from "./more-tracks";
import { MYSQL_TRACK, MONGODB_TRACK, SASS_TRACK } from "./db-sass-tracks";
import { POSTGRESQL_TRACK, NUMPY_TRACK, PANDAS_TRACK, DOCKER_TRACK, GEN_AI_TRACK } from "./advanced-tracks";
import { W3CSS_TRACK, DJANGO_TRACK, SCIPY_TRACK } from "./remaining-tracks";
import { ASPNET_TRACK, LARAVEL_TRACK } from "./aspnet-laravel-tracks";
import { AWS_TRACK, ASSEMBLY_TRACK } from "./aws-assembly-tracks";
import { DATA_SCIENCE_TRACK, TAURI_TRACK } from "./data-science-tauri-tracks";

export interface StaticLesson {
  id: string;
  unit_id: string;
  track_id: string;
  type: "concept" | "challenge" | "boss" | "project";
  title: string;
  explanation_md: string;
  starter_code: string;
  reference_solution: string;
  hints: string[];
  test_cases: Array<{ description: string; expected_output: string; input?: string }>;
  xp_reward: number;
  order_index: number;
  execution_engine: string;
}

export interface StaticUnit {
  id: string;
  track_id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  lessons: StaticLesson[];
}

export interface StaticTrack {
  id: string;
  title: string;
  description: string;
  color: string;
  difficulty_curve: string;
  execution_engine: string;
  category: string;
  order_index: number;
  is_published: boolean;
  estimated_hours: number;
  learner_count: number;
  units: StaticUnit[];
}

export const JS_TRACK: StaticTrack = {
  id: "javascript",
  title: "JavaScript Essentials",
  description: `Master the language of the web. From variables to closures, build real programs that run in your browser.`,
  color: "#f7df1e",
  difficulty_curve: "beginner",
  execution_engine: "browser",
  category: "fundamentals",
  order_index: 1,
  is_published: true,
  estimated_hours: 20,
  learner_count: 18420,
  units: [
    {
      id: "js-u1",
      track_id: "javascript",
      title: "JavaScript Basics",
      description: `Variables, types, and your first programs`,
      icon: "book",
      order_index: 1,
      lessons: [
        {
          id: "js-u1-l1",
          unit_id: "js-u1",
          track_id: "javascript",
          type: "concept",
          title: "Hello, World!",
          explanation_md: `# Hello, World!

Every programmer starts with **Hello, World!** — and so do you.

In JavaScript, we use \`console.log()\` to print output to the console.

\`\`\`js
console.log("Hello, World!");
\`\`\`

You can print text (called a **string**), numbers, or even expressions:

\`\`\`js
console.log("I am learning JavaScript!");
console.log(42);
console.log(2 + 2);
\`\`\`

## Your Task
Print \`Hello, CodeQuest!\` to the console.`,
          starter_code: `// Print "Hello, CodeQuest!" to the console\n`,
          reference_solution: `console.log("Hello, CodeQuest!");\n`,
          hints: ["Use console.log() to print text", 'Text (strings) must be wrapped in quotes', "Make sure the text matches exactly", ],
          test_cases: [{ description: `Prints the correct greeting`, expected_output: `Hello, CodeQuest!` }],
          xp_reward: 50,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "js-u1-l2",
          unit_id: "js-u1",
          track_id: "javascript",
          type: "challenge",
          title: "Variables with let",
          explanation_md: `# Variables with let

Variables store data that you can use and change later.

Use \`let\` to declare a variable:

\`\`\`js
let name = "Alice";
let age = 25;
console.log(name); // Alice
console.log(age);  // 25
\`\`\`

You can update a \`let\` variable:

\`\`\`js
let score = 0;
score = 10;
console.log(score); // 10
\`\`\`

## Your Task
1. Create a variable \`name\` with your name (any string)
2. Create a variable \`age\` with a number
3. Print both to the console`,
          starter_code: `// 1. Create a variable called name\n// 2. Create a variable called age\n// 3. Print both\n`,
          reference_solution: `let name = "Jason";\nlet age = 20;\nconsole.log(name);\nconsole.log(age);\n`,
          hints: ["Use let to declare variables", "Assign a string to name using quotes", "Assign a number to age (no quotes needed)", "Use console.log() for each variable", ],
          test_cases: [{ description: `Prints a string then a number`, expected_output: `Jason\n20` }],
          xp_reward: 75,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "js-u1-l3",
          unit_id: "js-u1",
          track_id: "javascript",
          type: "challenge",
          title: "Constants with const",
          explanation_md: `# Constants with const

Use \`const\` when a value should **never change**:

\`\`\`js
const PI = 3.14159;
const APP_NAME = "CodeQuest";
\`\`\`

Trying to reassign a \`const\` causes an error:

\`\`\`js
const x = 5;
x = 10; // TypeError!
\`\`\`

## Rule of thumb:
- Use \`const\` by default
- Use \`let\` only if you need to reassign

## Your Task
Create two constants:
- \`LANGUAGE\` with value \`"JavaScript"\`
- \`YEAR\` with the current year (a number)

Print both.`,
          starter_code: `// Create constants LANGUAGE and YEAR\n// Print both\n`,
          reference_solution: `const LANGUAGE = "JavaScript";\nconst YEAR = 2024;\nconsole.log(LANGUAGE);\nconsole.log(YEAR);\n`,
          hints: ["Use const instead of let", "String values need quotes, numbers do not", "Print each constant with console.log()", ],
          test_cases: [{ description: `Prints language name and a year`, expected_output: `JavaScript\n2024` }],
          xp_reward: 75,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "js-u1-l4",
          unit_id: "js-u1",
          track_id: "javascript",
          type: "challenge",
          title: "Template Literals",
          explanation_md: `# Template Literals

Template literals let you embed variables directly in strings:

\`\`\`js
const name = "Alice";
const age = 25;

// Old way (messy):
console.log("My name is " + name + " and I am " + age);

// Template literal (clean!):
console.log(\`My name is \${name} and I am \${age}\`);
\`\`\`

Notice the **backticks** (\` \` \`) instead of quotes.

## Your Task
The variables \`city\` and \`country\` are already defined.
Print: \`I live in [city], [country]\``,
          starter_code: `const city = "Kuala Lumpur";\nconst country = "Malaysia";\n\n// Print: "I live in Kuala Lumpur, Malaysia"\n`,
          reference_solution: `const city = "Kuala Lumpur";\nconst country = "Malaysia";\nconsole.log(\`I live in \${city}, \${country}\`);\n`,
          hints: ["Use backticks (\`) not regular quotes", "Wrap variables in \${...} inside the template", "Check your comma and spacing", ],
          test_cases: [{ description: `Formats a location string correctly`, expected_output: `I live in Kuala Lumpur, Malaysia` }],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },
    {
      id: "js-u2",
      track_id: "javascript",
      title: "Functions",
      description: `Reusable blocks of code that do one job well`,
      icon: "code",
      order_index: 2,
      lessons: [
        {
          id: "js-u2-l1",
          unit_id: "js-u2",
          track_id: "javascript",
          type: "challenge",
          title: "Function Basics",
          explanation_md: `# Function Basics

A **function** is a reusable block of code:

\`\`\`js
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob"));   // Hello, Bob!
\`\`\`

Functions:
1. Have a name (\`greet\`)
2. Accept inputs called **parameters** (\`name\`)
3. **Return** a value

## Your Task
Write a function \`add(a, b)\` that returns the sum of two numbers.`,
          starter_code: `// Write a function add(a, b) that returns a + b\nfunction add(a, b) {\n  // your code here\n}\n\nconsole.log(add(2, 3));   // 5\nconsole.log(add(10, 20)); // 30\n`,
          reference_solution: `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));\nconsole.log(add(10, 20));\n`,
          hints: ["Use the return keyword to send back a value", "The function body goes inside curly braces {}", "return a + b; is all you need inside"],
          test_cases: [
            { description: `2 + 3 = 5`, expected_output: `5` },
            { description: `10 + 20 = 30`, expected_output: `30` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "js-u2-l2",
          unit_id: "js-u2",
          track_id: "javascript",
          type: "challenge",
          title: "Arrow Functions",
          explanation_md: `# Arrow Functions

**Arrow functions** are a shorter way to write functions:

\`\`\`js
// Regular function
function square(n) {
  return n * n;
}

// Arrow function (same thing!)
const square = (n) => n * n;
\`\`\`

## Your Task
Rewrite \`multiply\` as an arrow function stored in a \`const\`.

- \`multiply(3, 4)\` → 12
- \`multiply(5, 6)\` → 30`,
          starter_code: `// Convert to an arrow function\n// const multiply = ...\n\nconsole.log(multiply(3, 4));  // 12\nconsole.log(multiply(5, 6));  // 30\n`,
          reference_solution: `const multiply = (a, b) => a * b;\n\nconsole.log(multiply(3, 4));\nconsole.log(multiply(5, 6));\n`,
          hints: ["Arrow functions use => instead of the function keyword", "Put the parameters before =>, the body after", "For single expressions, you can skip the return keyword", ],
          test_cases: [
            { description: `3 × 4 = 12`, expected_output: `12` },
            { description: `5 × 6 = 30`, expected_output: `30` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "js-u2-l3",
          unit_id: "js-u2",
          track_id: "javascript",
          type: "challenge",
          title: "Default Parameters",
          explanation_md: `# Default Parameters

Set default values for function parameters:

\`\`\`js
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

console.log(greet("Alice")); // Hello, Alice!
console.log(greet());        // Hello, World!
\`\`\`

## Your Task
Write \`power(base, exponent = 2)\` that returns base raised to exponent.

- \`power(3)\` → 9 (3²)
- \`power(2, 10)\` → 1024`,
          starter_code: `// Write power(base, exponent = 2)\n// Hint: use base ** exponent\n\nconsole.log(power(3));     // 9\nconsole.log(power(2, 10)); // 1024\n`,
          reference_solution: `function power(base, exponent = 2) {\n  return base ** exponent;\n}\n\nconsole.log(power(3));\nconsole.log(power(2, 10));\n`,
          hints: ["Default parameters are set with = in the function signature", "Use ** for exponentiation (or Math.pow)", "When exponent is omitted, it defaults to 2", ],
          test_cases: [
            { description: `3² = 9 (default exponent)`, expected_output: `9` },
            { description: `2¹⁰ = 1024`, expected_output: `1024` },
          ],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "js-u2-l4",
          unit_id: "js-u2",
          track_id: "javascript",
          type: "boss",
          title: "Boss: Calculator",
          explanation_md: `# Boss: Build a Calculator

Time to prove your function skills!

Build a \`calculate(a, op, b)\` function that:
- Takes two numbers and an operator string
- Supports \`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`
- Returns the result
- Returns \`"Invalid operator"\` for unknown operators

\`\`\`js
console.log(calculate(10, "+", 5));  // 15
console.log(calculate(10, "-", 3));  // 7
console.log(calculate(4, "*", 3));   // 12
console.log(calculate(15, "/", 3));  // 5
console.log(calculate(1, "^", 2));   // "Invalid operator"
\`\`\``,
          starter_code: `function calculate(a, op, b) {\n  // Your code here\n}\n\nconsole.log(calculate(10, "+", 5));\nconsole.log(calculate(10, "-", 3));\nconsole.log(calculate(4, "*", 3));\nconsole.log(calculate(15, "/", 3));\nconsole.log(calculate(1, "^", 2));\n`,
          reference_solution: `function calculate(a, op, b) {\n  if (op === "+") return a + b;\n  if (op === "-") return a - b;\n  if (op === "*") return a * b;\n  if (op === "/") return a / b;\n  return "Invalid operator";\n}\n\nconsole.log(calculate(10, "+", 5));\nconsole.log(calculate(10, "-", 3));\nconsole.log(calculate(4, "*", 3));\nconsole.log(calculate(15, "/", 3));\nconsole.log(calculate(1, "^", 2));\n`,
          hints: ["Use if statements to check the operator", "Return the result directly from each branch", 'Don\'t forget the fallback "Invalid operator"', ],
          test_cases: [
            { description: `10 + 5 = 15`, expected_output: `15` },
            { description: `10 - 3 = 7`, expected_output: `7` },
            { description: `4 × 3 = 12`, expected_output: `12` },
            { description: `15 ÷ 3 = 5`, expected_output: `5` },
            { description: `Unknown operator`, expected_output: `Invalid operator` },
          ],
          xp_reward: 250,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },
    {
      id: "js-u3",
      track_id: "javascript",
      title: "Control Flow",
      description: `Make decisions and repeat actions in your code`,
      icon: "layers",
      order_index: 3,
      lessons: [
        {
          id: "js-u3-l1",
          unit_id: "js-u3",
          track_id: "javascript",
          type: "challenge",
          title: "if / else Statements",
          explanation_md: `# if / else Statements

Make decisions in your code:

\`\`\`js
const age = 18;

if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("Too young to vote.");
}
\`\`\`

Chain conditions with \`else if\`:

\`\`\`js
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
\`\`\`

## Your Task
Write a function \`grade(score)\` that returns:
- \`"A"\` for 90+
- \`"B"\` for 80–89
- \`"C"\` for 70–79
- \`"F"\` for below 70`,
          starter_code: `function grade(score) {\n  // return the letter grade\n}\n\nconsole.log(grade(95));  // A\nconsole.log(grade(85));  // B\nconsole.log(grade(75));  // C\nconsole.log(grade(60));  // F\n`,
          reference_solution: `function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}\n\nconsole.log(grade(95));\nconsole.log(grade(85));\nconsole.log(grade(75));\nconsole.log(grade(60));\n`,
          hints: ["Use if/else if/else to check ranges", "Check from highest to lowest", 'Return a string like "A" (with quotes)', ],
          test_cases: [
            { description: `95 → A`, expected_output: `A` },
            { description: `85 → B`, expected_output: `B` },
            { description: `75 → C`, expected_output: `C` },
            { description: `60 → F`, expected_output: `F` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "js-u3-l2",
          unit_id: "js-u3",
          track_id: "javascript",
          type: "challenge",
          title: "for Loops",
          explanation_md: `# for Loops

Repeat code a set number of times:

\`\`\`js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Prints: 1, 2, 3, 4, 5 (each on new line)
\`\`\`

The loop has three parts:
1. \`let i = 1\` — starting value
2. \`i <= 5\` — keep going while true
3. \`i++\` — increment each step

## Your Task
Write \`sumTo(n)\` that returns the sum of all numbers 1 to n.

- \`sumTo(5)\` → 15 (1+2+3+4+5)
- \`sumTo(10)\` → 55`,
          starter_code: `function sumTo(n) {\n  let total = 0;\n  // Use a for loop to add 1 through n\n  \n  return total;\n}\n\nconsole.log(sumTo(5));   // 15\nconsole.log(sumTo(10));  // 55\n`,
          reference_solution: `function sumTo(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}\n\nconsole.log(sumTo(5));\nconsole.log(sumTo(10));\n`,
          hints: ["Start i at 1, loop while i <= n", "total += i adds i to the running total", "Return total after the loop ends", ],
          test_cases: [
            { description: `sumTo(5) = 15`, expected_output: `15` },
            { description: `sumTo(10) = 55`, expected_output: `55` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "js-u3-l3",
          unit_id: "js-u3",
          track_id: "javascript",
          type: "challenge",
          title: "Arrays",
          explanation_md: `# Arrays

Arrays store **multiple values** in one variable:

\`\`\`js
const fruits = ["apple", "banana", "mango"];

console.log(fruits[0]); // apple (0-indexed!)
console.log(fruits.length); // 3

// Add an item:
fruits.push("kiwi");

// Loop through all items:
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`

## Your Task
Write \`sum(numbers)\` that takes an array of numbers and returns their total.

- \`sum([1, 2, 3])\` → 6
- \`sum([10, 20, 30, 40])\` → 100`,
          starter_code: `function sum(numbers) {\n  // Add up all numbers in the array\n}\n\nconsole.log(sum([1, 2, 3]));        // 6\nconsole.log(sum([10, 20, 30, 40])); // 100\n`,
          reference_solution: `function sum(numbers) {\n  let total = 0;\n  for (const n of numbers) {\n    total += n;\n  }\n  return total;\n}\n\nconsole.log(sum([1, 2, 3]));\nconsole.log(sum([10, 20, 30, 40]));\n`,
          hints: ["Use a for...of loop to iterate the array", "Keep a running total variable", "Return the total after the loop", ],
          test_cases: [
            { description: `sum([1,2,3]) = 6`, expected_output: `6` },
            { description: `sum([10,20,30,40]) = 100`, expected_output: `100` },
          ],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "js-u3-l4",
          unit_id: "js-u3",
          track_id: "javascript",
          type: "boss",
          title: "Boss: FizzBuzz",
          explanation_md: `# Boss: FizzBuzz

The classic programming interview challenge!

Write \`fizzBuzz(n)\` that prints numbers from 1 to n, but:
- Print \`"Fizz"\` for multiples of 3
- Print \`"Buzz"\` for multiples of 5
- Print \`"FizzBuzz"\` for multiples of both
- Otherwise print the number

\`\`\`
fizzBuzz(15) prints:
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
\`\`\``,
          starter_code: `function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    // Check divisibility and print the right value\n  }\n}\n\nfizzBuzz(15);\n`,
          reference_solution: `function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0 && i % 5 === 0) {\n      console.log("FizzBuzz");\n    } else if (i % 3 === 0) {\n      console.log("Fizz");\n    } else if (i % 5 === 0) {\n      console.log("Buzz");\n    } else {\n      console.log(i);\n    }\n  }\n}\n\nfizzBuzz(15);\n`,
          hints: ["Check FizzBuzz first (divisible by both 3 and 5)", "Use the % (modulo) operator to check divisibility", "i % 3 === 0 means i is divisible by 3", ],
          test_cases: [
            { description: `FizzBuzz output includes Fizz at 3`, expected_output: `Fizz` },
            { description: `FizzBuzz output includes Buzz at 5`, expected_output: `Buzz` },
            { description: `FizzBuzz output includes FizzBuzz at 15`, expected_output: `FizzBuzz` },
          ],
          xp_reward: 300,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },
    {
      id: "js-u4",
      track_id: "javascript",
      title: "Arrays & Objects",
      description: `Work with complex data — arrays, objects, and destructuring`,
      icon: "database",
      order_index: 4,
      lessons: [
        {
          id: "js-u4-l1",
          unit_id: "js-u4",
          track_id: "javascript",
          type: "challenge",
          title: "Array Methods",
          explanation_md: `# Array Methods

JavaScript arrays have powerful built-in methods:

\`\`\`js
const numbers = [1, 2, 3, 4, 5];

// filter() — keep items that pass a test
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// map() — transform every item
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// find() — get first match
const first = numbers.find(n => n > 3); // 4
\`\`\`

## Your Task
Write \`doubleEvens(arr)\` that:
1. Filters to only even numbers
2. Doubles each one
3. Returns the result

\`doubleEvens([1,2,3,4,5,6])\` → \`[4, 8, 12]\``,
          starter_code: `function doubleEvens(arr) {\n  // 1. Filter even numbers\n  // 2. Double each one\n  // 3. Return result\n}\n\nconsole.log(JSON.stringify(doubleEvens([1,2,3,4,5,6])));\n`,
          reference_solution: `function doubleEvens(arr) {\n  return arr.filter(n => n % 2 === 0).map(n => n * 2);\n}\n\nconsole.log(JSON.stringify(doubleEvens([1,2,3,4,5,6])));\n`,
          hints: ["Chain .filter() and .map() together", "n % 2 === 0 checks if n is even", "You can chain: arr.filter(...).map(...)", ],
          test_cases: [
            { description: `doubleEvens([1,2,3,4,5,6]) = [4,8,12]`, expected_output: `[4,8,12]` },
          ],
          xp_reward: 125,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "js-u4-l2",
          unit_id: "js-u4",
          track_id: "javascript",
          type: "challenge",
          title: "Objects",
          explanation_md: `# Objects

Objects store **key-value pairs**:

\`\`\`js
const user = {
  name: "Alice",
  age: 25,
  isAdmin: false
};

console.log(user.name);   // Alice
console.log(user["age"]); // 25
\`\`\`

**Object destructuring:**
\`\`\`js
const { name, age } = user;
console.log(name, age); // Alice 25
\`\`\`

## Your Task
Write \`createUser(name, age)\` that returns an object with:
- \`name\`: the name
- \`age\`: the age
- \`isActive\`: always \`true\`
- \`greeting\`: e.g. \`"Hi, I'm Alice!"\``,
          starter_code: `function createUser(name, age) {\n  // Return an object with name, age, isActive, greeting\n}\n\nconst user = createUser("Alice", 25);\nconsole.log(user.name);\nconsole.log(user.age);\nconsole.log(user.isActive);\nconsole.log(user.greeting);\n`,
          reference_solution: `function createUser(name, age) {\n  return {\n    name,\n    age,\n    isActive: true,\n    greeting: "Hi, I'm " + name + "!"\n  };\n}\n\nconst user = createUser("Alice", 25);\nconsole.log(user.name);\nconsole.log(user.age);\nconsole.log(user.isActive);\nconsole.log(user.greeting);\n`,
          hints: ["Return an object using {}", "Use a template literal for greeting", "isActive should always be true (boolean, no quotes)", ],
          test_cases: [
            { description: `name is Alice`, expected_output: `Alice` },
            { description: `isActive is true`, expected_output: `true` },
            { description: `greeting is correct`, expected_output: `Hi, I'm Alice!` },
          ],
          xp_reward: 150,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "js-u4-l3",
          unit_id: "js-u4",
          track_id: "javascript",
          type: "challenge",
          title: "Destructuring & Spread",
          explanation_md: `# Destructuring & Spread

**Array destructuring:**
\`\`\`js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(rest);   // [3, 4, 5]
\`\`\`

**Object destructuring:**
\`\`\`js
const { name, age = 0 } = { name: "Bob" };
console.log(name); // Bob
console.log(age);  // 0 (default)
\`\`\`

**Spread operator:**
\`\`\`js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
\`\`\`

## Your Task
Write \`getFirstAndLast(arr)\` that returns an object \`{ first, last }\`.`,
          starter_code: `function getFirstAndLast(arr) {\n  // Use destructuring to get first and last elements\n}\n\nconst result = getFirstAndLast([1, 2, 3, 4, 5]);\nconsole.log(result.first); // 1\nconsole.log(result.last);  // 5\n`,
          reference_solution: `function getFirstAndLast(arr) {\n  const [first] = arr;\n  const last = arr[arr.length - 1];\n  return { first, last };\n}\n\nconst result = getFirstAndLast([1, 2, 3, 4, 5]);\nconsole.log(result.first);\nconsole.log(result.last);\n`,
          hints: ["Destructure the first element with const [first] = arr",
            "The last element is arr[arr.length - 1]",
            "Return { first, last } as an object",
          ],
          test_cases: [
            { description: `first is 1`, expected_output: `1` },
            { description: `last is 5`, expected_output: `5` },
          ],
          xp_reward: 150,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "js-u4-l4",
          unit_id: "js-u4",
          track_id: "javascript",
          type: "boss",
          title: "Boss: Student Report",
          explanation_md: `# Boss: Student Report

Combine **everything** you've learned!

You have an array of student objects. Write \`generateReport(students)\` that returns an array sorted by average score (descending), where each item has:
- \`name\`: student name
- \`average\`: average score (1 decimal)
- \`grade\`: letter grade (A=90+, B=80+, C=70+, F=below)

\`\`\`js
const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob",   scores: [70, 75, 80] },
  { name: "Carol", scores: [95, 98, 100] },
];
// Carol first (97.7), Alice second (89.0), Bob last (75.0)
\`\`\``,
          starter_code: `function generateReport(students) {\n  // Your code here\n}\n\nconst students = [\n  { name: "Alice", scores: [90, 85, 92] },\n  { name: "Bob",   scores: [70, 75, 80] },\n  { name: "Carol", scores: [95, 98, 100] },\n];\n\nconst report = generateReport(students);\nreport.forEach(r => {\n  console.log(r.name + ": " + r.average + " (" + r.grade + ")");\n});\n`,
          reference_solution: `function generateReport(students) {\n  return students\n    .map(({ name, scores }) => {\n      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;\n      const average = Math.round(avg * 10) / 10;\n      const grade = average >= 90 ? "A" : average >= 80 ? "B" : average >= 70 ? "C" : "F";\n      return { name, average, grade };\n    })\n    .sort((a, b) => b.average - a.average);\n}\n\nconst students = [\n  { name: "Alice", scores: [90, 85, 92] },\n  { name: "Bob",   scores: [70, 75, 80] },\n  { name: "Carol", scores: [95, 98, 100] },\n];\n\nconst report = generateReport(students);\nreport.forEach(r => {\n  console.log(r.name + ": " + r.average + " (" + r.grade + ")");\n});\n`,
          hints: ["Use .map() to transform each student", "Use .reduce() to sum the scores array", "Divide by scores.length to get average", "Use .sort() with (a, b) => b.average - a.average", ],
          test_cases: [
            { description: `Carol has the highest average (first in results)`, expected_output: `Carol` },
            { description: `Carol gets an A`, expected_output: `A` },
            { description: `Bob gets a C`, expected_output: `C` },
          ],
          xp_reward: 400,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },
  ],
};

/** Dynamically generate a "Coming Soon" track for unimplemented courses */
export function generateDynamicTrack(trackId: string, trackTitle: string): StaticTrack {
  return {
    id: trackId,
    title: trackTitle,
    description: trackTitle + " lessons are coming soon! Check back later.",
    color: "#6366f1",
    difficulty_curve: "beginner",
    execution_engine: "browser",
    category: "fundamentals",
    order_index: 99,
    is_published: true,
    estimated_hours: 10,
    learner_count: 5000,
    units: [
      {
        id: trackId + "-u1",
        track_id: trackId,
        title: trackTitle + " — Coming Soon",
        description: `Full " + trackTitle + " curriculum is in development`,
        icon: "clock",
        order_index: 1,
        lessons: [
          {
            id: trackId + "-u1-l1",
            unit_id: trackId + "-u1",
            track_id: trackId,
            type: "concept",
            title: trackTitle + " — Coming Soon",
            explanation_md: `# " + trackTitle + " is Coming Soon!\n\nWe are working hard to bring you a complete **" + trackTitle + "** curriculum with:\n\n- Real coding challenges\n- Progressive difficulty\n- Instant feedback\n- Detailed explanations\n\n## Available Now\n\nWhile you wait, check out our fully implemented tracks:\n- ✅ **JavaScript** — Complete 4-unit course\n- ✅ **Python** — Complete 4-unit course\n- ✅ **TypeScript** — Complete 4-unit course\n- ✅ **HTML** — Complete 4-unit course\n- ✅ **CSS** — Complete 4-unit course\n- ✅ **SQL** — Complete 4-unit course\n- ✅ **Vue.js** — Complete 4-unit course`,
            starter_code: `// " + trackTitle + " is coming soon!
// In the meantime, try JavaScript, Python, or TypeScript
console.log("" + trackTitle + " curriculum coming soon!");
`,
            reference_solution: `console.log("" + trackTitle + " curriculum coming soon!");
`,
            hints: ["Check out JavaScript, Python, or TypeScript while you wait!"],
            test_cases: [],
            xp_reward: 10,
            order_index: 1,
            execution_engine: "browser",
          },
        ],
      },
    ],
  };
}

/** Cache for dynamically generated tracks */
const generatedTracks = new Map<string, StaticTrack>();

/** Static tracks with real lesson content */
const REAL_TRACKS: Record<string, StaticTrack> = {
  javascript: JS_TRACK,
  python: PYTHON_TRACK,
  html: HTML_TRACK,
  css: CSS_TRACK,
  typescript: TYPESCRIPT_TRACK,
  sql: SQL_TRACK,
  vue: VUE_TRACK,
  react: REACT_TRACK,
  java: JAVA_TRACK,
  go: GO_TRACK,
  bash: BASH_TRACK,
  git: GIT_TRACK,
  csharp: CSHARP_TRACK,
  rust: RUST_TRACK,
  nodejs: NODEJS_TRACK,
  angular: ANGULAR_TRACK,
  php: PHP_TRACK,
  kotlin: KOTLIN_TRACK,
  // NEW: Web/Frontend
  jquery: JQUERY_TRACK,
  bootstrap: BOOTSTRAP_TRACK,
  sass: SASS_TRACK,
  // NEW: Systems Languages
  c: C_TRACK,
  cpp: CPP_TRACK,
  swift: SWIFT_TRACK,
  // NEW: Data Science
  r: R_TRACK,
  // NEW: Databases
  mysql: MYSQL_TRACK,
  mongodb: MONGODB_TRACK,
  // NEW: CS Theory
  "intro-programming": INTRO_TRACK,
  dsa: DSA_TRACK,
  // NEW: AI & Security
  "ai-basics": AI_BASICS_TRACK,
  cybersecurity: CYBERSECURITY_TRACK,
  // NEW: More Databases
  postgresql: POSTGRESQL_TRACK,
  // NEW: Data Science Libraries
  numpy: NUMPY_TRACK,
  pandas: PANDAS_TRACK,
  // NEW: DevOps
  docker: DOCKER_TRACK,
  // NEW: Generative AI
  "gen-ai": GEN_AI_TRACK,
  // NEW: More Web
  w3css: W3CSS_TRACK,
  // NEW: More Backend Frameworks
  django: DJANGO_TRACK,
  // NEW: More Data Science
  scipy: SCIPY_TRACK,
  // NEW: Backend Frameworks
  aspnet: ASPNET_TRACK,
  laravel: LARAVEL_TRACK,
  // NEW: DevOps
  aws: AWS_TRACK,
  tauri: TAURI_TRACK,
  // NEW: CS Theory
  assembly: ASSEMBLY_TRACK,
  // NEW: Data Science
  "data-science": DATA_SCIENCE_TRACK,
};

export function getTrackWithFallback(trackId: string, trackTitle: string): StaticTrack {
  if (REAL_TRACKS[trackId]) return REAL_TRACKS[trackId];
  
  if (!generatedTracks.has(trackId)) {
    generatedTracks.set(trackId, generateDynamicTrack(trackId, trackTitle));
  }
  return generatedTracks.get(trackId)!;
}

/** Look up a lesson from the static data by its ID */
export function findStaticLesson(lessonId: string, trackId: string, trackTitle: string): StaticLesson | undefined {
  const track = getTrackWithFallback(trackId, trackTitle);
  for (const unit of track.units) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

/** Look up the next lesson after a given lesson */
export function findNextStaticLesson(lessonId: string, trackId: string, trackTitle: string): StaticLesson | undefined {
  const track = getTrackWithFallback(trackId, trackTitle);
  for (const unit of track.units) {
    const idx = unit.lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      if (idx + 1 < unit.lessons.length) return unit.lessons[idx + 1];
      // Try next unit
      const unitIdx = track.units.indexOf(unit);
      if (unitIdx + 1 < track.units.length) {
        return track.units[unitIdx + 1].lessons[0];
      }
      return undefined;
    }
  }
  return undefined;
}

/** All static tracks with real lesson content */

/** Count total lessons in a track */
export function countTrackLessons(track: StaticTrack): number {
  return track.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
}

export const STATIC_TRACKS: StaticTrack[] = Object.values(REAL_TRACKS);
