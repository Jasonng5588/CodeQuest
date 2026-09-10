import type { StaticTrack } from "./lesson-content";

export const REACT_TRACK: StaticTrack = {
  id: "react",
  title: "React",
  description: `Build dynamic UIs with components, hooks, and the React ecosystem.`,
  color: "#61dafb",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "react-u1",
      track_id: "react",
      title: "React Fundamentals",
      description: `JSX, components, and props`,
      icon: "⚛️",
      order_index: 1,
      lessons: [
        {
          id: "react-u1-l1",
          unit_id: "react-u1",
          track_id: "react",
          type: "concept",
          title: "What is React?",
          explanation_md: `## React: A JavaScript Library for UIs

React is a **declarative** library that lets you build UIs from **components** — reusable pieces of code that return JSX (HTML-like syntax).

### Key Concepts
- **Component**: A function that returns JSX
- **JSX**: Looks like HTML, but it's JavaScript
- **Props**: Data passed into a component
- **State**: Data that changes over time

### Your First Component
\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

The \`{}\` in JSX lets you embed any JavaScript expression.

### Challenge
Write a function \`greet(name)\` that returns the string \`"Hello, " + name + "!"\`.
Since we're running in a browser sandbox, write this as a plain JS function.
`,
          starter_code: `// Write a greet function that returns "Hello, " + name + "!"
function greet(name) {
  // your code here
}

// Test it
console.log(greet("React"));`,
          reference_solution: `function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("React"));`,
          hints: ['Concatenate strings with +', 'Use return to send back the value'],
          xp_reward: 60,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `greet('React') returns 'Hello, React!'`, expected_output: `Hello, React!` },
          ],
        },
        {
          id: "react-u1-l2",
          unit_id: "react-u1",
          track_id: "react",
          type: "concept",
          title: "JSX Expressions",
          explanation_md: `## JSX Expressions

In JSX, \`{}\` embeds JavaScript expressions. You can use:
- Variables: \`{name}\`
- Math: \`{2 + 2}\`
- Function calls: \`{greet(user)}\`
- Ternary: \`{isLoggedIn ? "Welcome" : "Please login"}\`

### Example
\`\`\`jsx
const user = "Alice";
const element = <p>Hello, {user.toUpperCase()}!</p>;
\`\`\`

Renders: Hello, ALICE!

### Challenge
Write a function \`formatUser(name, age)\` that returns:
\`"User: NAME is AGE years old"\` (in uppercase for name)
`,
          starter_code: `function formatUser(name, age) {
  // Return: "User: " + name.toUpperCase() + " is " + age + " years old"
}

console.log(formatUser("alice", 25));`,
          reference_solution: `function formatUser(name, age) {
  return "User: " + name.toUpperCase() + " is " + age + " years old";
}
console.log(formatUser("alice", 25));`,
          hints: ['Use .toUpperCase() on the name', 'Concatenate all parts with +'],
          xp_reward: 65,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `formatUser('alice', 25) returns 'User: ALICE is 25 years old'`, expected_output: `User: ALICE is 25 years old` },
          ],
        },
        {
          id: "react-u1-l3",
          unit_id: "react-u1",
          track_id: "react",
          type: "concept",
          title: "Props & Data Flow",
          explanation_md: `## Props: Passing Data to Components

Props are **read-only** data passed from parent to child. Think of them as function arguments.

\`\`\`jsx
function Card({ title, description, likes }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{likes} likes</span>
    </div>
  );
}

// Usage:
<Card title="React Rocks" description="Fast UI" likes={42} />
\`\`\`

### Default Props
\`\`\`jsx
function Button({ label = "Click Me", color = "blue" }) {
  return <button style={{ background: color }}>{label}</button>;
}
\`\`\`

### Challenge
Write a \`describeProduct(name, price, inStock)\` function that returns:
\`"NAME: $PRICE - IN STOCK"\` or \`"NAME: $PRICE - OUT OF STOCK"\`
`,
          starter_code: `function describeProduct(name, price, inStock) {
  // return "NAME: $PRICE - IN STOCK" or "NAME: $PRICE - OUT OF STOCK"
}

console.log(describeProduct("Widget", 9.99, true));
console.log(describeProduct("Gadget", 24.99, false));`,
          reference_solution: `function describeProduct(name, price, inStock) {
  const status = inStock ? "IN STOCK" : "OUT OF STOCK";
  return name + ": $" + price + " - " + status;
}
console.log(describeProduct("Widget", 9.99, true));
console.log(describeProduct("Gadget", 24.99, false));`,
          hints: ['Use a ternary for the stock status', 'Concatenate name, price, and status'],
          xp_reward: 75,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Widget in stock`, expected_output: `Widget: $9.99 - IN STOCK` },
            { description: `Gadget out of stock`, expected_output: `Gadget: $24.99 - OUT OF STOCK` },
          ],
        },
        {
          id: "react-u1-l4",
          unit_id: "react-u1",
          track_id: "react",
          type: "challenge",
          title: "Component Builder Challenge",
          explanation_md: `## Boss Challenge: Build a List Renderer

In React, you often render lists using \`.map()\`. Each item needs a \`key\` prop.

\`\`\`jsx
function List({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Your Challenge
Write \`renderList(items)\` that takes an array and returns a comma-separated string like:
\`"1. Apple, 2. Banana, 3. Cherry"\`
`,
          starter_code: `function renderList(items) {
  // Return: "1. Apple, 2. Banana, 3. Cherry"
  // Use .map() and .join()
}

console.log(renderList(["Apple", "Banana", "Cherry"]));`,
          reference_solution: `function renderList(items) {
  return items.map((item, i) => (i + 1) + ". " + item).join(", ");
}
console.log(renderList(["Apple", "Banana", "Cherry"]));`,
          hints: ['Use .map() to add the number prefix', "Use .join() to combine with ', '"],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `renderList(['Apple', 'Banana', 'Cherry']) formats correctly`, expected_output: `1. Apple, 2. Banana, 3. Cherry` },
          ],
        },
      ],
    },
    {
      id: "react-u2",
      track_id: "react",
      title: "State & Hooks",
      description: `useState, useEffect, and event handling`,
      icon: "🎣",
      order_index: 2,
      lessons: [
        {
          id: "react-u2-l1",
          unit_id: "react-u2",
          track_id: "react",
          type: "concept",
          title: "useState Hook",
          explanation_md: `## useState: React's State Hook

\`useState\` lets a component remember values between renders.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initial value = 0
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
\`\`\`

### Rules of Hooks
1. Only call hooks at the **top level** (not inside loops or conditions)
2. Only call hooks from **React functions**

### Challenge
Simulate state updates: Write \`applyUpdates(initial, updates)\` where \`updates\` is an array of \`+1\` or \`-1\` values.
`,
          starter_code: `function applyUpdates(initial, updates) {
  // Start with 'initial', apply each update (+1 or -1)
  // Return the final count
}

console.log(applyUpdates(0, [1, 1, 1, -1]));  // 2
console.log(applyUpdates(5, [-1, -1, 1]));     // 4`,
          reference_solution: `function applyUpdates(initial, updates) {
  return updates.reduce((count, delta) => count + delta, initial);
}
console.log(applyUpdates(0, [1, 1, 1, -1]));
console.log(applyUpdates(5, [-1, -1, 1]));`,
          hints: ['Use .reduce() with initial value', 'Each update is +1 or -1'],
          xp_reward: 80,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `applyUpdates(0, [1,1,1,-1]) returns 2`, expected_output: `2` },
            { description: `applyUpdates(5, [-1,-1,1]) returns 4`, expected_output: `4` },
          ],
        },
        {
          id: "react-u2-l2",
          unit_id: "react-u2",
          track_id: "react",
          type: "concept",
          title: "useEffect Hook",
          explanation_md: `## useEffect: Side Effects in React

\`useEffect\` runs code after rendering. Use it for:
- Fetching data
- Subscribing to events
- Timers

\`\`\`jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup!
  }, []); // [] means run once on mount
  
  return <p>{seconds}s elapsed</p>;
}
\`\`\`

### Dependency Array
- \`[]\` — run once on mount
- \`[value]\` — run when \`value\` changes
- No array — run after every render

### Challenge
Write \`debounce(fn, delay)\` — a function that delays calling \`fn\` until \`delay\` ms have passed.
Simulate by returning \`"debounced: " + fn()\`.
`,
          starter_code: `function debounce(fn, delay) {
  // For this exercise: return "debounced: " + fn()
  // (In real React, you'd use setTimeout)
}

const sayHi = () => "hello";
console.log(debounce(sayHi, 300));`,
          reference_solution: `function debounce(fn, delay) {
  return "debounced: " + fn();
}
const sayHi = () => "hello";
console.log(debounce(sayHi, 300));`,
          hints: ["Call fn() and prefix with 'debounced: '"],
          xp_reward: 80,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `debounce returns 'debounced: hello'`, expected_output: `debounced: hello` },
          ],
        },
        {
          id: "react-u2-l3",
          unit_id: "react-u2",
          track_id: "react",
          type: "concept",
          title: "Event Handling",
          explanation_md: `## Event Handling in React

React uses camelCase event names and passes event objects:

\`\`\`jsx
function Form() {
  const [text, setText] = useState('');
  
  function handleChange(e) {
    setText(e.target.value); // e.target.value is the input text
  }
  
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    alert("Submitted: " + text);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

### Common Events
| Event | Description |
|-------|-------------|
| onClick | Button clicks |
| onChange | Input changes |
| onSubmit | Form submission |
| onKeyDown | Key pressed |

### Challenge
Write \`processEvent(type, value)\` that returns:
- "Clicked: VALUE" for "click"
- "Changed to: VALUE" for "change"
- "Submitted: VALUE" for "submit"
`,
          starter_code: `function processEvent(type, value) {
  // Handle "click", "change", "submit" event types
}

console.log(processEvent("click", "button1"));
console.log(processEvent("change", "hello"));
console.log(processEvent("submit", "myform"));`,
          reference_solution: `function processEvent(type, value) {
  if (type === "click") return "Clicked: " + value;
  if (type === "change") return "Changed to: " + value;
  if (type === "submit") return "Submitted: " + value;
  return "Unknown event";
}
console.log(processEvent("click", "button1"));
console.log(processEvent("change", "hello"));
console.log(processEvent("submit", "myform"));`,
          hints: ['Use if/else or a switch statement for each event type'],
          xp_reward: 80,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `click event`, expected_output: `Clicked: button1` },
            { description: `change event`, expected_output: `Changed to: hello` },
            { description: `submit event`, expected_output: `Submitted: myform` },
          ],
        },
        {
          id: "react-u2-l4",
          unit_id: "react-u2",
          track_id: "react",
          type: "challenge",
          title: "State Machine Challenge",
          explanation_md: `## Boss: Implement a Simple State Machine

Build \`stateMachine(currentState, action)\` that transitions between states:

States: \`"idle"\` → \`"loading"\` → \`"success"\` or \`"error"\`

Transitions:
- \`idle + "FETCH"\` → \`"loading"\`
- \`loading + "SUCCESS"\` → \`"success"\`
- \`loading + "ERROR"\` → \`"error"\`
- \`success + "RESET"\` → \`"idle"\`
- \`error + "RESET"\` → \`"idle"\`
- Any other → same state (no-op)
`,
          starter_code: `function stateMachine(currentState, action) {
  // Implement the transitions described above
}

console.log(stateMachine("idle", "FETCH"));       // loading
console.log(stateMachine("loading", "SUCCESS"));  // success
console.log(stateMachine("loading", "ERROR"));    // error
console.log(stateMachine("success", "RESET"));    // idle`,
          reference_solution: `function stateMachine(currentState, action) {
  const transitions = {
    idle: { FETCH: "loading" },
    loading: { SUCCESS: "success", ERROR: "error" },
    success: { RESET: "idle" },
    error: { RESET: "idle" },
  };
  return transitions[currentState]?.[action] ?? currentState;
}
console.log(stateMachine("idle", "FETCH"));
console.log(stateMachine("loading", "SUCCESS"));
console.log(stateMachine("loading", "ERROR"));
console.log(stateMachine("success", "RESET"));`,
          hints: ['Use a nested object for the transition table', 'Use ?. optional chaining and ?? nullish coalescing'],
          xp_reward: 120,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `idle + FETCH -> loading`, expected_output: `loading` },
            { description: `loading + SUCCESS -> success`, expected_output: `success` },
            { description: `loading + ERROR -> error`, expected_output: `error` },
            { description: `success + RESET -> idle`, expected_output: `idle` },
          ],
        },
      ],
    },
    {
      id: "react-u3",
      track_id: "react",
      title: "Component Patterns",
      description: `Context, custom hooks, and component composition`,
      icon: "🏗️",
      order_index: 3,
      lessons: [
        {
          id: "react-u3-l1",
          unit_id: "react-u3",
          track_id: "react",
          type: "concept",
          title: "Conditional Rendering",
          explanation_md: `## Conditional Rendering

Show different UI based on state:

\`\`\`jsx
function UserStatus({ isLoggedIn, username }) {
  if (!isLoggedIn) {
    return <button>Sign In</button>;
  }
  
  return <p>Welcome, {username}!</p>;
}

// Short-circuit with &&
function Notification({ message }) {
  return (
    <div>
      {message && <div className="alert">{message}</div>}
    </div>
  );
}
\`\`\`

### Challenge
Write \`renderStatus(user)\` where \`user\` is \`null\` or \`{ name, role }\`.
Returns: \`"Guest"\` if null, \`"Admin: NAME"\` if role==="admin", \`"User: NAME"\` otherwise.
`,
          starter_code: `function renderStatus(user) {
  // null -> "Guest"
  // { name, role: "admin" } -> "Admin: NAME"
  // { name, role: other } -> "User: NAME"
}

console.log(renderStatus(null));
console.log(renderStatus({ name: "Alice", role: "admin" }));
console.log(renderStatus({ name: "Bob", role: "member" }));`,
          reference_solution: `function renderStatus(user) {
  if (!user) return "Guest";
  if (user.role === "admin") return "Admin: " + user.name;
  return "User: " + user.name;
}
console.log(renderStatus(null));
console.log(renderStatus({ name: "Alice", role: "admin" }));
console.log(renderStatus({ name: "Bob", role: "member" }));`,
          hints: ['Check for null first', 'Then check user.role'],
          xp_reward: 80,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `null -> Guest`, expected_output: `Guest` },
            { description: `admin -> Admin: Alice`, expected_output: `Admin: Alice` },
            { description: `member -> User: Bob`, expected_output: `User: Bob` },
          ],
        },
        {
          id: "react-u3-l2",
          unit_id: "react-u3",
          track_id: "react",
          type: "concept",
          title: "List Rendering & Keys",
          explanation_md: `## Rendering Lists with .map()

React renders lists by mapping over arrays. Each item needs a unique \`key\`:

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

### Filtering Lists
\`\`\`jsx
{todos
  .filter(todo => !todo.done)
  .map(todo => <li key={todo.id}>{todo.text}</li>)
}
\`\`\`

### Challenge
Write \`formatTodos(todos)\` — takes array of \`{ id, text, done }\` and returns only the incomplete todos as \`"[ ] text"\`, joined by newlines.
`,
          starter_code: `function formatTodos(todos) {
  // Filter to only incomplete (done === false)
  // Format each as "[ ] text"
  // Join with newline
}

const todos = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Build a project", done: false },
  { id: 3, text: "Deploy app", done: false },
];
console.log(formatTodos(todos));`,
          reference_solution: `function formatTodos(todos) {
  return todos
    .filter(t => !t.done)
    .map(t => "[ ] " + t.text)
    .join("\n");
}
const todos = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Build a project", done: false },
  { id: 3, text: "Deploy app", done: false },
];
console.log(formatTodos(todos));`,
          hints: ["Chain .filter() then .map() then .join('\\n')", 'Filter where done === false'],
          xp_reward: 85,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Returns only incomplete todos formatted`, expected_output: `[ ] Build a project\n[ ] Deploy app` },
          ],
        },
        {
          id: "react-u3-l3",
          unit_id: "react-u3",
          track_id: "react",
          type: "concept",
          title: "Custom Hooks",
          explanation_md: `## Custom Hooks

Extract stateful logic into reusable hooks. Always start with \`use\`:

\`\`\`jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initial;
    } catch {
      return initial;
    }
  });
  
  function setAndStore(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }
  
  return [value, setAndStore];
}

// Usage:
const [theme, setTheme] = useLocalStorage('theme', 'dark');
\`\`\`

### Challenge
Simulate a \`useCounter\` hook. Write \`createCounter(initial)\` that returns an object with \`{ count, increment, decrement, reset }\` as functions.
`,
          starter_code: `function createCounter(initial) {
  let count = initial;
  return {
    getCount: () => count,
    increment: () => { count++; },
    decrement: () => { count--; },
    reset: () => { count = initial; },
  };
}

const counter = createCounter(0);
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // 2
counter.reset();
console.log(counter.getCount()); // 0`,
          reference_solution: `function createCounter(initial) {
  let count = initial;
  return {
    getCount: () => count,
    increment: () => { count++; },
    decrement: () => { count--; },
    reset: () => { count = initial; },
  };
}
const counter = createCounter(0);
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount());
counter.reset();
console.log(counter.getCount());`,
          hints: ['Use closures to keep the count private', 'Return an object with methods'],
          xp_reward: 90,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `counter after 3 increments and 1 decrement is 2`, expected_output: `2` },
            { description: `counter after reset is 0`, expected_output: `0` },
          ],
        },
        {
          id: "react-u3-l4",
          unit_id: "react-u3",
          track_id: "react",
          type: "challenge",
          title: "Context & Global State Boss",
          explanation_md: `## React Context: Global State

Context avoids "prop drilling" (passing props through many levels):

\`\`\`jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <DeepChild />
    </ThemeContext.Provider>
  );
}

function DeepChild() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
\`\`\`

### Boss Challenge
Implement a simple \`createStore(initialState)\` that returns \`{ getState, setState, subscribe }\`.
`,
          starter_code: `function createStore(initialState) {
  let state = initialState;
  const listeners = [];
  
  return {
    getState: () => state,
    setState: (newState) => {
      // Update state, call all listeners
    },
    subscribe: (listener) => {
      // Add listener, return unsubscribe function
    },
  };
}

const store = createStore({ count: 0 });
const unsub = store.subscribe(() => console.log("State:", store.getState().count));
store.setState({ count: 1 });
store.setState({ count: 2 });
unsub();
store.setState({ count: 3 }); // Listener should NOT fire after unsub`,
          reference_solution: `function createStore(initialState) {
  let state = initialState;
  const listeners = [];
  return {
    getState: () => state,
    setState: (newState) => {
      state = newState;
      listeners.forEach(l => l());
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const i = listeners.indexOf(listener);
        if (i > -1) listeners.splice(i, 1);
      };
    },
  };
}
const store = createStore({ count: 0 });
const unsub = store.subscribe(() => console.log("State:", store.getState().count));
store.setState({ count: 1 });
store.setState({ count: 2 });
unsub();
store.setState({ count: 3 });`,
          hints: ['listeners is an array of functions', 'subscribe returns a function to remove the listener', 'setState calls all current listeners'],
          xp_reward: 130,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `First setState fires listener: State: 1`, expected_output: `State: 1` },
            { description: `Second setState fires listener: State: 2`, expected_output: `State: 2` },
          ],
        },
      ],
    },
    {
      id: "react-u4",
      track_id: "react",
      title: "React in Production",
      description: `Performance, routing, and data fetching`,
      icon: "🚀",
      order_index: 4,
      lessons: [
        {
          id: "react-u4-l1",
          unit_id: "react-u4",
          track_id: "react",
          type: "concept",
          title: "Performance Optimization",
          explanation_md: `## React Performance

React re-renders components when state/props change. Optimize with:

### React.memo
\`\`\`jsx
const ExpensiveChild = React.memo(function Child({ value }) {
  console.log("Rendered!");
  return <p>{value}</p>;
});
\`\`\`

### useMemo
\`\`\`jsx
const sorted = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]); // Only recompute when 'items' changes
\`\`\`

### useCallback
\`\`\`jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // New function only created when 'id' changes
\`\`\`

### Challenge
Write \`memoize(fn)\` — a function that caches results.
`,
          starter_code: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key]; // return cached
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

let callCount = 0;
const expensive = memoize((n) => {
  callCount++;
  return n * n;
});

console.log(expensive(4));  // 16
console.log(expensive(4));  // 16 (from cache)
console.log(expensive(5));  // 25
console.log("Calls:", callCount); // Should be 2, not 3`,
          reference_solution: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}
let callCount = 0;
const expensive = memoize((n) => { callCount++; return n * n; });
console.log(expensive(4));
console.log(expensive(4));
console.log(expensive(5));
console.log("Calls:", callCount);`,
          hints: ['Use JSON.stringify(args) as cache key', 'Check if key is in cache before calling fn'],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `First call: 16`, expected_output: `16` },
            { description: `Cached call: 16`, expected_output: `16` },
            { description: `New argument: 25`, expected_output: `25` },
            { description: `Only 2 actual calls`, expected_output: `Calls: 2` },
          ],
        },
        {
          id: "react-u4-l2",
          unit_id: "react-u4",
          track_id: "react",
          type: "concept",
          title: "Data Fetching Patterns",
          explanation_md: `## Data Fetching in React

### Basic Pattern
\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <Profile user={user} />;
}
\`\`\`

### Challenge
Write \`fetchWithRetry(fetchFn, maxRetries)\` — tries \`fetchFn()\` up to \`maxRetries\` times.
Returns the result or throws after all retries fail.
Simulate: fetchFn returns a value or throws "Network error".
`,
          starter_code: `function fetchWithRetry(fetchFn, maxRetries) {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return fetchFn();
    } catch (e) {
      attempts++;
      if (attempts >= maxRetries) throw new Error("Failed after " + maxRetries + " retries");
    }
  }
}

// Test: fails twice then succeeds
let callCount = 0;
const flaky = () => {
  callCount++;
  if (callCount < 3) throw new Error("Network error");
  return "data";
};

console.log(fetchWithRetry(flaky, 5)); // "data"
console.log("Attempts:", callCount);   // 3`,
          reference_solution: `function fetchWithRetry(fetchFn, maxRetries) {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return fetchFn();
    } catch (e) {
      attempts++;
      if (attempts >= maxRetries) throw new Error("Failed after " + maxRetries + " retries");
    }
  }
}
let callCount = 0;
const flaky = () => {
  callCount++;
  if (callCount < 3) throw new Error("Network error");
  return "data";
};
console.log(fetchWithRetry(flaky, 5));
console.log("Attempts:", callCount);`,
          hints: ['Use a while loop with a try/catch', 'Increment attempts on each failure'],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Returns data after retries`, expected_output: `data` },
            { description: `Took 3 attempts`, expected_output: `Attempts: 3` },
          ],
        },
        {
          id: "react-u4-l3",
          unit_id: "react-u4",
          track_id: "react",
          type: "concept",
          title: "React Router Patterns",
          explanation_md: `## Client-Side Routing

React Router enables navigation without page reloads:

\`\`\`jsx
import { BrowserRouter, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <button onClick={() => navigate('/')}>Back - User {id}</button>;
}
\`\`\`

### Challenge
Write \`parseRoute(path)\` that extracts params from URL patterns.
Pattern \`/user/:id/post/:postId\` with path \`/user/42/post/7\` → \`{ id: "42", postId: "7" }\`
`,
          starter_code: `function parseRoute(pattern, path) {
  const patternParts = pattern.split("/");
  const pathParts = path.split("/");
  const params = {};
  
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      const key = patternParts[i].slice(1);
      params[key] = pathParts[i];
    }
  }
  
  return params;
}

const result = parseRoute("/user/:id/post/:postId", "/user/42/post/7");
console.log(result.id);     // 42
console.log(result.postId); // 7`,
          reference_solution: `function parseRoute(pattern, path) {
  const patternParts = pattern.split("/");
  const pathParts = path.split("/");
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = pathParts[i];
    }
  }
  return params;
}
const result = parseRoute("/user/:id/post/:postId", "/user/42/post/7");
console.log(result.id);
console.log(result.postId);`,
          hints: ["Split both pattern and path by '/'", "Check if pattern segment starts with ':'"],
          xp_reward: 95,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `id param is 42`, expected_output: `42` },
            { description: `postId param is 7`, expected_output: `7` },
          ],
        },
        {
          id: "react-u4-l4",
          unit_id: "react-u4",
          track_id: "react",
          type: "challenge",
          title: "Final Boss: Mini Redux",
          explanation_md: `## Final Boss: Build a Mini Redux

Implement \`createReduxStore(reducer, initialState)\` with:
- \`getState()\` — returns current state
- \`dispatch(action)\` — runs \`state = reducer(state, action)\`, notifies subscribers
- \`subscribe(listener)\` — returns unsubscribe function

### Counter Reducer
\`\`\`js
function counterReducer(state = { count: 0 }, action) {
  switch(action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
}
\`\`\`
`,
          starter_code: `function createReduxStore(reducer, initialState) {
  let state = initialState ?? reducer(undefined, { type: "@@INIT" });
  const listeners = [];
  
  return {
    getState: () => state,
    dispatch: (action) => {
      // Run reducer, update state, notify listeners
    },
    subscribe: (listener) => {
      // Add listener, return unsubscribe fn
    },
  };
}

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    default: return state;
  }
}

const store = createReduxStore(counterReducer, { count: 0 });
store.subscribe(() => console.log(store.getState().count));
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });`,
          reference_solution: `function createReduxStore(reducer, initialState) {
  let state = initialState ?? reducer(undefined, { type: "@@INIT" });
  const listeners = [];
  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach(l => l());
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => { const i = listeners.indexOf(listener); if (i > -1) listeners.splice(i, 1); };
    },
  };
}
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    default: return state;
  }
}
const store = createReduxStore(counterReducer, { count: 0 });
store.subscribe(() => console.log(store.getState().count));
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });`,
          hints: ['dispatch calls reducer, updates state, then calls all listeners', 'subscribe returns an unsubscribe function'],
          xp_reward: 150,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `First INCREMENT -> count: 1`, expected_output: `1` },
            { description: `Second INCREMENT -> count: 2`, expected_output: `2` },
            { description: `DECREMENT -> count: 1`, expected_output: `1` },
          ],
        },
      ],
    },
  ],
};
