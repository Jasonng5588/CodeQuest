import type { StaticTrack } from "./lesson-content";

export const NODEJS_TRACK: StaticTrack = {
  id: "nodejs",
  title: "Node.js",
  description: `JavaScript on the server. Express, file system, streams, and the event loop.`,
  color: "#68a063",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "nodejs-u1",
      track_id: "nodejs",
      title: "Node.js Unit 1",
      description: `Core Node.js concepts`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "nodejs-u1-l1",
          unit_id: "nodejs-u1",
          track_id: "nodejs",
          type: "concept",
          title: "Node.js Basics",
          explanation_md: `## Node.js: JavaScript on the Server

\`\`\`js
// Built-in modules
const fs = require('fs');
const path = require('path');
const http = require('http');

// Modern import syntax
import { readFile } from 'fs/promises';

// Process object
console.log(process.env.NODE_ENV);
console.log(process.argv);

// __dirname and __filename
console.log(__dirname);  // current directory
\`\`\`
### Challenge
Write \`buildPath(...parts)\` joining path parts with \`/\`.`,
          starter_code: `function buildPath(...parts){
  return parts.join("/");
}
console.log(buildPath("/home","user","docs","file.txt"));
console.log(buildPath("src","components","Button.jsx"));`,
          reference_solution: `function buildPath(...parts){return parts.join("/");}
console.log(buildPath("/home","user","docs","file.txt"));
console.log(buildPath("src","components","Button.jsx"));`,
          hints: ["Use .join('/')"],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Full path`, expected_output: `/home/user/docs/file.txt` },
            { description: `Relative path`, expected_output: `src/components/Button.jsx` },
          ],
        },
        {
          id: "nodejs-u1-l2",
          unit_id: "nodejs-u1",
          track_id: "nodejs",
          type: "concept",
          title: "Event Loop & Async",
          explanation_md: `## The Node.js Event Loop

Node.js is single-threaded but non-blocking:

\`\`\`js
console.log('1');  // synchronous
setTimeout(() => console.log('3'), 0);  // macrotask
Promise.resolve().then(() => console.log('2'));  // microtask
console.log('4');
// Output: 1, 4, 2, 3
\`\`\`

### Async patterns
\`\`\`js
// Callback
fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});
// Promise
fs.promises.readFile('file.txt').then(console.log);
// Async/await
const data = await fs.promises.readFile('file.txt');
\`\`\`
### Challenge
Write \`sleep(ms)\` returning a Promise that resolves with \`"done"\` after ms. Simulate with immediate resolve.`,
          starter_code: `function sleep(ms){
  return Promise.resolve("done");
}
async function test(){
  const result = await sleep(100);
  console.log(result);
}
test();`,
          reference_solution: `function sleep(ms){return Promise.resolve("done");}
async function test(){const r=await sleep(100);console.log(r);}
test();`,
          hints: ['Return Promise.resolve for simulation'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Resolves with done`, expected_output: `done` },
          ],
        },
        {
          id: "nodejs-u1-l3",
          unit_id: "nodejs-u1",
          track_id: "nodejs",
          type: "concept",
          title: "Streams",
          explanation_md: `## Node.js Streams

Streams process data chunk by chunk (memory efficient):

\`\`\`js
const { Transform } = require('stream');

const upper = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

// Pipe: stdin -> uppercase -> stdout
process.stdin.pipe(upper).pipe(process.stdout);

// File streaming
fs.createReadStream('big.csv')
    .pipe(csvParser())
    .pipe(fs.createWriteStream('out.json'));
\`\`\`
### Challenge
Write \`transformStream(data, ...transforms)\` applying each transform to data.`,
          starter_code: `function transformStream(data, ...transforms){
  return transforms.reduce((acc,fn)=>fn(acc),data);
}
console.log(transformStream("  hello world  ",
  s=>s.trim(),
  s=>s.toUpperCase(),
  s=>s.split(" ").reverse().join(" ")
));`,
          reference_solution: `function transformStream(data,...transforms){return transforms.reduce((acc,fn)=>fn(acc),data);}
console.log(transformStream("  hello world  ",s=>s.trim(),s=>s.toUpperCase(),s=>s.split(" ").reverse().join(" ")));`,
          hints: ['Use reduce to chain transforms'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Trimmed, uppercased, reversed`, expected_output: `WORLD HELLO` },
          ],
        },
        {
          id: "nodejs-u1-l4",
          unit_id: "nodejs-u1",
          track_id: "nodejs",
          type: "challenge",
          title: "Node.js Boss: HTTP Server",
          explanation_md: `## Boss: Mini HTTP Server

Build a simple router:

\`\`\`js
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({status: 'ok'}));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});
server.listen(3000);
\`\`\`
### Boss
Write \`createServer(routes)\` with \`handle(method, url)\` returning \`{status, body}\`.`,
          starter_code: `function createServer(routes){
  return {
    handle(method,url){
      const key=method+" "+url;
      if(routes[key]) return {status:200,body:routes[key]()};
      return {status:404,body:"Not Found"};
    }
  };
}
const server=createServer({
  "GET /": ()=>({status:"ok"}),
  "GET /users": ()=>["Alice","Bob"],
});
console.log(JSON.stringify(server.handle("GET","/")));
console.log(JSON.stringify(server.handle("GET","/users")));
console.log(JSON.stringify(server.handle("GET","/missing")));`,
          reference_solution: `function createServer(routes){return{handle(m,u){const k=m+" "+u;return routes[k]?{status:200,body:routes[k]()}:{status:404,body:"Not Found"};}};}
const server=createServer({"GET /":()=>({status:"ok"}),"GET /users":()=>["Alice","Bob"]});
console.log(JSON.stringify(server.handle("GET","/")));
console.log(JSON.stringify(server.handle("GET","/users")));
console.log(JSON.stringify(server.handle("GET","/missing")));`,
          hints: ["Build key as 'METHOD URL'", 'Return 404 if not in routes'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `GET / -> 200`, expected_output: `{"status":200,"body":{"status":"ok"}}` },
            { description: `GET /users -> 200`, expected_output: `{"status":200,"body":["Alice","Bob"]}` },
            { description: `Missing -> 404`, expected_output: `{"status":404,"body":"Not Found"}` },
          ],
        },
      ],
    },
    {
      id: "nodejs-u2",
      track_id: "nodejs",
      title: "Node.js Unit 2",
      description: `Core Node.js concepts`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "nodejs-u2-l1",
          unit_id: "nodejs-u2",
          track_id: "nodejs",
          type: "concept",
          title: "npm & Packages",
          explanation_md: `## Node Package Manager

\`\`\`json
// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^3.0.0"
  }
}
\`\`\`
### Challenge
Write \`parsePackageVersion(version)\` — parse \`"^1.2.3"\` → \`{major:1,minor:2,patch:3,caret:true}\`.`,
          starter_code: `function parsePackageVersion(v){
  const caret = v.startsWith("^");
  const parts = v.replace("^","").split(".").map(Number);
  return {major:parts[0],minor:parts[1],patch:parts[2],caret};
}
console.log(JSON.stringify(parsePackageVersion("^1.2.3")));
console.log(JSON.stringify(parsePackageVersion("4.18.2")));`,
          reference_solution: `function parsePackageVersion(v){const c=v.startsWith("^");const p=v.replace("^","").split(".").map(Number);return{major:p[0],minor:p[1],patch:p[2],caret:c};}
console.log(JSON.stringify(parsePackageVersion("^1.2.3")));
console.log(JSON.stringify(parsePackageVersion("4.18.2")));`,
          hints: ["Check startsWith('^') for caret", "Split by '.' and map to Number"],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `With caret`, expected_output: `{"major":1,"minor":2,"patch":3,"caret":true}` },
            { description: `Without caret`, expected_output: `{"major":4,"minor":18,"patch":2,"caret":false}` },
          ],
        },
        {
          id: "nodejs-u2-l2",
          unit_id: "nodejs-u2",
          track_id: "nodejs",
          type: "concept",
          title: "Express & Middleware",
          explanation_md: `## Express.js: Web Framework

\`\`\`js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use((req,res,next) => {
    console.log(\`\${req.method} \${req.url}\`);
    next();
});

// Routes
app.get('/users', async (req,res) => {
    const users = await db.getUsers();
    res.json(users);
});

app.post('/users', async (req,res) => {
    const user = await db.createUser(req.body);
    res.status(201).json(user);
});

app.listen(3000);
\`\`\`
### Challenge
Write \`applyMiddleware(req, middlewares)\` — runs each middleware in order, passing req through.`,
          starter_code: `function applyMiddleware(req, middlewares){
  const log = [];
  let current = {...req};
  for (const mw of middlewares) {
    current = mw(current);
    log.push(current.processed);
  }
  return current;
}
const result = applyMiddleware(
  {url:"/api/users",user:null},
  req => ({...req,logged:true,processed:"logged"}),
  req => ({...req,user:{id:1},processed:"authed"}),
  req => ({...req,validated:true,processed:"validated"}),
);
console.log(result.logged);
console.log(result.user.id);
console.log(result.validated);`,
          reference_solution: `function applyMiddleware(req,mws){let c={...req};for(const mw of mws)c=mw(c);return c;}
const result=applyMiddleware({url:"/api/users",user:null},[req=>({...req,logged:true,processed:"logged"}),req=>({...req,user:{id:1},processed:"authed"}),req=>({...req,validated:true,processed:"validated"})]);
console.log(result.logged);
console.log(result.user.id);
console.log(result.validated);`,
          hints: ['Each middleware receives req and returns modified req'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `logged=true`, expected_output: `true` },
            { description: `user.id=1`, expected_output: `1` },
            { description: `validated=true`, expected_output: `true` },
          ],
        },
        {
          id: "nodejs-u2-l3",
          unit_id: "nodejs-u2",
          track_id: "nodejs",
          type: "concept",
          title: "File System Operations",
          explanation_md: `## Node.js File System

\`\`\`js
const fs = require('fs/promises');

// Read
const content = await fs.readFile('file.txt', 'utf8');

// Write
await fs.writeFile('out.txt', 'Hello!', 'utf8');

// List directory
const files = await fs.readdir('./src');

// Check exists
try {
    await fs.access('file.txt');
    console.log('exists');
} catch { console.log('not found'); }

// Stats
const stats = await fs.stat('file.txt');
console.log(stats.size, stats.isDirectory());
\`\`\`
### Challenge
Write \`parseCSV(text)\` — convert CSV text to array of objects using first row as headers.`,
          starter_code: `function parseCSV(text){
  const lines = text.trim().split("\\n");
  const headers = lines[0].split(",").map(h=>h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(",").map(v=>v.trim());
    const obj = {};
    headers.forEach((h,i) => obj[h] = values[i]);
    return obj;
  });
}
const csv = "name,age,city\\nAlice,30,NYC\\nBob,25,LA";
const rows = parseCSV(csv);
console.log(rows[0].name);
console.log(rows[1].city);`,
          reference_solution: `function parseCSV(text){const lines=text.trim().split("\\n");const h=lines[0].split(",").map(s=>s.trim());return lines.slice(1).map(l=>{const v=l.split(",").map(s=>s.trim());const o={};h.forEach((k,i)=>o[k]=v[i]);return o;});}
const csv="name,age,city\\nAlice,30,NYC\\nBob,25,LA";
const rows=parseCSV(csv);
console.log(rows[0].name);
console.log(rows[1].city);`,
          hints: ['First line = headers', 'Map remaining lines to objects using headers'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `First row name`, expected_output: `Alice` },
            { description: `Second row city`, expected_output: `LA` },
          ],
        },
        {
          id: "nodejs-u2-l4",
          unit_id: "nodejs-u2",
          track_id: "nodejs",
          type: "challenge",
          title: "Node.js Boss: CLI Tool",
          explanation_md: `## Boss: Build a CLI Tool

\`\`\`js
#!/usr/bin/env node
const args = process.argv.slice(2);
const [command, ...params] = args;

const commands = {
    greet: ([name]) => "Hello, " + name + "!",
    sum: (nums) => nums.reduce((s,n)=>s+Number(n),0),
    upper: ([text]) => text.toUpperCase(),
};

if (commands[command]) {
    console.log(commands[command](params));
} else {
    console.log('Unknown command:', command);
}
\`\`\`
### Boss
Build \`createCLI(commands)\` that returns \`run(args)\` dispatching to the right command.`,
          starter_code: `function createCLI(commands){
  return {
    run(args) {
      const [cmd, ...params] = args;
      if (!commands[cmd]) return "Unknown command: " + cmd;
      return commands[cmd](params);
    }
  };
}
const cli = createCLI({
  greet: ([name]) => "Hello, " + name + "!",
  sum: (nums) => String(nums.reduce((s,n)=>s+Number(n),0)),
  upper: ([text]) => text.toUpperCase(),
});
console.log(cli.run(["greet","Alice"]));
console.log(cli.run(["sum","1","2","3"]));
console.log(cli.run(["upper","hello"]));
console.log(cli.run(["unknown"]));`,
          reference_solution: `function createCLI(commands){return{run(args){const[cmd,...p]=args;return commands[cmd]?commands[cmd](p):"Unknown command: "+cmd;}};}
const cli=createCLI({greet:([n])=>\`Hello, \${n}!\`,sum:ns=>String(ns.reduce((s,n)=>s+Number(n),0)),upper:([t])=>t.toUpperCase()});
console.log(cli.run(["greet","Alice"]));
console.log(cli.run(["sum","1","2","3"]));
console.log(cli.run(["upper","hello"]));
console.log(cli.run(["unknown"]));`,
          hints: ['Destructure [cmd, ...params] from args', 'Dispatch to commands[cmd](params)'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `greet`, expected_output: `Hello, Alice!` },
            { description: `sum`, expected_output: `6` },
            { description: `upper`, expected_output: `HELLO` },
            { description: `unknown`, expected_output: `Unknown command: unknown` },
          ],
        },
      ],
    },
  ],
};
