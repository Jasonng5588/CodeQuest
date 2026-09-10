/**
 * Python Track — Complete lesson content
 * 4 units × 4 lessons = 16 lessons total
 * execution_engine: "judge0" (server-side Python runner)
 */
import type { StaticTrack } from "./lesson-content";

export const PYTHON_TRACK: StaticTrack = {
  id: "python",
  title: "Python",
  description: `Versatile and readable. From scripting to AI — master Python's syntax and ecosystem.`,
  color: "#3572a5",
  difficulty_curve: "beginner",
  execution_engine: "judge0",
  category: "backend",
  order_index: 20,
  is_published: true,
  estimated_hours: 20,
  learner_count: 22100,
  units: [
    // ─── Unit 1: Python Basics ────────────────────────────────
    {
      id: "python-u1",
      track_id: "python",
      title: "Python Basics",
      description: `Variables, types, and your first Python programs`,
      icon: "book",
      order_index: 1,
      lessons: [
        {
          id: "python-u1-l1",
          unit_id: "python-u1",
          track_id: "python",
          type: "concept",
          title: "Hello, Python!",
          explanation_md: `# Hello, Python!

In Python, printing is simple — no semicolons, no curly braces:

\`\`\`python
print("Hello, World!")
\`\`\`

You can print strings, numbers, or expressions:

\`\`\`python
print("Python is awesome!")
print(42)
print(3.14)
print(2 + 2)    # prints 4
\`\`\`

Notice: Python uses **indentation** instead of braces, and \`#\` for comments.

## Your Task
Print \`Hello, CodeQuest!\` to the console.`,
          starter_code: `# Print "Hello, CodeQuest!" to the console\n`,
          reference_solution: `print("Hello, CodeQuest!")\n`,
          hints: ["Use print() to display output", "Text (strings) must be in quotes — single or double both work", "Make sure the text matches exactly", ],
          test_cases: [{ description: `Prints the correct greeting`, expected_output: `Hello, CodeQuest!` }],
          xp_reward: 50,
          order_index: 1,
          execution_engine: "judge0",
        },
        {
          id: "python-u1-l2",
          unit_id: "python-u1",
          track_id: "python",
          type: "challenge",
          title: "Variables & Types",
          explanation_md: `# Variables & Types

Python variables are created by assignment — no \`let\` or \`var\` needed:

\`\`\`python
name = "Alice"      # str
age = 25            # int
height = 1.75       # float
is_student = True   # bool

print(name)
print(type(age))    # <class 'int'>
\`\`\`

Python is **dynamically typed** — the type is inferred automatically.

## Your Task
1. Create a variable \`name\` with the value \`"Alex"\`
2. Create a variable \`age\` with the value \`21\`
3. Create a variable \`is_learning\` set to \`True\`
4. Print all three`,
          starter_code: `# 1. Create variable name = "Alex"\n# 2. Create variable age = 21\n# 3. Create variable is_learning = True\n# 4. Print all three\n`,
          reference_solution: `name = "Alex"\nage = 21\nis_learning = True\nprint(name)\nprint(age)\nprint(is_learning)\n`,
          hints: ["No keyword needed - just write name = 'Alex'", "Booleans in Python are True/False (capital T/F)", "Use print() for each variable", ],
          test_cases: [
            { description: `Prints Alex`, expected_output: `Alex` },
            { description: `Prints 21`, expected_output: `21` },
            { description: `Prints True`, expected_output: `True` },
          ],
          xp_reward: 75,
          order_index: 2,
          execution_engine: "judge0",
        },
        {
          id: "python-u1-l3",
          unit_id: "python-u1",
          track_id: "python",
          type: "challenge",
          title: "f-Strings",
          explanation_md: `# f-Strings

Python's **f-strings** let you embed variables directly in strings:

\`\`\`python
name = "Alice"
age = 25

# Old way:
print("My name is " + name + " and I am " + str(age))

# f-string (clean!):
print(f"My name is {name} and I am {age}")
\`\`\`

Just prefix your string with \`f\` and use \`{variable}\` inside.

## Your Task
The variables \`city\` and \`country\` are already defined.
Print: \`I live in [city], [country]\``,
          starter_code: `city = "Kuala Lumpur"\ncountry = "Malaysia"\n\n# Print: "I live in Kuala Lumpur, Malaysia"\n`,
          reference_solution: `city = "Kuala Lumpur"\ncountry = "Malaysia"\nprint(f"I live in {city}, {country}")\n`,
          hints: ["Use f'...' with variables in {braces}", "Check the comma and spacing in the expected output", ],
          test_cases: [{ description: `Formats a location string correctly`, expected_output: `I live in Kuala Lumpur, Malaysia` }],
          xp_reward: 100,
          order_index: 3,
          execution_engine: "judge0",
        },
        {
          id: "python-u1-l4",
          unit_id: "python-u1",
          track_id: "python",
          type: "boss",
          title: "Boss: Temperature Converter",
          explanation_md: `# Boss: Temperature Converter

Build a temperature converter!

**Formulas:**
- Celsius to Fahrenheit: \`F = C * 9/5 + 32\`
- Fahrenheit to Celsius: \`C = (F - 32) * 5/9\`

Write a function \`convert_temp(value, unit)\` that:
- If \`unit == "C"\` converts to Fahrenheit, returns result formatted like \`"212.0f"\`
- If \`unit == "F"\` converts to Celsius, returns result formatted like \`"0.0c"\`

\`\`\`python
print(convert_temp(100, "C"))  # 212.0f
print(convert_temp(32, "F"))   # 0.0c
\`\`\``,
          starter_code: `def convert_temp(value, unit):\n    # Your code here\n    pass\n\nprint(convert_temp(100, "C"))   # 212.0f\nprint(convert_temp(32, "F"))    # 0.0c\n`,
          reference_solution: `def convert_temp(value, unit):\n    if unit == "C":\n        result = value * 9 / 5 + 32\n        return f"{result}f"\n    elif unit == "F":\n        result = (value - 32) * 5 / 9\n        return f"{result}c"\n\nprint(convert_temp(100, "C"))\nprint(convert_temp(32, "F"))\n`,
          hints: ["Use if/elif to branch on unit", "Python division: 9/5 is already float division", "Use f-strings to build the return value with the unit letter", ],
          test_cases: [
            { description: `100 C = 212.0f`, expected_output: `212.0f` },
            { description: `32 F = 0.0c`, expected_output: `0.0c` },
          ],
          xp_reward: 250,
          order_index: 4,
          execution_engine: "judge0",
        },
      ],
    },

    // ─── Unit 2: Control Flow ─────────────────────────────────
    {
      id: "python-u2",
      track_id: "python",
      title: "Control Flow",
      description: `if/else, loops, and making decisions`,
      icon: "layers",
      order_index: 2,
      lessons: [
        {
          id: "python-u2-l1",
          unit_id: "python-u2",
          track_id: "python",
          type: "challenge",
          title: "if / elif / else",
          explanation_md: `# if / elif / else

Python uses **indentation** (4 spaces) for code blocks:

\`\`\`python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
\`\`\`

Note: No parentheses needed, and use \`:\` at the end of each condition!

## Your Task
Write a function \`classify_bmi(bmi)\` that returns:
- \`"Underweight"\` for bmi < 18.5
- \`"Normal"\` for 18.5–24.9
- \`"Overweight"\` for 25–29.9
- \`"Obese"\` for 30+`,
          starter_code: `def classify_bmi(bmi):\n    # Return the BMI category\n    pass\n\nprint(classify_bmi(17))    # Underweight\nprint(classify_bmi(22))    # Normal\nprint(classify_bmi(27))    # Overweight\nprint(classify_bmi(35))    # Obese\n`,
          reference_solution: `def classify_bmi(bmi):\n    if bmi < 18.5:\n        return "Underweight"\n    elif bmi < 25:\n        return "Normal"\n    elif bmi < 30:\n        return "Overweight"\n    else:\n        return "Obese"\n\nprint(classify_bmi(17))\nprint(classify_bmi(22))\nprint(classify_bmi(27))\nprint(classify_bmi(35))\n`,
          hints: ["Remember to use : at the end of each if/elif/else line", "Indent the body with 4 spaces", "Return a string like 'Normal' (with quotes)", ],
          test_cases: [
            { description: `17 → Underweight`, expected_output: `Underweight` },
            { description: `22 → Normal`, expected_output: `Normal` },
            { description: `35 → Obese`, expected_output: `Obese` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "judge0",
        },
        {
          id: "python-u2-l2",
          unit_id: "python-u2",
          track_id: "python",
          type: "challenge",
          title: "for Loops",
          explanation_md: `# for Loops

Python's \`for\` loop iterates over any sequence:

\`\`\`python
# Loop over a range
for i in range(1, 6):   # 1 to 5
    print(i)

# Loop over a list
fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print(fruit)
\`\`\`

\`range(start, stop)\` generates numbers from start up to (not including) stop.

## Your Task
Write \`sum_to(n)\` that returns the sum of 1 + 2 + ... + n.

- \`sum_to(5)\` → 15
- \`sum_to(10)\` → 55`,
          starter_code: `def sum_to(n):\n    total = 0\n    # Use a for loop\n    return total\n\nprint(sum_to(5))   # 15\nprint(sum_to(10))  # 55\n`,
          reference_solution: `def sum_to(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nprint(sum_to(5))\nprint(sum_to(10))\n`,
          hints: ["Use range(1, n + 1) to include n", "total += i adds i to the running sum", "Return total after the loop", ],
          test_cases: [
            { description: `sum_to(5) = 15`, expected_output: `15` },
            { description: `sum_to(10) = 55`, expected_output: `55` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "judge0",
        },
        {
          id: "python-u2-l3",
          unit_id: "python-u2",
          track_id: "python",
          type: "challenge",
          title: "while Loops",
          explanation_md: `# while Loops

A \`while\` loop keeps running as long as a condition is True:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
# Prints 0, 1, 2, 3, 4
\`\`\`

Use \`while\` when you don't know in advance how many iterations you need.

## Your Task
Write \`count_digits(n)\` that counts how many digits are in a positive integer.

- \`count_digits(5)\` → 1
- \`count_digits(42)\` → 2
- \`count_digits(12345)\` → 5`,
          starter_code: `def count_digits(n):\n    count = 0\n    while n > 0:\n        # Remove one digit at a time\n        count += 1\n    return count\n\nprint(count_digits(5))      # 1\nprint(count_digits(42))     # 2\nprint(count_digits(12345))  # 5\n`,
          reference_solution: `def count_digits(n):\n    count = 0\n    while n > 0:\n        n = n // 10\n        count += 1\n    return count\n\nprint(count_digits(5))\nprint(count_digits(42))\nprint(count_digits(12345))\n`,
          hints: ["Integer division n // 10 removes the last digit", "Loop while n > 0", "Increment count each iteration", ],
          test_cases: [
            { description: `count_digits(5) = 1`, expected_output: `1` },
            { description: `count_digits(42) = 2`, expected_output: `2` },
            { description: `count_digits(12345) = 5`, expected_output: `5` },
          ],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "judge0",
        },
        {
          id: "python-u2-l4",
          unit_id: "python-u2",
          track_id: "python",
          type: "boss",
          title: "Boss: FizzBuzz",
          explanation_md: `# Boss: FizzBuzz

The classic coding interview question!

Write \`fizzbuzz(n)\` that prints numbers from 1 to n, but:
- Prints \`"Fizz"\` for multiples of 3
- Prints \`"Buzz"\` for multiples of 5
- Prints \`"FizzBuzz"\` for multiples of both
- Otherwise prints the number

\`\`\`
fizzbuzz(15) prints:
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
\`\`\``,
          starter_code: `def fizzbuzz(n):\n    for i in range(1, n + 1):\n        # Check divisibility and print\n        pass\n\nfizzbuzz(15)\n`,
          reference_solution: `def fizzbuzz(n):\n    for i in range(1, n + 1):\n        if i % 3 == 0 and i % 5 == 0:\n            print("FizzBuzz")\n        elif i % 3 == 0:\n            print("Fizz")\n        elif i % 5 == 0:\n            print("Buzz")\n        else:\n            print(i)\n\nfizzbuzz(15)\n`,
          hints: ["Check FizzBuzz (divisible by both 3 and 5) first!", "Use % (modulo) to check divisibility: i % 3 == 0", "Use and to combine two conditions", ],
          test_cases: [
            { description: `3 → Fizz`, expected_output: `Fizz` },
            { description: `5 → Buzz`, expected_output: `Buzz` },
            { description: `15 → FizzBuzz`, expected_output: `FizzBuzz` },
          ],
          xp_reward: 300,
          order_index: 4,
          execution_engine: "judge0",
        },
      ],
    },

    // ─── Unit 3: Lists & Dicts ────────────────────────────────
    {
      id: "python-u3",
      track_id: "python",
      title: "Lists & Dictionaries",
      description: `Python's most powerful built-in data structures`,
      icon: "database",
      order_index: 3,
      lessons: [
        {
          id: "python-u3-l1",
          unit_id: "python-u3",
          track_id: "python",
          type: "challenge",
          title: "Lists",
          explanation_md: `# Lists

Lists hold multiple items in order:

\`\`\`python
fruits = ["apple", "banana", "mango"]

print(fruits[0])    # apple (0-indexed)
print(len(fruits))  # 3

fruits.append("kiwi")   # add to end
fruits.pop()            # remove last item

for fruit in fruits:
    print(fruit)
\`\`\`

## Your Task
Write \`reverse_list(items)\` that returns a new reversed list **without** using \`list.reverse()\` or slicing tricks.

- \`reverse_list([1, 2, 3, 4])\` → \`[4, 3, 2, 1]\``,
          starter_code: `def reverse_list(items):\n    result = []\n    # Loop through items in reverse order\n    return result\n\nprint(reverse_list([1, 2, 3, 4]))       # [4, 3, 2, 1]\nprint(reverse_list(["a", "b", "c"]))    # ['c', 'b', 'a']\n`,
          reference_solution: `def reverse_list(items):\n    result = []\n    for i in range(len(items) - 1, -1, -1):\n        result.append(items[i])\n    return result\n\nprint(reverse_list([1, 2, 3, 4]))\nprint(reverse_list(["a", "b", "c"]))\n`,
          hints: ["Use range(len(items)-1, -1, -1) to loop backwards", "items[i] accesses element at index i",
            "result.append() adds to the new list",
          ],
          test_cases: [
            { description: `reverse_list([1,2,3,4]) = [4, 3, 2, 1]`, expected_output: `[4, 3, 2, 1]` },
            { description: `reverse_list(['a','b','c']) = ['c','b','a']`, expected_output: `['c', 'b', 'a']` },
          ],
          xp_reward: 125,
          order_index: 1,
          execution_engine: "judge0",
        },
        {
          id: "python-u3-l2",
          unit_id: "python-u3",
          track_id: "python",
          type: "challenge",
          title: "List Comprehensions",
          explanation_md: `# List Comprehensions

Python's elegant way to create lists:

\`\`\`python
# Traditional
squares = []
for n in range(1, 6):
    squares.append(n * n)

# List comprehension (same result!)
squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]

# With filter:
evens = [n for n in range(10) if n % 2 == 0]
# [0, 2, 4, 6, 8]
\`\`\`

## Your Task
Write \`squares_of_odds(n)\` using a list comprehension that returns the squares of all odd numbers from 1 to n.

- \`squares_of_odds(9)\` → \`[1, 9, 25, 49, 81]\``,
          starter_code: `def squares_of_odds(n):\n    # Use a list comprehension\n    return []\n\nprint(squares_of_odds(9))   # [1, 9, 25, 49, 81]\n`,
          reference_solution: `def squares_of_odds(n):\n    return [i * i for i in range(1, n + 1) if i % 2 != 0]\n\nprint(squares_of_odds(9))\n`,
          hints: ["Syntax: [expression for item in range if condition]",
            "i % 2 != 0 filters odd numbers",
            "Multiply i * i to square it",
          ],
          test_cases: [{ description: `squares_of_odds(9) = [1, 9, 25, 49, 81]`, expected_output: `[1, 9, 25, 49, 81]` }],
          xp_reward: 150,
          order_index: 2,
          execution_engine: "judge0",
        },
        {
          id: "python-u3-l3",
          unit_id: "python-u3",
          track_id: "python",
          type: "challenge",
          title: "Dictionaries",
          explanation_md: `# Dictionaries

Dictionaries map **keys** to **values**:

\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
}

print(person["name"])            # Alice
print(person.get("job", "N/A")) # N/A (default)

person["email"] = "alice@x.com"  # Add key

for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## Your Task
Write \`word_frequency(text)\` that returns a dictionary mapping each word to how many times it appears.

\`word_frequency("the cat sat on the mat")\` → \`{"the": 2, "cat": 1, "sat": 1, "on": 1, "mat": 1}\``,
          starter_code: `def word_frequency(text):\n    freq = {}\n    # Split words and count each\n    return freq\n\nresult = word_frequency("the cat sat on the mat")\nprint(result["the"])   # 2\nprint(result["cat"])   # 1\n`,
          reference_solution: `def word_frequency(text):\n    freq = {}\n    for word in text.split():\n        freq[word] = freq.get(word, 0) + 1\n    return freq\n\nresult = word_frequency("the cat sat on the mat")\nprint(result["the"])\nprint(result["cat"])\n`,
          hints: ["Use text.split() to break text into words", "Use dict.get(key, 0) to safely read a count (0 if not found)", "Increment: freq[word] = freq.get(word, 0) + 1",
          ],
          test_cases: [
            { description: `'the' appears 2 times`, expected_output: `2` },
            { description: `'cat' appears 1 time`, expected_output: `1` },
          ],
          xp_reward: 150,
          order_index: 3,
          execution_engine: "judge0",
        },
        {
          id: "python-u3-l4",
          unit_id: "python-u3",
          track_id: "python",
          type: "boss",
          title: "Boss: Student Gradebook",
          explanation_md: `# Boss: Student Gradebook

You have a list of student records. Write \`top_students(students, n)\` that:
1. Calculates the average score for each student
2. Returns the top \`n\` students sorted by average (descending)
3. Each result should be a dict: \`{"name": ..., "average": ...}\`

\`\`\`python
students = [
    {"name": "Alice", "scores": [90, 85, 92]},
    {"name": "Bob",   "scores": [70, 75, 80]},
    {"name": "Carol", "scores": [95, 98, 100]},
]
result = top_students(students, 2)
# → Carol (97.7), Alice (89.0)
\`\`\``,
          starter_code: `def top_students(students, n):\n    # Your code here\n    pass\n\nstudents = [\n    {"name": "Alice", "scores": [90, 85, 92]},\n    {"name": "Bob",   "scores": [70, 75, 80]},\n    {"name": "Carol", "scores": [95, 98, 100]},\n]\n\nresult = top_students(students, 2)\nfor s in result:\n    print(f"{s['name']}: {s['average']:.1f}")\n`,
          reference_solution: `def top_students(students, n):\n    with_avg = []\n    for s in students:\n        avg = sum(s["scores"]) / len(s["scores"])\n        with_avg.append({"name": s["name"], "average": avg})\n    with_avg.sort(key=lambda x: x["average"], reverse=True)\n    return with_avg[:n]\n\nstudents = [\n    {"name": "Alice", "scores": [90, 85, 92]},\n    {"name": "Bob",   "scores": [70, 75, 80]},\n    {"name": "Carol", "scores": [95, 98, 100]},\n]\n\nresult = top_students(students, 2)\nfor s in result:\n    print(f"{s['name']}: {s['average']:.1f}")\n`,
          hints: ["Use sum(scores) / len(scores) for average", "Sort with list.sort(key=lambda x: x['average'], reverse=True)",
            "Use list slicing [:n] to get top n results",
          ],
          test_cases: [
            { description: `Carol has highest average (printed first)`, expected_output: `Carol: 97.7` },
            { description: `Alice is second`, expected_output: `Alice: 89.0` },
          ],
          xp_reward: 400,
          order_index: 4,
          execution_engine: "judge0",
        },
      ],
    },

    // ─── Unit 4: Functions & OOP ──────────────────────────────
    {
      id: "python-u4",
      track_id: "python",
      title: "Functions & OOP",
      description: `Advanced functions, classes and objects`,
      icon: "code",
      order_index: 4,
      lessons: [
        {
          id: "python-u4-l1",
          unit_id: "python-u4",
          track_id: "python",
          type: "challenge",
          title: "Lambda & map/filter",
          explanation_md: `# Lambda & map/filter

**Lambda** functions are anonymous one-liners:

\`\`\`python
square = lambda x: x * x
print(square(5))  # 25
\`\`\`

**map** and **filter** accept functions:

\`\`\`python
nums = [1, 2, 3, 4, 5]

doubled = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8, 10]

evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]
\`\`\`

## Your Task
Write \`process(nums)\` that uses \`map\` and \`filter\` (with lambdas) to:
1. Keep only numbers > 5
2. Square each remaining number

\`process([1, 4, 6, 8, 3, 10])\` → \`[36, 64, 100]\``,
          starter_code: `def process(nums):\n    # 1. Filter nums > 5\n    # 2. Square each\n    # Use map and filter with lambdas\n    pass\n\nprint(process([1, 4, 6, 8, 3, 10]))  # [36, 64, 100]\n`,
          reference_solution: `def process(nums):\n    filtered = filter(lambda x: x > 5, nums)\n    squared = map(lambda x: x * x, filtered)\n    return list(squared)\n\nprint(process([1, 4, 6, 8, 3, 10]))\n`,
          hints: ["filter(lambda x: x > 5, nums) keeps numbers > 5", "map(lambda x: x*x, filtered) squares each", "Wrap the final result in list()", ],
          test_cases: [{ description: `process([1,4,6,8,3,10]) = [36, 64, 100]`, expected_output: `[36, 64, 100]` }],
          xp_reward: 150,
          order_index: 1,
          execution_engine: "judge0",
        },
        {
          id: "python-u4-l2",
          unit_id: "python-u4",
          track_id: "python",
          type: "challenge",
          title: "Classes & Objects",
          explanation_md: `# Classes & Objects

Python classes group data and behaviour:

\`\`\`python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says: Woof!"

dog = Dog("Rex", "Labrador")
print(dog.bark())   # Rex says: Woof!
\`\`\`

## Your Task
Create a \`BankAccount\` class with:
- \`__init__(self, owner, balance=0)\`
- \`deposit(amount)\` — adds to balance, returns new balance
- \`withdraw(amount)\` — if funds available returns new balance, else returns \`"Insufficient funds"\``,
          starter_code: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n\nacc = BankAccount("Alice", 100)\nprint(acc.deposit(50))    # 150\nprint(acc.withdraw(30))   # 120\nprint(acc.withdraw(200))  # Insufficient funds\n`,
          reference_solution: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return "Insufficient funds"\n        self.balance -= amount\n        return self.balance\n\nacc = BankAccount("Alice", 100)\nprint(acc.deposit(50))\nprint(acc.withdraw(30))\nprint(acc.withdraw(200))\n`,
          hints: ["self.balance += amount in deposit()", "Check if amount > self.balance before withdrawing", "Return the new balance, or the string 'Insufficient funds'", ],
          test_cases: [
            { description: `deposit(50) → 150`, expected_output: `150` },
            { description: `withdraw(30) → 120`, expected_output: `120` },
            { description: `withdraw(200) → Insufficient funds`, expected_output: `Insufficient funds` },
          ],
          xp_reward: 200,
          order_index: 2,
          execution_engine: "judge0",
        },
        {
          id: "python-u4-l3",
          unit_id: "python-u4",
          track_id: "python",
          type: "challenge",
          title: "Inheritance",
          explanation_md: `# Inheritance

A class can **inherit** from another class:

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):          # Override
        return f"{self.name}: Woof!"
\`\`\`

## Your Task
Create a \`Shape\` base class, then:
- \`Rectangle(width, height)\` — area = width × height
- \`Circle(radius)\` — area = 3.14159 × r²

Both override \`area()\` and return the result rounded to 2 decimals.`,
          starter_code: `class Shape:\n    def area(self):\n        return 0\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        pass\n\nprint(Rectangle(4, 5).area())   # 20\nprint(Circle(7).area())         # 153.94\n`,
          reference_solution: `class Shape:\n    def area(self):\n        return 0\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return round(self.width * self.height, 2)\n\nclass Circle(Shape):\n    PI = 3.14159\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return round(Circle.PI * self.radius ** 2, 2)\n\nprint(Rectangle(4, 5).area())\nprint(Circle(7).area())\n`,
          hints: ["Rectangle.area() = self.width * self.height", "Circle.area() = 3.14159 * self.radius ** 2", "Use round(value, 2) to round to 2 decimal places", ],
          test_cases: [
            { description: `Rectangle(4,5).area() = 20`, expected_output: `20` },
            { description: `Circle(7).area() = 153.94`, expected_output: `153.94` },
          ],
          xp_reward: 175,
          order_index: 3,
          execution_engine: "judge0",
        },
        {
          id: "python-u4-l4",
          unit_id: "python-u4",
          track_id: "python",
          type: "boss",
          title: "Boss: Inventory System",
          explanation_md: `# Boss: Inventory System

Build a complete inventory management system!

**Product:**
- \`__init__(name, price, quantity)\`
- \`total_value()\` → price × quantity

**Inventory:**
- \`add(product)\` — adds a Product
- \`total_value()\` — sum of all product total_values
- \`most_valuable()\` — returns the Product with highest total_value

\`\`\`python
inv = Inventory()
inv.add(Product("Apple", 0.5, 100))
inv.add(Product("Laptop", 999, 5))
inv.add(Product("Pen", 1.2, 50))

print(inv.total_value())         # 5055.0
print(inv.most_valuable().name)  # Laptop
\`\`\``,
          starter_code: `class Product:\n    def __init__(self, name, price, quantity):\n        self.name = name\n        self.price = price\n        self.quantity = quantity\n\n    def total_value(self):\n        pass\n\nclass Inventory:\n    def __init__(self):\n        self.products = []\n\n    def add(self, product):\n        pass\n\n    def total_value(self):\n        pass\n\n    def most_valuable(self):\n        pass\n\ninv = Inventory()\ninv.add(Product("Apple", 0.5, 100))\ninv.add(Product("Laptop", 999, 5))\ninv.add(Product("Pen", 1.2, 50))\n\nprint(inv.total_value())\nprint(inv.most_valuable().name)\n`,
          reference_solution: `class Product:\n    def __init__(self, name, price, quantity):\n        self.name = name\n        self.price = price\n        self.quantity = quantity\n\n    def total_value(self):\n        return self.price * self.quantity\n\nclass Inventory:\n    def __init__(self):\n        self.products = []\n\n    def add(self, product):\n        self.products.append(product)\n\n    def total_value(self):\n        return sum(p.total_value() for p in self.products)\n\n    def most_valuable(self):\n        return max(self.products, key=lambda p: p.total_value())\n\ninv = Inventory()\ninv.add(Product("Apple", 0.5, 100))\ninv.add(Product("Laptop", 999, 5))\ninv.add(Product("Pen", 1.2, 50))\n\nprint(inv.total_value())\nprint(inv.most_valuable().name)\n`,
          hints: ["Product.total_value() = self.price * self.quantity", "Inventory.total_value() uses sum() with a generator expression", "Use max() with key=lambda to find most valuable product", ],
          test_cases: [
            { description: `Total inventory value is 5055.0`, expected_output: `5055.0` },
            { description: `Most valuable product is Laptop`, expected_output: `Laptop` },
          ],
          xp_reward: 500,
          order_index: 4,
          execution_engine: "judge0",
        },
      ],
    },
  ],
};
