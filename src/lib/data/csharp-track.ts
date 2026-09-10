import type { StaticTrack } from "./lesson-content";

export const CSHARP_TRACK: StaticTrack = {
  id: "csharp",
  title: "C#",
  description: `Microsoft's elegant, modern language. LINQ, async/await, generics, and .NET ecosystem.`,
  color: "#178600",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "csharp-u1",
      track_id: "csharp",
      title: "C# Unit 1",
      description: `Core C# concepts`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "csharp-u1-l1",
          unit_id: "csharp-u1",
          track_id: "csharp",
          type: "concept",
          title: "C# Classes",
          explanation_md: `## C# OOP

\`\`\`csharp
public class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    public Person(string name, int age) { Name=name; Age=age; }
    public override string ToString() => $"{Name} ({Age})";
}
\`\`\`
### Challenge
Write \`formatPerson(name, age)\` returning \`"NAME (AGE)"\`.`,
          starter_code: `function formatPerson(name,age){return name+" ("+age+")";}
console.log(formatPerson("Alice",30));
console.log(formatPerson("Bob",25));`,
          reference_solution: `function formatPerson(name,age){return name+" ("+age+")";}
console.log(formatPerson("Alice",30));
console.log(formatPerson("Bob",25));`,
          hints: ['Concatenate name, space, parens, age'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice`, expected_output: `Alice (30)` },
            { description: `Bob`, expected_output: `Bob (25)` },
          ],
        },
        {
          id: "csharp-u1-l2",
          unit_id: "csharp-u1",
          track_id: "csharp",
          type: "concept",
          title: "LINQ Queries",
          explanation_md: `## LINQ: Language Integrated Query

\`\`\`csharp
var nums = new[] {1,2,3,4,5,6,7,8,9,10};
var evenSquares = nums
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .ToList();  // [4,16,36,64,100]

var grouped = people
    .GroupBy(p => p.Department)
    .Select(g => new { Dept=g.Key, Count=g.Count() });
\`\`\`
### Challenge
Write \`evenSquares(nums)\` — filter evens, square each, return sorted.`,
          starter_code: `function evenSquares(nums) {
  return nums.filter(n=>n%2===0).map(n=>n*n).sort((a,b)=>a-b);
}
console.log(evenSquares([1,2,3,4,5,6,7,8]).join(","));`,
          reference_solution: `function evenSquares(nums){return nums.filter(n=>n%2===0).map(n=>n*n).sort((a,b)=>a-b);}
console.log(evenSquares([1,2,3,4,5,6,7,8]).join(","));`,
          hints: ['filter, map, sort'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Even squares sorted`, expected_output: `4,16,36,64` },
          ],
        },
        {
          id: "csharp-u1-l3",
          unit_id: "csharp-u1",
          track_id: "csharp",
          type: "concept",
          title: "Async/Await in C#",
          explanation_md: `## C# Async Programming

\`\`\`csharp
public async Task<string> FetchDataAsync(string url) {
    using var client = new HttpClient();
    var response = await client.GetStringAsync(url);
    return response;
}

// Parallel tasks
var tasks = urls.Select(url => FetchDataAsync(url));
var results = await Task.WhenAll(tasks);
\`\`\`
### Challenge
Write \`processAsync(tasks)\` — runs all tasks (functions returning values), returns sorted results.`,
          starter_code: `function processAsync(tasks) {
  return tasks.map(t=>t()).sort();
}
console.log(processAsync([()=>"Task C",()=>"Task A",()=>"Task B"]).join(", "));`,
          reference_solution: `function processAsync(tasks){return tasks.map(t=>t()).sort();}
console.log(processAsync([()=>"Task C",()=>"Task A",()=>"Task B"]).join(", "));`,
          hints: ['map then sort'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Sorted results`, expected_output: `Task A, Task B, Task C` },
          ],
        },
        {
          id: "csharp-u1-l4",
          unit_id: "csharp-u1",
          track_id: "csharp",
          type: "challenge",
          title: "C# Boss: Generic Data Structures",
          explanation_md: `## Generics & Data Structures

\`\`\`csharp
public class Stack<T> {
    private List<T> _items = new();
    public void Push(T item) => _items.Add(item);
    public T Pop() { var v=_items[^1]; _items.RemoveAt(_items.Count-1); return v; }
    public T Peek() => _items[^1];
    public int Count => _items.Count;
}
\`\`\`
### Boss
Implement a Queue with \`enqueue\`, \`dequeue\`, \`peek\`, \`size\`.`,
          starter_code: `function createQueue() {
  const items=[];
  return {
    enqueue(v){items.push(v);},
    dequeue(){return items.shift();},
    peek(){return items[0];},
    size(){return items.length;},
  };
}
const q=createQueue();
q.enqueue("A");q.enqueue("B");q.enqueue("C");
console.log(q.dequeue());
console.log(q.peek());
console.log(q.size());`,
          reference_solution: `function createQueue(){const i=[];return{enqueue(v){i.push(v);},dequeue(){return i.shift();},peek(){return i[0];},size(){return i.length;}};}
const q=createQueue();q.enqueue("A");q.enqueue("B");q.enqueue("C");
console.log(q.dequeue());
console.log(q.peek());
console.log(q.size());`,
          hints: ['Array.shift() for FIFO dequeue'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `dequeue returns A`, expected_output: `A` },
            { description: `peek returns B`, expected_output: `B` },
            { description: `size is 2`, expected_output: `2` },
          ],
        },
      ],
    },
    {
      id: "csharp-u2",
      track_id: "csharp",
      title: "C# Unit 2",
      description: `Core C# concepts`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "csharp-u2-l1",
          unit_id: "csharp-u2",
          track_id: "csharp",
          type: "concept",
          title: "C# Properties & Interfaces",
          explanation_md: `## Properties and Interfaces

\`\`\`csharp
interface IShape {
    double Area { get; }
    double Perimeter { get; }
    string Describe() => $"Area={Area:F2}, Perimeter={Perimeter:F2}";
}

class Circle : IShape {
    public double Radius { get; init; }
    public double Area => Math.PI * Radius * Radius;
    public double Perimeter => 2 * Math.PI * Radius;
}
\`\`\`
### Challenge
Write \`createCircle(r)\` with \`area()\` and \`perimeter()\` (rounded to 2 dp).`,
          starter_code: `function createCircle(r) {
  return {
    area: () => Math.round(Math.PI*r*r*100)/100,
    perimeter: () => Math.round(2*Math.PI*r*100)/100,
  };
}
const c=createCircle(5);
console.log(c.area());
console.log(c.perimeter());`,
          reference_solution: `function createCircle(r){return{area:()=>Math.round(Math.PI*r*r*100)/100,perimeter:()=>Math.round(2*Math.PI*r*100)/100};}
const c=createCircle(5);
console.log(c.area());
console.log(c.perimeter());`,
          hints: ['Math.PI for pi, round to 2 dp'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `area of r=5`, expected_output: `78.54` },
            { description: `perimeter of r=5`, expected_output: `31.42` },
          ],
        },
        {
          id: "csharp-u2-l2",
          unit_id: "csharp-u2",
          track_id: "csharp",
          type: "concept",
          title: "Exception Handling",
          explanation_md: `## C# Exceptions

\`\`\`csharp
try {
    int result = Divide(a, b);
} catch (DivideByZeroException ex) {
    Console.WriteLine("Error: " + ex.Message);
} catch (Exception ex) when (ex.Message.Contains("overflow")) {
    Console.WriteLine("Overflow!");
} finally {
    Console.WriteLine("Always runs");
}
\`\`\`
### Challenge
Write \`safeParseInt(s)\` returning the parsed int or \`"NaN"\` if invalid.`,
          starter_code: `function safeParseInt(s) {
  const n = parseInt(s);
  return isNaN(n) ? "NaN" : n;
}
console.log(safeParseInt("42"));
console.log(safeParseInt("abc"));
console.log(safeParseInt("-7"));`,
          reference_solution: `function safeParseInt(s){const n=parseInt(s);return isNaN(n)?"NaN":n;}
console.log(safeParseInt("42"));
console.log(safeParseInt("abc"));
console.log(safeParseInt("-7"));`,
          hints: ['Use parseInt and isNaN'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `42`, expected_output: `42` },
            { description: `abc`, expected_output: `NaN` },
            { description: `-7`, expected_output: `-7` },
          ],
        },
        {
          id: "csharp-u2-l3",
          unit_id: "csharp-u2",
          track_id: "csharp",
          type: "concept",
          title: "Delegates & Events",
          explanation_md: `## C# Delegates

\`\`\`csharp
// Delegate type
delegate int MathOp(int a, int b);

MathOp add = (a,b) => a+b;
MathOp mul = (a,b) => a*b;

// Multicast delegates
Action<string> logger = Console.WriteLine;
logger += s => File.AppendAllText("log.txt", s);
logger("Hello!");  // Fires both!

// Func and Action
Func<int,int,int> sum = (a,b) => a+b;
Action<string> print = Console.WriteLine;
\`\`\`
### Challenge
Write \`compose(f, g)\` — returns \`x => f(g(x))\`.`,
          starter_code: `function compose(f, g) {
  return x => f(g(x));
}
const double = x => x * 2;
const addOne = x => x + 1;
const doubleThenAdd = compose(addOne, double);
console.log(doubleThenAdd(5));
console.log(doubleThenAdd(10));`,
          reference_solution: `const compose=(f,g)=>x=>f(g(x));
const double=x=>x*2,addOne=x=>x+1;
const doubleThenAdd=compose(addOne,double);
console.log(doubleThenAdd(5));
console.log(doubleThenAdd(10));`,
          hints: ['compose(f, g) = x => f(g(x))'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `5*2+1=11`, expected_output: `11` },
            { description: `10*2+1=21`, expected_output: `21` },
          ],
        },
        {
          id: "csharp-u2-l4",
          unit_id: "csharp-u2",
          track_id: "csharp",
          type: "challenge",
          title: "C# Boss: Observer Pattern",
          explanation_md: `## Boss: Observer Pattern

\`\`\`csharp
interface IObserver<T> { void Update(T data); }
interface IObservable<T> {
    void Subscribe(IObserver<T> obs);
    void Unsubscribe(IObserver<T> obs);
    void Notify(T data);
}
\`\`\`
### Boss
Implement \`createSubject()\` with \`subscribe(fn)\`, \`unsubscribe(fn)\`, \`notify(data)\`. Returns unsubscribe function from \`subscribe\`.`,
          starter_code: `function createSubject() {
  const observers = new Set();
  return {
    subscribe(fn) { observers.add(fn); return () => observers.delete(fn); },
    notify(data) { observers.forEach(fn => fn(data)); },
  };
}
const subject = createSubject();
const log = data => console.log("Got:", data);
const unsub = subject.subscribe(log);
subject.notify("hello");
unsub();
subject.notify("world"); // should NOT print`,
          reference_solution: `function createSubject(){const o=new Set();return{subscribe(fn){o.add(fn);return()=>o.delete(fn);},notify(data){o.forEach(fn=>fn(data));};}
const subject=createSubject();
const log=data=>console.log("Got:",data);
const unsub=subject.subscribe(log);
subject.notify("hello");
unsub();
subject.notify("world");`,
          hints: ['Use a Set for observers', 'subscribe returns an unsubscribe function'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Notified before unsub`, expected_output: `Got: hello` },
          ],
        },
      ],
    },
  ],
};
