import type { StaticTrack } from "./lesson-content";

export const JAVA_TRACK: StaticTrack = {
  id: "java",
  title: "Java",
  description: `Master OOP, generics, streams, and concurrency in the world's most popular enterprise language.`,
  color: "#b07219",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "java-u1",
      track_id: "java",
      title: "Java Basics",
      description: `Classes, types, and OOP`,
      icon: "☕",
      order_index: 1,
      lessons: [
        {
          id: "java-u1-l1",
          unit_id: "java-u1",
          track_id: "java",
          type: "concept",
          title: "Classes & Objects",
          explanation_md: `## Java: Object-Oriented from the Ground Up

Java is **strongly typed** and **class-based**. Everything lives inside a class.

\`\`\`java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String greet() {
        return "Hi, I'm " + name + " and I'm " + age + " years old.";
    }
}

Person alice = new Person("Alice", 30);
System.out.println(alice.greet());
\`\`\`

### Key Concepts
- **Class**: Blueprint for objects
- **Object**: Instance of a class
- **Constructor**: Initializes the object
- **\`this\`**: Refers to the current object

### Challenge (JS simulation)
Write \`createPerson(name, age)\` that returns an object with a \`greet()\` method returning \`"Hi, I'm NAME and I'm AGE years old."\`.
`,
          starter_code: `function createPerson(name, age) {
  return {
    greet: function() {
      // Return "Hi, I'm NAME and I'm AGE years old."
    }
  };
}

const alice = createPerson("Alice", 30);
console.log(alice.greet());`,
          reference_solution: `function createPerson(name, age) {
  return { greet: () => "Hi, I'm " + name + " and I'm " + age + " years old." };
}
const alice = createPerson("Alice", 30);
console.log(alice.greet());`,
          hints: ['Return an object with a greet function', 'Use closure to access name and age'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `alice.greet() is correct`, expected_output: `Hi, I'm Alice and I'm 30 years old.` },
          ],
        },
        {
          id: "java-u1-l2",
          unit_id: "java-u1",
          track_id: "java",
          type: "concept",
          title: "Inheritance & Polymorphism",
          explanation_md: `## Inheritance in Java

Java uses \`extends\` for single inheritance. \`super\` calls the parent constructor.

\`\`\`java
public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public String sound() { return "..."; }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    
    @Override
    public String sound() { return "Woof!"; }
    
    public String describe() {
        return name + " says " + sound();
    }
}

Dog rex = new Dog("Rex");
System.out.println(rex.describe()); // Rex says Woof!
\`\`\`

### Challenge
Implement \`createAnimal(name, sound)\` that returns an object with \`describe()\` returning \`"NAME says SOUND"\`.
`,
          starter_code: `function createAnimal(name, sound) {
  return {
    describe: function() {
      // Return "NAME says SOUND"
    }
  };
}

console.log(createAnimal("Rex", "Woof!").describe());
console.log(createAnimal("Mittens", "Meow!").describe());`,
          reference_solution: `function createAnimal(name, sound) {
  return { describe: () => name + " says " + sound };
}
console.log(createAnimal("Rex", "Woof!").describe());
console.log(createAnimal("Mittens", "Meow!").describe());`,
          hints: ["Concatenate name + ' says ' + sound"],
          xp_reward: 75,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Dog describes correctly`, expected_output: `Rex says Woof!` },
            { description: `Cat describes correctly`, expected_output: `Mittens says Meow!` },
          ],
        },
        {
          id: "java-u1-l3",
          unit_id: "java-u1",
          track_id: "java",
          type: "concept",
          title: "Interfaces & Abstract Classes",
          explanation_md: `## Interfaces vs Abstract Classes

**Interface**: Contract — all methods are abstract by default.
**Abstract Class**: Partial implementation with abstract methods.

\`\`\`java
interface Drawable {
    void draw();  // All implementing classes must implement this
    default String getType() { return "Shape"; }
}

abstract class Shape implements Drawable {
    abstract double area();  // Subclasses must implement
    
    public String describe() {
        return getType() + " with area " + area();
    }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    
    @Override
    public double area() { return Math.PI * radius * radius; }
    
    @Override
    public void draw() { System.out.println("Drawing circle"); }
}
\`\`\`

### Challenge
Write \`getShapeArea(type, dimension)\`. For "circle" return \`Math.PI * r * r\` (rounded to 2 decimals), for "square" return \`d * d\`.
`,
          starter_code: `function getShapeArea(type, dimension) {
  if (type === "circle") {
    return Math.round(Math.PI * dimension * dimension * 100) / 100;
  }
  // handle "square"
}

console.log(getShapeArea("circle", 5));   // ~78.54
console.log(getShapeArea("square", 4));   // 16`,
          reference_solution: `function getShapeArea(type, dimension) {
  if (type === "circle") return Math.round(Math.PI * dimension * dimension * 100) / 100;
  if (type === "square") return dimension * dimension;
}
console.log(getShapeArea("circle", 5));
console.log(getShapeArea("square", 4));`,
          hints: ['For circle: Math.PI * r * r', 'For square: d * d'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Circle area ~78.54`, expected_output: `78.54` },
            { description: `Square area 16`, expected_output: `16` },
          ],
        },
        {
          id: "java-u1-l4",
          unit_id: "java-u1",
          track_id: "java",
          type: "challenge",
          title: "Java Collections Challenge",
          explanation_md: `## Java Collections Framework

Java has \`ArrayList\`, \`HashMap\`, \`HashSet\`, etc.

\`\`\`java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.getOrDefault("Carol", 0); // 0
scores.entrySet().stream()
  .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
  .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));
\`\`\`

### Boss Challenge
Write \`topStudents(scores, n)\` where scores is \`{ name: number }\` — return the top \`n\` students sorted by score descending as \`"NAME: SCORE"\` lines.
`,
          starter_code: `function topStudents(scores, n) {
  // Sort by score descending, take top n
  // Return array of "NAME: SCORE" strings joined by newline
}

const scores = { Alice: 95, Bob: 87, Carol: 92, Dave: 78 };
console.log(topStudents(scores, 2));`,
          reference_solution: `function topStudents(scores, n) {
  return Object.entries(scores)
    .sort(([,a],[,b]) => b - a)
    .slice(0, n)
    .map(([name, score]) => name + ": " + score)
    .join("\n");
}
const scores = { Alice: 95, Bob: 87, Carol: 92, Dave: 78 };
console.log(topStudents(scores, 2));`,
          hints: ['Use Object.entries() to get [name, score] pairs', 'Sort by score descending'],
          xp_reward: 110,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Top 2 students`, expected_output: `Alice: 95\nCarol: 92` },
          ],
        },
      ],
    },
    {
      id: "java-u2",
      track_id: "java",
      title: "Java Generics & Streams",
      description: `Generics, lambdas, and the Stream API`,
      icon: "🌊",
      order_index: 2,
      lessons: [
        {
          id: "java-u2-l1",
          unit_id: "java-u2",
          track_id: "java",
          type: "concept",
          title: "Generics",
          explanation_md: `## Java Generics: Type-Safe Data Structures

Generics allow type parameters for classes and methods:

\`\`\`java
public class Stack<T> {
    private List<T> items = new ArrayList<>();
    
    public void push(T item) { items.add(item); }
    public T pop() { return items.remove(items.size() - 1); }
    public T peek() { return items.get(items.size() - 1); }
    public boolean isEmpty() { return items.isEmpty(); }
}

Stack<Integer> nums = new Stack<>();
nums.push(1); nums.push(2); nums.push(3);
System.out.println(nums.pop()); // 3
\`\`\`

### Challenge
Implement a \`createStack()\` function with \`push\`, \`pop\`, \`peek\`, and \`isEmpty\` methods.
`,
          starter_code: `function createStack() {
  const items = [];
  return {
    push: (item) => items.push(item),
    pop: () => items.pop(),
    peek: () => items[items.length - 1],
    isEmpty: () => items.length === 0,
  };
}

const stack = createStack();
stack.push(1); stack.push(2); stack.push(3);
console.log(stack.pop());   // 3
console.log(stack.peek());  // 2
console.log(stack.isEmpty()); // false`,
          reference_solution: `function createStack() {
  const items = [];
  return {
    push: (item) => items.push(item),
    pop: () => items.pop(),
    peek: () => items[items.length - 1],
    isEmpty: () => items.length === 0,
  };
}
const stack = createStack();
stack.push(1); stack.push(2); stack.push(3);
console.log(stack.pop());
console.log(stack.peek());
console.log(stack.isEmpty());`,
          hints: ['Array has push, pop methods built-in', 'peek returns the last element without removing it'],
          xp_reward: 85,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `pop returns 3`, expected_output: `3` },
            { description: `peek returns 2`, expected_output: `2` },
            { description: `isEmpty returns false`, expected_output: `false` },
          ],
        },
        {
          id: "java-u2-l2",
          unit_id: "java-u2",
          track_id: "java",
          type: "concept",
          title: "Lambda Expressions",
          explanation_md: `## Lambda Expressions & Functional Interfaces

Java 8 introduced lambdas for functional programming:

\`\`\`java
// Before lambdas
Comparator<String> byLength = new Comparator<String>() {
    @Override
    public int compare(String a, String b) { return a.length() - b.length(); }
};

// With lambda
Comparator<String> byLength = (a, b) -> a.length() - b.length();

// Functional interfaces
Function<String, Integer> strlen = s -> s.length();
Predicate<Integer> isEven = n -> n % 2 == 0;
Consumer<String> printer = s -> System.out.println(s);
Supplier<String> greet = () -> "Hello!";
\`\`\`

### Challenge
Write \`applyTransforms(values, transforms)\` where transforms is an array of functions.
Apply each transform in sequence to each value.
`,
          starter_code: `function applyTransforms(values, transforms) {
  // Apply each transform to each value
  // Return the array of transformed values
  return values.map(v => transforms.reduce((acc, fn) => fn(acc), v));
}

const transforms = [
  x => x * 2,
  x => x + 10,
  x => x.toString() + "!",
];
console.log(applyTransforms([1, 2, 3], transforms));`,
          reference_solution: `function applyTransforms(values, transforms) {
  return values.map(v => transforms.reduce((acc, fn) => fn(acc), v));
}
const transforms = [x => x * 2, x => x + 10, x => x.toString() + "!"];
console.log(applyTransforms([1, 2, 3], transforms));`,
          hints: ['Use .map() for values and .reduce() for transforms', 'Each fn takes the result of the previous fn'],
          xp_reward: 85,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Transforms applied correctly`, expected_output: `12!,14!,16!` },
          ],
        },
        {
          id: "java-u2-l3",
          unit_id: "java-u2",
          track_id: "java",
          type: "concept",
          title: "Stream API",
          explanation_md: `## Java Stream API: Functional Data Processing

Streams process collections declaratively:

\`\`\`java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

int sumOfEvenSquares = nums.stream()
    .filter(n -> n % 2 == 0)         // 2, 4, 6, 8, 10
    .map(n -> n * n)                  // 4, 16, 36, 64, 100
    .reduce(0, Integer::sum);          // 220

List<String> words = List.of("apple", "banana", "cherry", "avocado");
List<String> aWords = words.stream()
    .filter(w -> w.startsWith("a"))
    .sorted()
    .collect(Collectors.toList());    // [apple, avocado]
\`\`\`

### Challenge
Write \`streamProcess(numbers)\`:
1. Filter to even numbers
2. Square each
3. Return the sum
`,
          starter_code: `function streamProcess(numbers) {
  return numbers
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .reduce((sum, n) => sum + n, 0);
}

console.log(streamProcess([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // 220`,
          reference_solution: `function streamProcess(numbers) {
  return numbers.filter(n => n % 2 === 0).map(n => n * n).reduce((sum, n) => sum + n, 0);
}
console.log(streamProcess([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));`,
          hints: ['Chain filter, map, reduce', 'filter for n % 2 === 0, map to n*n, reduce to sum'],
          xp_reward: 90,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Sum of squares of evens 1-10 is 220`, expected_output: `220` },
          ],
        },
        {
          id: "java-u2-l4",
          unit_id: "java-u2",
          track_id: "java",
          type: "challenge",
          title: "Design Patterns Boss",
          explanation_md: `## Design Patterns in Java

### Singleton
\`\`\`java
public class Config {
    private static Config instance;
    private Map<String, String> settings = new HashMap<>();
    
    private Config() {}
    
    public static Config getInstance() {
        if (instance == null) instance = new Config();
        return instance;
    }
    
    public void set(String key, String value) { settings.put(key, value); }
    public String get(String key) { return settings.getOrDefault(key, null); }
}
\`\`\`

### Observer Pattern
Implement a simple event emitter with \`on(event, fn)\`, \`emit(event, data)\`, \`off(event, fn)\`.
`,
          starter_code: `function createEventEmitter() {
  const handlers = {};
  return {
    on: (event, fn) => {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(fn);
    },
    emit: (event, data) => {
      (handlers[event] || []).forEach(fn => fn(data));
    },
    off: (event, fn) => {
      if (handlers[event]) {
        handlers[event] = handlers[event].filter(h => h !== fn);
      }
    },
  };
}

const emitter = createEventEmitter();
const log = data => console.log("Event:", data);
emitter.on("click", log);
emitter.emit("click", "button1"); // Event: button1
emitter.off("click", log);
emitter.emit("click", "button2"); // Nothing`,
          reference_solution: `function createEventEmitter() {
  const handlers = {};
  return {
    on: (event, fn) => { if (!handlers[event]) handlers[event] = []; handlers[event].push(fn); },
    emit: (event, data) => { (handlers[event] || []).forEach(fn => fn(data)); },
    off: (event, fn) => { if (handlers[event]) handlers[event] = handlers[event].filter(h => h !== fn); },
  };
}
const emitter = createEventEmitter();
const log = data => console.log("Event:", data);
emitter.on("click", log);
emitter.emit("click", "button1");
emitter.off("click", log);
emitter.emit("click", "button2");`,
          hints: ['Store handlers as an object of arrays', 'off removes the specific function from the array'],
          xp_reward: 130,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `First emit fires: Event: button1`, expected_output: `Event: button1` },
          ],
        },
      ],
    },
    {
      id: "java-u3",
      track_id: "java",
      title: "Java Exception Handling",
      description: `Try-catch, custom exceptions, and error handling`,
      icon: "🛡️",
      order_index: 3,
      lessons: [
        {
          id: "java-u3-l1",
          unit_id: "java-u3",
          track_id: "java",
          type: "concept",
          title: "Try-Catch-Finally",
          explanation_md: `## Exception Handling in Java

\`\`\`java
public double divide(int a, int b) {
    try {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return (double) a / b;
    } catch (ArithmeticException e) {
        System.out.println("Error: " + e.getMessage());
        return 0;
    } finally {
        System.out.println("divide() called"); // Always runs
    }
}
\`\`\`

### Checked vs Unchecked
- **Checked**: Must be declared or caught (\`IOException\`, \`SQLException\`)
- **Unchecked**: Runtime errors (\`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`)

### Challenge
Write \`safeDivide(a, b)\` — returns \`a / b\` or \`"Error: division by zero"\` if b is 0.
`,
          starter_code: `function safeDivide(a, b) {
  try {
    if (b === 0) throw new Error("division by zero");
    return a / b;
  } catch (e) {
    return "Error: " + e.message;
  }
}

console.log(safeDivide(10, 2));   // 5
console.log(safeDivide(10, 0));   // Error: division by zero`,
          reference_solution: `function safeDivide(a, b) {
  try {
    if (b === 0) throw new Error("division by zero");
    return a / b;
  } catch (e) { return "Error: " + e.message; }
}
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));`,
          hints: ['Check if b === 0 and throw Error', 'Catch the error and return the error message'],
          xp_reward: 75,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `10/2 = 5`, expected_output: `5` },
            { description: `10/0 returns error`, expected_output: `Error: division by zero` },
          ],
        },
        {
          id: "java-u3-l2",
          unit_id: "java-u3",
          track_id: "java",
          type: "concept",
          title: "Custom Exceptions",
          explanation_md: `## Custom Exception Classes

\`\`\`java
public class ValidationException extends RuntimeException {
    private String field;
    
    public ValidationException(String field, String message) {
        super(message);
        this.field = field;
    }
    
    public String getField() { return field; }
}

// Usage
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new ValidationException("age", "Age must be 0-150");
    }
    this.age = age;
}
\`\`\`

### Challenge
Write \`validateUser({ name, age, email })\`. Throw descriptive errors for:
- name empty → \`"Name is required"\`
- age < 0 or age > 120 → \`"Age must be between 0 and 120"\`
- email missing @ → \`"Invalid email format"\`
Return \`"Valid"\` if all pass.
`,
          starter_code: `function validateUser({ name, age, email }) {
  if (!name || name.trim() === "") throw new Error("Name is required");
  if (age < 0 || age > 120) throw new Error("Age must be between 0 and 120");
  if (!email.includes("@")) throw new Error("Invalid email format");
  return "Valid";
}

try { console.log(validateUser({ name: "Alice", age: 25, email: "alice@test.com" })); }
catch (e) { console.log(e.message); }

try { console.log(validateUser({ name: "", age: 25, email: "alice@test.com" })); }
catch (e) { console.log(e.message); }

try { console.log(validateUser({ name: "Bob", age: 200, email: "bob@test.com" })); }
catch (e) { console.log(e.message); }`,
          reference_solution: `function validateUser({ name, age, email }) {
  if (!name || name.trim() === "") throw new Error("Name is required");
  if (age < 0 || age > 120) throw new Error("Age must be between 0 and 120");
  if (!email.includes("@")) throw new Error("Invalid email format");
  return "Valid";
}
try { console.log(validateUser({ name: "Alice", age: 25, email: "alice@test.com" })); } catch (e) { console.log(e.message); }
try { console.log(validateUser({ name: "", age: 25, email: "alice@test.com" })); } catch (e) { console.log(e.message); }
try { console.log(validateUser({ name: "Bob", age: 200, email: "bob@test.com" })); } catch (e) { console.log(e.message); }`,
          hints: ['Check each condition and throw appropriately', "Use .includes('@') for email check"],
          xp_reward: 90,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Valid user returns Valid`, expected_output: `Valid` },
            { description: `Empty name throws`, expected_output: `Name is required` },
            { description: `Age 200 throws`, expected_output: `Age must be between 0 and 120` },
          ],
        },
        {
          id: "java-u3-l3",
          unit_id: "java-u3",
          track_id: "java",
          type: "concept",
          title: "Optional & Null Safety",
          explanation_md: `## Java Optional: Avoid NullPointerException

\`Optional<T>\` is a container that may or may not hold a value:

\`\`\`java
Optional<String> name = Optional.of("Alice");
Optional<String> empty = Optional.empty();

// Safe access
String result = name.orElse("Anonymous");   // "Alice"
String r2 = empty.orElse("Anonymous");       // "Anonymous"

// Chain operations
Optional<Integer> len = name.map(String::length); // Optional[5]
name.ifPresent(n -> System.out.println("Name: " + n));
\`\`\`

### Challenge
Write \`safeGet(obj, key)\` — returns \`obj[key]\` or \`"N/A"\` if the key doesn't exist or obj is null.
`,
          starter_code: `function safeGet(obj, key) {
  if (obj === null || obj === undefined) return "N/A";
  return obj[key] !== undefined ? obj[key] : "N/A";
}

console.log(safeGet({ name: "Alice" }, "name"));  // Alice
console.log(safeGet({ name: "Alice" }, "age"));   // N/A
console.log(safeGet(null, "name"));               // N/A`,
          reference_solution: `function safeGet(obj, key) {
  if (obj == null) return "N/A";
  return obj[key] !== undefined ? String(obj[key]) : "N/A";
}
console.log(safeGet({ name: "Alice" }, "name"));
console.log(safeGet({ name: "Alice" }, "age"));
console.log(safeGet(null, "name"));`,
          hints: ['Check for null/undefined first', 'Then check if the key exists in the object'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `key exists returns value`, expected_output: `Alice` },
            { description: `missing key returns N/A`, expected_output: `N/A` },
            { description: `null obj returns N/A`, expected_output: `N/A` },
          ],
        },
        {
          id: "java-u3-l4",
          unit_id: "java-u3",
          track_id: "java",
          type: "challenge",
          title: "Java Final Boss: Algorithm Challenge",
          explanation_md: `## Boss: Implement Binary Search

Binary search finds an element in a **sorted** array in O(log n):

\`\`\`
Array: [1, 3, 5, 7, 9, 11, 13]
Find 7:
  mid = 3 → arr[3] = 7 ✓ Found at index 3!
\`\`\`

### Challenge
Write \`binarySearch(arr, target)\` — returns the index of \`target\` in sorted \`arr\`, or \`-1\` if not found.
`,
          starter_code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}

console.log(binarySearch([1,3,5,7,9,11,13], 7));   // 3
console.log(binarySearch([1,3,5,7,9,11,13], 6));   // -1
console.log(binarySearch([2,4,6,8,10], 10));        // 4`,
          reference_solution: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
console.log(binarySearch([1,3,5,7,9,11,13], 7));
console.log(binarySearch([1,3,5,7,9,11,13], 6));
console.log(binarySearch([2,4,6,8,10], 10));`,
          hints: ['Calculate mid as (left + right) / 2', 'If target > arr[mid], search right half; else search left half'],
          xp_reward: 120,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Found at index 3`, expected_output: `3` },
            { description: `Not found returns -1`, expected_output: `-1` },
            { description: `Found at index 4`, expected_output: `4` },
          ],
        },
      ],
    },
    {
      id: "java-u4",
      track_id: "java",
      title: "Java Concurrency",
      description: `Threads, synchronization, and concurrent collections`,
      icon: "⚡",
      order_index: 4,
      lessons: [
        {
          id: "java-u4-l1",
          unit_id: "java-u4",
          track_id: "java",
          type: "concept",
          title: "Multithreading Concepts",
          explanation_md: `## Java Concurrency

Java supports multithreading natively. Key concepts:

\`\`\`java
// Creating threads
Thread t = new Thread(() -> {
    System.out.println("Running in thread: " + Thread.currentThread().getName());
});
t.start();

// Runnable with ExecutorService
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> processData());
pool.shutdown();
\`\`\`

### Race Conditions
When multiple threads access shared data without synchronization:
\`\`\`java
// BAD: Race condition!
private int counter = 0;
void increment() { counter++; }  // Not atomic!

// GOOD: Synchronized
synchronized void increment() { counter++; }

// BETTER: AtomicInteger
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
\`\`\`

### Challenge
Simulate thread-safe counting: write \`createSafeCounter(initialValue)\` with \`increment()\`, \`decrement()\`, \`get()\`.
`,
          starter_code: `function createSafeCounter(initial) {
  // In JS, we simulate thread safety with a closure
  let count = initial;
  const lock = { locked: false };
  
  function withLock(fn) {
    // Simulate atomic operation
    const result = fn(count);
    count = result;
    return count;
  }
  
  return {
    increment: () => withLock(c => c + 1),
    decrement: () => withLock(c => c - 1),
    get: () => count,
  };
}

const counter = createSafeCounter(0);
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.get()); // 2`,
          reference_solution: `function createSafeCounter(initial) {
  let count = initial;
  return {
    increment: () => { count++; return count; },
    decrement: () => { count--; return count; },
    get: () => count,
  };
}
const counter = createSafeCounter(0);
counter.increment(); counter.increment(); counter.increment(); counter.decrement();
console.log(counter.get());`,
          hints: ['Use a closure to keep count private'],
          xp_reward: 90,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Counter is 2 after 3 increments and 1 decrement`, expected_output: `2` },
          ],
        },
        {
          id: "java-u4-l2",
          unit_id: "java-u4",
          track_id: "java",
          type: "concept",
          title: "CompletableFuture & Async",
          explanation_md: `## CompletableFuture: Async Programming in Java

\`\`\`java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())         // Run async
    .thenApply(data -> process(data))       // Transform
    .thenApply(result -> format(result))    // Chain
    .exceptionally(e -> "Error: " + e.getMessage()); // Handle errors

// Combine multiple futures
CompletableFuture<String> a = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> b = CompletableFuture.supplyAsync(() -> "World");
CompletableFuture.allOf(a, b)
    .thenRun(() -> System.out.println(a.join() + " " + b.join()));
\`\`\`

### Challenge
Write \`pipeline(value, ...fns)\` — applies each function in sequence (like a Java stream pipeline).
`,
          starter_code: `function pipeline(value, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), value);
}

const result = pipeline(
  5,
  x => x * 2,          // 10
  x => x + 3,          // 13
  x => x.toString(),   // "13"
  x => "Result: " + x  // "Result: 13"
);
console.log(result);`,
          reference_solution: `function pipeline(value, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), value);
}
const result = pipeline(5, x => x * 2, x => x + 3, x => x.toString(), x => "Result: " + x);
console.log(result);`,
          hints: ['Use reduce with initial value = value'],
          xp_reward: 85,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Pipeline produces Result: 13`, expected_output: `Result: 13` },
          ],
        },
        {
          id: "java-u4-l3",
          unit_id: "java-u4",
          track_id: "java",
          type: "concept",
          title: "Java I/O & Serialization",
          explanation_md: `## Java I/O Streams

Java uses streams for I/O. Modern Java uses NIO (Non-blocking I/O):

\`\`\`java
// Reading a file
Path path = Path.of("data.txt");
List<String> lines = Files.readAllLines(path);

// Writing a file
Files.writeString(path, "Hello, World!");

// Serialization (convert object to bytes)
ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("data.ser"));
out.writeObject(myObject);

// JSON (with Jackson)
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(person);  // {"name":"Alice","age":30}
Person p = mapper.readValue(json, Person.class);
\`\`\`

### Challenge
Write \`serialize(obj)\` and \`deserialize(str)\` using JSON:
`,
          starter_code: `function serialize(obj) {
  return JSON.stringify(obj);
}

function deserialize(str) {
  return JSON.parse(str);
}

const original = { name: "Alice", age: 30, scores: [95, 87, 92] };
const serialized = serialize(original);
console.log(serialized);

const restored = deserialize(serialized);
console.log(restored.name);
console.log(restored.scores[0]);`,
          reference_solution: `function serialize(obj) { return JSON.stringify(obj); }
function deserialize(str) { return JSON.parse(str); }
const original = { name: "Alice", age: 30, scores: [95, 87, 92] };
const serialized = serialize(original);
console.log(serialized);
const restored = deserialize(serialized);
console.log(restored.name);
console.log(restored.scores[0]);`,
          hints: ['JSON.stringify for serialization, JSON.parse for deserialization'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Serialized JSON contains name`, expected_output: `{"name":"Alice","age":30,"scores":[95,87,92]}` },
            { description: `Deserialized name is Alice`, expected_output: `Alice` },
            { description: `Deserialized first score is 95`, expected_output: `95` },
          ],
        },
        {
          id: "java-u4-l4",
          unit_id: "java-u4",
          track_id: "java",
          type: "challenge",
          title: "Java Grand Boss: LRU Cache",
          explanation_md: `## Grand Boss: LRU Cache Implementation

**LRU (Least Recently Used)** cache evicts the oldest accessed item when full.

\`\`\`
Capacity: 3
Put(1, "a") → {1:a}
Put(2, "b") → {1:a, 2:b}
Put(3, "c") → {1:a, 2:b, 3:c}
Get(1)       → "a", {2:b, 3:c, 1:a}  (1 is now most recent)
Put(4, "d")  → {3:c, 1:a, 4:d}  (2 evicted as LRU)
\`\`\`

Implement \`createLRUCache(capacity)\` with \`get(key)\` and \`put(key, value)\`.
`,
          starter_code: `function createLRUCache(capacity) {
  const cache = new Map(); // Map preserves insertion order
  
  return {
    get(key) {
      if (!cache.has(key)) return -1;
      const value = cache.get(key);
      cache.delete(key);    // Remove
      cache.set(key, value); // Re-insert at end (most recent)
      return value;
    },
    put(key, value) {
      if (cache.has(key)) cache.delete(key);
      else if (cache.size >= capacity) {
        // Delete the first (oldest) entry
        cache.delete(cache.keys().next().value);
      }
      cache.set(key, value);
    },
  };
}

const lru = createLRUCache(3);
lru.put(1, "a"); lru.put(2, "b"); lru.put(3, "c");
console.log(lru.get(1));   // a (1 is now most recent)
lru.put(4, "d");           // 2 should be evicted
console.log(lru.get(2));   // -1 (evicted)
console.log(lru.get(3));   // c
console.log(lru.get(4));   // d`,
          reference_solution: `function createLRUCache(capacity) {
  const cache = new Map();
  return {
    get(key) {
      if (!cache.has(key)) return -1;
      const value = cache.get(key);
      cache.delete(key); cache.set(key, value);
      return value;
    },
    put(key, value) {
      if (cache.has(key)) cache.delete(key);
      else if (cache.size >= capacity) cache.delete(cache.keys().next().value);
      cache.set(key, value);
    },
  };
}
const lru = createLRUCache(3);
lru.put(1, "a"); lru.put(2, "b"); lru.put(3, "c");
console.log(lru.get(1));
lru.put(4, "d");
console.log(lru.get(2));
console.log(lru.get(3));
console.log(lru.get(4));`,
          hints: ['Map preserves insertion order — the first key() is always the LRU', 'On get, delete and re-insert to move to end'],
          xp_reward: 170,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Get existing key returns a`, expected_output: `a` },
            { description: `Evicted key returns -1`, expected_output: `-1` },
            { description: `Non-evicted key 3 returns c`, expected_output: `c` },
            { description: `New key 4 returns d`, expected_output: `d` },
          ],
        },
      ],
    },
  ],
};
