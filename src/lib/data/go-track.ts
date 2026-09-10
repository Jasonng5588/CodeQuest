import type { StaticTrack } from "./lesson-content";

export const GO_TRACK: StaticTrack = {
  id: "go",
  title: "Go",
  description: `Build fast, concurrent software with Go's clean syntax and built-in concurrency.`,
  color: "#00acd7",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "go-u1",
      track_id: "go",
      title: "Go Basics",
      description: `Types, variables, functions`,
      icon: "🔵",
      order_index: 1,
      lessons: [
        {
          id: "go-u1-l1",
          unit_id: "go-u1",
          track_id: "go",
          type: "concept",
          title: "Variables & Types",
          explanation_md: `## Go: Simple, Fast, Reliable

Go is a statically typed, compiled language designed at Google.

\`\`\`go
package main
import "fmt"

func main() {
    name := "Alice"  // type inferred as string
    age  := 30        // type inferred as int
    fmt.Printf("%s is %d years old\\n", name, age)
}
\`\`\`

### Key Features
- **Type inference** with \`:=\`
- **Multiple return values**
- **Built-in concurrency** via goroutines

### Challenge
Write \`formatPerson(name, age)\` returning \`"NAME is AGE years old"\`.`,
          starter_code: `function formatPerson(name, age) {
  // Return "NAME is AGE years old"
}
console.log(formatPerson("Alice", 30));
console.log(formatPerson("Bob", 25));`,
          reference_solution: `function formatPerson(name, age) {
  return name + " is " + age + " years old";
}
console.log(formatPerson("Alice", 30));
console.log(formatPerson("Bob", 25));`,
          hints: ['Concatenate with +'],
          xp_reward: 60,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice 30`, expected_output: `Alice is 30 years old` },
            { description: `Bob 25`, expected_output: `Bob is 25 years old` },
          ],
        },
        {
          id: "go-u1-l2",
          unit_id: "go-u1",
          track_id: "go",
          type: "concept",
          title: "Functions & Multiple Returns",
          explanation_md: `## Go Functions Return Multiple Values

\`\`\`go
func minMax(arr []int) (min, max int) {
    min, max = arr[0], arr[0]
    for _, v := range arr {
        if v < min { min = v }
        if v > max { max = v }
    }
    return
}
min, max := minMax([]int{3,1,4,1,5,9})
\`\`\`

### Challenge
Write \`findMinMax(numbers)\` returning \`[min, max]\`.`,
          starter_code: `function findMinMax(numbers) {
  let min = numbers[0], max = numbers[0];
  for (const n of numbers) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  return [min, max];
}
const [min, max] = findMinMax([3,1,4,1,5,9,2,6]);
console.log(min);
console.log(max);`,
          reference_solution: `function findMinMax(numbers) {
  let min = numbers[0], max = numbers[0];
  for (const n of numbers) { if (n < min) min = n; if (n > max) max = n; }
  return [min, max];
}
const [min, max] = findMinMax([3,1,4,1,5,9,2,6]);
console.log(min);
console.log(max);`,
          hints: ['Initialize min/max to first element', 'Loop and update if smaller/larger'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `min is 1`, expected_output: `1` },
            { description: `max is 9`, expected_output: `9` },
          ],
        },
        {
          id: "go-u1-l3",
          unit_id: "go-u1",
          track_id: "go",
          type: "concept",
          title: "Slices & Maps",
          explanation_md: `## Slices (Dynamic Arrays) and Maps

\`\`\`go
// Slice
nums := []int{1,2,3,4,5}
nums = append(nums, 6)

// Map
scores := map[string]int{"Alice":95,"Bob":87}
scores["Carol"] = 92
for name, score := range scores {
    fmt.Printf("%s: %d\\n", name, score)
}
\`\`\`

### Challenge
Write \`wordCount(text)\` returning word frequency map.`,
          starter_code: `function wordCount(text) {
  const words = text.toLowerCase().split(/\\s+/);
  const counts = {};
  for (const word of words) counts[word] = (counts[word] || 0) + 1;
  return counts;
}
const c = wordCount("the cat sat on the mat the cat");
console.log(c["the"]);
console.log(c["cat"]);`,
          reference_solution: `function wordCount(text) {
  const counts = {};
  for (const w of text.toLowerCase().split(/\\s+/)) counts[w] = (counts[w]||0)+1;
  return counts;
}
const c = wordCount("the cat sat on the mat the cat");
console.log(c["the"]);
console.log(c["cat"]);`,
          hints: ['Split text into words', 'Use object to count frequencies'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `'the' count = 3`, expected_output: `3` },
            { description: `'cat' count = 2`, expected_output: `2` },
          ],
        },
        {
          id: "go-u1-l4",
          unit_id: "go-u1",
          track_id: "go",
          type: "challenge",
          title: "Structs Boss",
          explanation_md: `## Go Structs: Custom Types

\`\`\`go
type Rectangle struct {
    Width, Height float64
}
func (r Rectangle) Area() float64 { return r.Width * r.Height }
func (r *Rectangle) Scale(f float64) { r.Width *= f; r.Height *= f }
\`\`\`

### Boss
Implement \`createRect(w, h)\` with \`area()\`, \`perimeter()\`, \`scale(f)\` methods.`,
          starter_code: `function createRect(w, h) {
  return {
    width: w, height: h,
    area() { return this.width * this.height; },
    perimeter() { return 2 * (this.width + this.height); },
    scale(f) { this.width *= f; this.height *= f; },
  };
}
const r = createRect(10, 5);
console.log(r.area());
console.log(r.perimeter());
r.scale(2);
console.log(r.width);`,
          reference_solution: `function createRect(w, h) {
  return { width:w,height:h, area(){return this.width*this.height;}, perimeter(){return 2*(this.width+this.height);}, scale(f){this.width*=f;this.height*=f;} };
}
const r = createRect(10,5);
console.log(r.area());
console.log(r.perimeter());
r.scale(2);
console.log(r.width);`,
          hints: ["Use 'this' inside methods", 'scale mutates the object'],
          xp_reward: 110,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `area=50`, expected_output: `50` },
            { description: `perimeter=30`, expected_output: `30` },
            { description: `width after scale=20`, expected_output: `20` },
          ],
        },
      ],
    },
    {
      id: "go-u2",
      track_id: "go",
      title: "Go Concurrency",
      description: `Goroutines, channels, select`,
      icon: "⚡",
      order_index: 2,
      lessons: [
        {
          id: "go-u2-l1",
          unit_id: "go-u2",
          track_id: "go",
          type: "concept",
          title: "Goroutine Patterns",
          explanation_md: `## Goroutines: Lightweight Threads

\`\`\`go
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        fmt.Println("Worker", id)
    }(i)
}
wg.Wait()
\`\`\`

### Challenge
Write \`processAll(tasks)\` — runs all task functions, returns sorted results.`,
          starter_code: `function processAll(tasks) {
  return tasks.map(t => t()).sort();
}
const tasks = [() => "C", () => "A", () => "B"];
processAll(tasks).forEach(r => console.log(r));`,
          reference_solution: `function processAll(tasks) { return tasks.map(t => t()).sort(); }
[() => "C", () => "A", () => "B"].map(t => t()).sort().forEach(r => console.log(r));`,
          hints: ['Map over tasks, call each, then sort'],
          xp_reward: 80,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `A first`, expected_output: `A` },
            { description: `B second`, expected_output: `B` },
            { description: `C third`, expected_output: `C` },
          ],
        },
        {
          id: "go-u2-l2",
          unit_id: "go-u2",
          track_id: "go",
          type: "concept",
          title: "Channel Pipeline",
          explanation_md: `## Channels: Data Pipelines

\`\`\`go
func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}
func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in { out <- n*n }
        close(out)
    }()
    return out
}
\`\`\`

### Challenge
Write \`pipeline(value, ...fns)\` — applies each function sequentially.`,
          starter_code: `function pipeline(value, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), value);
}
console.log(pipeline(5, x=>x*2, x=>x+3, x=>"Result:"+x));`,
          reference_solution: `function pipeline(value, ...fns) { return fns.reduce((acc,fn)=>fn(acc),value); }
console.log(pipeline(5, x=>x*2, x=>x+3, x=>"Result:"+x));`,
          hints: ['Use reduce with the initial value'],
          xp_reward: 85,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `5 -> *2 -> +3 -> string`, expected_output: `Result:13` },
          ],
        },
        {
          id: "go-u2-l3",
          unit_id: "go-u2",
          track_id: "go",
          type: "concept",
          title: "Error Handling",
          explanation_md: `## Go: Errors Are Values

\`\`\`go
func safeDivide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}
result, err := safeDivide(10, 2)
if err != nil { log.Fatal(err) }
\`\`\`

### Challenge
Write \`safeDivide(a, b)\` returning \`a/b\` or \`"Error: division by zero"\`.`,
          starter_code: `function safeDivide(a, b) {
  if (b === 0) return "Error: division by zero";
  return a / b;
}
console.log(safeDivide(10, 2));
console.log(safeDivide(9, 0));`,
          reference_solution: `function safeDivide(a, b) {
  if (b === 0) return "Error: division by zero";
  return a / b;
}
console.log(safeDivide(10,2));
console.log(safeDivide(9,0));`,
          hints: ['Check b===0 first'],
          xp_reward: 75,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `10/2=5`, expected_output: `5` },
            { description: `div by zero`, expected_output: `Error: division by zero` },
          ],
        },
        {
          id: "go-u2-l4",
          unit_id: "go-u2",
          track_id: "go",
          type: "challenge",
          title: "Worker Pool Boss",
          explanation_md: `## Worker Pool Pattern

\`\`\`go
func workerPool(numWorkers int, jobs []int, fn func(int) int) []int {
    jobCh := make(chan int, len(jobs))
    resCh := make(chan int, len(jobs))
    for w := 0; w < numWorkers; w++ {
        go func() {
            for j := range jobCh { resCh <- fn(j) }
        }()
    }
    for _, j := range jobs { jobCh <- j }
    close(jobCh)
    results := make([]int, len(jobs))
    for i := range results { results[i] = <-resCh }
    return results
}
\`\`\`

### Boss
Write \`workerPool(jobs, fn)\` — processes all jobs with fn, returns results sorted ascending.`,
          starter_code: `function workerPool(jobs, fn) {
  return jobs.map(fn).sort((a,b) => a-b);
}
console.log(workerPool([5,3,8,1,9], x => x*x).join(", "));`,
          reference_solution: `function workerPool(jobs, fn) { return jobs.map(fn).sort((a,b)=>a-b); }
console.log(workerPool([5,3,8,1,9], x=>x*x).join(", "));`,
          hints: ['map then sort numerically'],
          xp_reward: 120,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `sorted squared`, expected_output: `1, 9, 25, 64, 81` },
          ],
        },
      ],
    },
    {
      id: "go-u3",
      track_id: "go",
      title: "Go Interfaces",
      description: `Interfaces, embedding, stdlib`,
      icon: "📦",
      order_index: 3,
      lessons: [
        {
          id: "go-u3-l1",
          unit_id: "go-u3",
          track_id: "go",
          type: "concept",
          title: "Interface Satisfaction",
          explanation_md: `## Interfaces Are Implicit

Any type with the required methods satisfies an interface — no \`implements\` keyword:

\`\`\`go
type Stringer interface { String() string }

type Point struct{ X, Y int }
func (p Point) String() string { return fmt.Sprintf("(%d,%d)", p.X, p.Y) }

// Point now satisfies Stringer automatically!
fmt.Println(Point{3,4}) // (3,4)
\`\`\`

### Challenge
Write \`formatAll(items)\` — each item has a \`toString()\` method. Return all formatted joined by ", ".`,
          starter_code: `function formatAll(items) {
  return items.map(i => i.toString()).join(", ");
}
const items = [
  { toString: () => "Point(3,4)" },
  { toString: () => "Circle(r=5)" },
  { toString: () => "Rect(2x3)" },
];
console.log(formatAll(items));`,
          reference_solution: `function formatAll(items) { return items.map(i=>i.toString()).join(", "); }
const items = [{ toString:()=>"Point(3,4)"},{toString:()=>"Circle(r=5)"},{toString:()=>"Rect(2x3)"}];
console.log(formatAll(items));`,
          hints: ['Call .toString() on each item'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `All formatted`, expected_output: `Point(3,4), Circle(r=5), Rect(2x3)` },
          ],
        },
        {
          id: "go-u3-l2",
          unit_id: "go-u3",
          track_id: "go",
          type: "concept",
          title: "Type Assertions & Switches",
          explanation_md: `## Type Assertions

\`\`\`go
var i interface{} = "hello"

s, ok := i.(string)  // Type assertion
if ok { fmt.Println(s) }

// Type switch
switch v := i.(type) {
case string:  fmt.Println("string:", v)
case int:     fmt.Println("int:", v)
default:      fmt.Printf("other: %T\\n", v)
}
\`\`\`

### Challenge
Write \`typeSwitch(v)\` returning \`"string:V"\`, \`"number:V"\`, \`"bool:V"\`, or \`"other"\`.`,
          starter_code: `function typeSwitch(v) {
  if (typeof v === "string") return "string:" + v;
  if (typeof v === "number") return "number:" + v;
  if (typeof v === "boolean") return "bool:" + v;
  return "other";
}
console.log(typeSwitch("hi"));
console.log(typeSwitch(42));
console.log(typeSwitch(true));`,
          reference_solution: `function typeSwitch(v) {
  if (typeof v==="string") return "string:"+v;
  if (typeof v==="number") return "number:"+v;
  if (typeof v==="boolean") return "bool:"+v;
  return "other";
}
console.log(typeSwitch("hi"));
console.log(typeSwitch(42));
console.log(typeSwitch(true));`,
          hints: ['Use typeof for each type'],
          xp_reward: 75,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `string`, expected_output: `string:hi` },
            { description: `number`, expected_output: `number:42` },
            { description: `bool`, expected_output: `bool:true` },
          ],
        },
        {
          id: "go-u3-l3",
          unit_id: "go-u3",
          track_id: "go",
          type: "concept",
          title: "Standard Library",
          explanation_md: `## Go Standard Library Highlights

\`\`\`go
import (
    "strings"
    "sort"
    "math"
    "strconv"
)

strings.ToUpper("hello")          // HELLO
strings.Join([]string{"a","b"}, "-") // a-b
strings.Split("a,b,c", ",")       // [a b c]

sort.Ints([]int{3,1,2})           // [1 2 3]

math.Sqrt(16)  // 4
math.Abs(-3)   // 3

strconv.Itoa(42)   // "42"
strconv.Atoi("7")  // 7, nil
\`\`\`

### Challenge
Write \`processStrings(strs)\`: uppercase, filter len>4, sort, join with ", ".`,
          starter_code: `function processStrings(strs) {
  return strs
    .map(s => s.toUpperCase())
    .filter(s => s.length > 4)
    .sort()
    .join(", ");
}
console.log(processStrings(["go","python","java","c","rust","ruby"]));`,
          reference_solution: `function processStrings(strs) { return strs.map(s=>s.toUpperCase()).filter(s=>s.length>4).sort().join(", "); }
console.log(processStrings(["go","python","java","c","rust","ruby"]));`,
          hints: ['Chain map, filter, sort, join'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Processed`, expected_output: `JAVA, PYTHON, RUBY, RUST` },
          ],
        },
        {
          id: "go-u3-l4",
          unit_id: "go-u3",
          track_id: "go",
          type: "challenge",
          title: "Mini Interpreter Boss",
          explanation_md: `## Boss: Expression Evaluator

Evaluate simple math expressions respecting operator precedence.

\`"3 + 4 * 2"\` = \`11\` (not 14)
\`"10 - 2 * 3"\` = \`4\`

### Challenge
Write \`evaluate(expr)\` supporting \`+\`, \`-\`, \`*\`, \`/\` with correct precedence.`,
          starter_code: `function evaluate(expr) {
  // Tokenize into numbers and operators
  const tokens = expr.match(/\\d+|[+\\-*/]/g);
  const nums = [], ops = [];
  for (const t of tokens) {
    if (/\\d/.test(t)) nums.push(parseInt(t)); else ops.push(t);
  }
  // First pass: * and /
  let hi = [nums[0]], lo = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i]==="*") hi[hi.length-1] *= nums[i+1];
    else if (ops[i]==="/") hi[hi.length-1] = Math.floor(hi[hi.length-1]/nums[i+1]);
    else { lo.push(ops[i]); hi.push(nums[i+1]); }
  }
  let r = hi[0];
  for (let i = 0; i < lo.length; i++) r += lo[i]==="+" ? hi[i+1] : -hi[i+1];
  return r;
}
console.log(evaluate("3 + 4 * 2"));
console.log(evaluate("10 - 2 * 3"));
console.log(evaluate("2 + 3 * 4 - 1"));`,
          reference_solution: `function evaluate(expr) {
  const tokens = expr.match(/\\d+|[+\\-*/]/g);
  const nums=[],ops=[];
  for(const t of tokens){if(/\\d/.test(t))nums.push(parseInt(t));else ops.push(t);}
  let hi=[nums[0]],lo=[];
  for(let i=0;i<ops.length;i++){if(ops[i]==="*")hi[hi.length-1]*=nums[i+1];else if(ops[i]==="/")hi[hi.length-1]=Math.floor(hi[hi.length-1]/nums[i+1]);else{lo.push(ops[i]);hi.push(nums[i+1]);}}
  let r=hi[0]; for(let i=0;i<lo.length;i++)r+=lo[i]==="+"?hi[i+1]:-hi[i+1]; return r;
}
console.log(evaluate("3 + 4 * 2"));
console.log(evaluate("10 - 2 * 3"));
console.log(evaluate("2 + 3 * 4 - 1"));`,
          hints: ['First handle * and / in a pass', 'Then handle + and - with remaining'],
          xp_reward: 160,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `3+4*2=11`, expected_output: `11` },
            { description: `10-2*3=4`, expected_output: `4` },
            { description: `2+3*4-1=13`, expected_output: `13` },
          ],
        },
      ],
    },
    {
      id: "go-u4",
      track_id: "go",
      title: "Go in Production",
      description: `HTTP, testing, modules`,
      icon: "🌐",
      order_index: 4,
      lessons: [
        {
          id: "go-u4-l1",
          unit_id: "go-u4",
          track_id: "go",
          type: "concept",
          title: "HTTP Servers",
          explanation_md: `## net/http: Building REST APIs

\`\`\`go
func handleUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    switch r.Method {
    case "GET":
        json.NewEncoder(w).Encode([]User{{1,"Alice"},{2,"Bob"}})
    case "POST":
        var u User
        json.NewDecoder(r.Body).Decode(&u)
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(u)
    }
}
http.HandleFunc("/users", handleUsers)
http.ListenAndServe(":8080", nil)
\`\`\`

### Challenge
Write \`createRouter(routes)\` — dispatches \`handle(method, path, body)\` to registered handlers.`,
          starter_code: `function createRouter(routes) {
  return function(method, path, body) {
    const route = routes[path];
    if (!route) return { status: 404, body: "Not Found" };
    if (route.method !== method) return { status: 405, body: "Method Not Allowed" };
    return { status: 200, body: route.handler(body) };
  };
}
const router = createRouter({
  "/users": { method: "GET", handler: () => ["Alice","Bob"] },
});
console.log(JSON.stringify(router("GET", "/users", null)));
console.log(JSON.stringify(router("GET", "/missing", null)));`,
          reference_solution: `function createRouter(routes) {
  return (method,path,body) => {
    const r=routes[path];
    if(!r) return {status:404,body:"Not Found"};
    if(r.method!==method) return {status:405,body:"Method Not Allowed"};
    return {status:200,body:r.handler(body)};
  };
}
const router=createRouter({"/users":{method:"GET",handler:()=>["Alice","Bob"]}});
console.log(JSON.stringify(router("GET","/users",null)));
console.log(JSON.stringify(router("GET","/missing",null)));`,
          hints: ['Look up path, check method, call handler'],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `200 with users`, expected_output: `{"status":200,"body":["Alice","Bob"]}` },
            { description: `404 not found`, expected_output: `{"status":404,"body":"Not Found"}` },
          ],
        },
        {
          id: "go-u4-l2",
          unit_id: "go-u4",
          track_id: "go",
          type: "concept",
          title: "Testing in Go",
          explanation_md: `## Go Testing Package

\`\`\`go
func TestAdd(t *testing.T) {
    tests := []struct{ a,b,want int }{
        {1,2,3},{5,5,10},{0,0,0},
    }
    for _, tc := range tests {
        got := add(tc.a, tc.b)
        if got != tc.want {
            t.Errorf("add(%d,%d)=%d want %d", tc.a, tc.b, got, tc.want)
        }
    }
}
\`\`\`

### Challenge
Write \`runTests(cases, fn)\` — returns \`"PASS: N/N"\` or failure messages.`,
          starter_code: `function runTests(cases, fn) {
  let passed = 0;
  const failures = [];
  for (const c of cases) {
    const got = fn(c.input);
    if (got === c.expected) passed++;
    else failures.push("FAIL: got " + got + " want " + c.expected);
  }
  return failures.length === 0 ? "PASS: " + passed + "/" + cases.length : failures.join("\\n");
}
console.log(runTests([{input:2,expected:4},{input:3,expected:6}], x => x*2));`,
          reference_solution: `function runTests(cases,fn){let p=0,f=[];for(const c of cases){const g=fn(c.input);if(g===c.expected)p++;else f.push("FAIL: got "+g+" want "+c.expected);}return f.length===0?"PASS:"+p+"/"+cases.length:f.join("\\n");}
console.log(runTests([{input:2,expected:4},{input:3,expected:6}],x=>x*2));`,
          hints: ['Compare fn(input) with expected', 'Return \'PASS: N/N\' if all pass'],
          xp_reward: 85,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `All pass`, expected_output: `PASS:2/2` },
          ],
        },
        {
          id: "go-u4-l3",
          unit_id: "go-u4",
          track_id: "go",
          type: "concept",
          title: "Go Modules",
          explanation_md: `## Go Modules: Dependency Management

\`\`\`
module github.com/user/myapp
go 1.21
require (
    github.com/gin-gonic/gin v1.9.1
)
\`\`\`

Project structure:
\`\`\`
myapp/
├── main.go
├── go.mod
├── handlers/
│   └── user.go    // package handlers
└── models/
    └── user.go    // package models
\`\`\`

### Challenge
Simulate module system: write \`createModule(name, exports)\` and \`importFrom(name, key)\`.`,
          starter_code: `const modules = {};
function createModule(name, exports) { modules[name] = exports; }
function importFrom(name, key) {
  if (!modules[name]) throw new Error("Module not found: " + name);
  if (!(key in modules[name])) throw new Error("Export not found: " + key);
  return modules[name][key];
}
createModule("math", { add: (a,b)=>a+b, mul: (a,b)=>a*b });
console.log(importFrom("math","add")(3,4));
console.log(importFrom("math","mul")(3,4));`,
          reference_solution: `const modules={};
function createModule(n,e){modules[n]=e;}
function importFrom(n,k){if(!modules[n])throw new Error("Module not found: "+n);if(!(k in modules[n]))throw new Error("Export not found: "+k);return modules[n][k];}
createModule("math",{add:(a,b)=>a+b,mul:(a,b)=>a*b});
console.log(importFrom("math","add")(3,4));
console.log(importFrom("math","mul")(3,4));`,
          hints: ['Store modules in an object by name'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `add(3,4)=7`, expected_output: `7` },
            { description: `mul(3,4)=12`, expected_output: `12` },
          ],
        },
        {
          id: "go-u4-l4",
          unit_id: "go-u4",
          track_id: "go",
          type: "challenge",
          title: "Grand Boss: LRU Cache",
          explanation_md: `## Grand Boss: LRU Cache

LRU (Least Recently Used) — evicts the oldest accessed item when full.

\`\`\`
Capacity=3: put(1,a) put(2,b) put(3,c)
get(1) → a   (1 is now most recent)
put(4,d) → evicts 2 (oldest unused)
get(2) → -1  (was evicted)
\`\`\`

Implement \`createLRUCache(capacity)\` with \`get(key)\` and \`put(key, value)\`.`,
          starter_code: `function createLRUCache(capacity) {
  const cache = new Map();
  return {
    get(key) {
      if (!cache.has(key)) return -1;
      const v = cache.get(key);
      cache.delete(key);
      cache.set(key, v);
      return v;
    },
    put(key, value) {
      if (cache.has(key)) cache.delete(key);
      else if (cache.size >= capacity) cache.delete(cache.keys().next().value);
      cache.set(key, value);
    },
  };
}
const lru = createLRUCache(3);
lru.put(1,"a"); lru.put(2,"b"); lru.put(3,"c");
console.log(lru.get(1));
lru.put(4,"d");
console.log(lru.get(2));
console.log(lru.get(4));`,
          reference_solution: `function createLRUCache(capacity) {
  const cache=new Map();
  return {
    get(k){if(!cache.has(k))return -1;const v=cache.get(k);cache.delete(k);cache.set(k,v);return v;},
    put(k,v){if(cache.has(k))cache.delete(k);else if(cache.size>=capacity)cache.delete(cache.keys().next().value);cache.set(k,v);},
  };
}
const lru=createLRUCache(3);
lru.put(1,"a");lru.put(2,"b");lru.put(3,"c");
console.log(lru.get(1));
lru.put(4,"d");
console.log(lru.get(2));
console.log(lru.get(4));`,
          hints: ['Map preserves insertion order — first key = LRU', 'On get, delete then re-insert to move to end'],
          xp_reward: 180,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `get(1)=a`, expected_output: `a` },
            { description: `get(2)=-1 (evicted)`, expected_output: `-1` },
            { description: `get(4)=d`, expected_output: `d` },
          ],
        },
      ],
    },
  ],
};
