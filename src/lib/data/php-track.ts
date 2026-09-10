import type { StaticTrack } from "./lesson-content";

export const PHP_TRACK: StaticTrack = {
  id: "php",
  title: "PHP",
  description: `Server-side web scripting. Modern PHP 8, OOP, and web APIs.`,
  color: "#4f5d95",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "php-u1",
      track_id: "php",
      title: "PHP Unit 1",
      description: `PHP concepts`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "php-u1-l1",
          unit_id: "php-u1",
          track_id: "php",
          type: "concept",
          title: "PHP Basics",
          explanation_md: `## PHP: Hypertext Preprocessor

\`\`\`php
<?php
$name = "Alice";
$age = 30;
echo "Hello, $name! Age: $age"; // String interpolation
$arr = [1, 2, 3, 4, 5];
$doubled = array_map(fn($x) => $x * 2, $arr);
print_r($doubled);
\`\`\`
### Challenge
Write \`formatUser(name, age)\` returning \`"USER (AGE)"\`.`,
          starter_code: `function formatUser(name,age){return name+" ("+age+")";}
console.log(formatUser("Alice",30));`,
          reference_solution: `function formatUser(n,a){return n+" ("+a+")";}
console.log(formatUser("Alice",30));`,
          hints: [],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice`, expected_output: `Alice (30)` },
          ],
        },
        {
          id: "php-u1-l2",
          unit_id: "php-u1",
          track_id: "php",
          type: "concept",
          title: "Arrays & Loops",
          explanation_md: `## PHP Arrays

\`\`\`php
$fruits = ["apple", "banana", "cherry"];
// Map, filter, reduce
$upper = array_map('strtoupper', $fruits);
$long = array_filter($fruits, fn($f) => strlen($f) > 5);
$total = array_reduce($nums, fn($carry, $item) => $carry + $item, 0);

// Sorting
sort($fruits);          // in-place sort
usort($people, fn($a,$b) => $a['age'] - $b['age']);
\`\`\`
### Challenge
Write \`getTopItems(items, n)\` — return top n items by value, sorted descending.`,
          starter_code: `function getTopItems(items,n){return [...items].sort((a,b)=>b-a).slice(0,n);}
console.log(getTopItems([3,1,4,1,5,9,2,6],3).join(','));`,
          reference_solution: `function getTopItems(items,n){return[...items].sort((a,b)=>b-a).slice(0,n);}
console.log(getTopItems([3,1,4,1,5,9,2,6],3).join(','));`,
          hints: [],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Top 3`, expected_output: `9,6,5` },
          ],
        },
        {
          id: "php-u1-l3",
          unit_id: "php-u1",
          track_id: "php",
          type: "concept",
          title: "Functions & Classes",
          explanation_md: `## PHP 8 OOP

\`\`\`php
class BankAccount {
    private float $balance;
    public function __construct(float $initial) {
        $this->balance = $initial;
    }
    public function deposit(float $amount): void {
        $this->balance += $amount;
    }
    public function withdraw(float $amount): bool {
        if ($amount > $this->balance) return false;
        $this->balance -= $amount;
        return true;
    }
    public function getBalance(): float { return $this->balance; }
}
\`\`\`
### Challenge
Write \`createAccount(initial)\` with \`deposit(n)\`, \`withdraw(n)\`, \`balance()\`.`,
          starter_code: `function createAccount(init){let bal=init;return{deposit(n){bal+=n;},withdraw(n){if(n>bal)return false;bal-=n;return true;},balance(){return bal;}}}
const acc=createAccount(100);
acc.deposit(50);
console.log(acc.balance());
console.log(acc.withdraw(200));
console.log(acc.balance());`,
          reference_solution: `function createAccount(init){let bal=init;return{deposit(n){bal+=n;},withdraw(n){if(n>bal)return false;bal-=n;return true;},balance(){return bal;}};}
const acc=createAccount(100);
acc.deposit(50);
console.log(acc.balance());
console.log(acc.withdraw(200));
console.log(acc.balance());`,
          hints: [],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `150 after deposit`, expected_output: `150` },
            { description: `withdraw 200 fails`, expected_output: `false` },
            { description: `still 150`, expected_output: `150` },
          ],
        },
        {
          id: "php-u1-l4",
          unit_id: "php-u1",
          track_id: "php",
          type: "challenge",
          title: "PHP Boss: API Response Builder",
          explanation_md: `## Boss: Build an API Response Builder

\`\`\`php
function response(int $status, mixed $data, ?string $error = null): array {
    return ['status' => $status, 'data' => $data, 'error' => $error, 'timestamp' => time()];
}
\`\`\`
### Boss
Write \`apiResponse(status, data, error)\` returning a structured response object with \`ok\`, \`status\`, \`data\`, \`error\`.`,
          starter_code: `function apiResponse(status,data,error=null){
  return{ok:status>=200&&status<300,status,data,error};
}
console.log(JSON.stringify(apiResponse(200,["Alice","Bob"])));
console.log(JSON.stringify(apiResponse(404,null,"Not Found")));`,
          reference_solution: `function apiResponse(status,data,error=null){return{ok:status>=200&&status<300,status,data,error};}
console.log(JSON.stringify(apiResponse(200,["Alice","Bob"])));
console.log(JSON.stringify(apiResponse(404,null,"Not Found")));`,
          hints: [],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `200 ok`, expected_output: `{"ok":true,"status":200,"data":["Alice","Bob"],"error":null}` },
            { description: `404 error`, expected_output: `{"ok":false,"status":404,"data":null,"error":"Not Found"}` },
          ],
        },
      ],
    },
    {
      id: "php-u2",
      track_id: "php",
      title: "PHP Unit 2",
      description: `PHP concepts`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "php-u2-l1",
          unit_id: "php-u2",
          track_id: "php",
          type: "concept",
          title: "String Manipulation",
          explanation_md: `## PHP String Functions

\`\`\`php
strtolower('HELLO') // hello
strtoupper('hello') // HELLO
trim('  text  ')    // text
str_replace('a','@','banana') // b@n@n@
substr('Hello',1,3) // ell
strlen('hello')     // 5
explode(',','a,b,c') // ['a','b','c']
implode('-',['a','b']) // a-b
\`\`\`
### Challenge
Write \`slugify(text)\` — lowercase, replace spaces with \`-\`, remove special chars.`,
          starter_code: `function slugify(text){
  return text.toLowerCase().replace(/[^a-z0-9\\s-]/g,'').replace(/\\s+/g,'-').trim();
}
console.log(slugify("Hello World!"));
console.log(slugify("My Blog Post #1"));`,
          reference_solution: `function slugify(t){return t.toLowerCase().replace(/[^a-z0-9\\s-]/g,'').replace(/\\s+/g,'-').trim();}
console.log(slugify("Hello World!"));
console.log(slugify("My Blog Post #1"));`,
          hints: [],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Hello World`, expected_output: `hello-world` },
            { description: `Blog post`, expected_output: `my-blog-post-1` },
          ],
        },
        {
          id: "php-u2-l2",
          unit_id: "php-u2",
          track_id: "php",
          type: "concept",
          title: "Database Interaction",
          explanation_md: `## PHP PDO: Database Access

\`\`\`php
$pdo = new PDO('mysql:host=localhost;dbname=mydb', $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id');
$stmt->execute(['id' => $userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Insert
$stmt = $pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');
$stmt->execute([$name, $email]);
$newId = $pdo->lastInsertId();
\`\`\`
### Challenge
Write \`buildQuery(table, where)\` creating a SQL SELECT statement.`,
          starter_code: `function buildQuery(table,where){
  if(!where||Object.keys(where).length===0) return "SELECT * FROM " + table;
  const conditions=Object.entries(where).map(([k,v])=>k+" = '"+v+"'").join(' AND ');
  return "SELECT * FROM " + table + " WHERE " + conditions;
}
console.log(buildQuery('users',{name:'Alice',role:'admin'}));
console.log(buildQuery('products',{}));`,
          reference_solution: `function buildQuery(t,w){if(!w||!Object.keys(w).length)return "SELECT * FROM "+t;const c=Object.entries(w).map(([k,v])=>k+" = '"+v+"'").join(' AND ');return "SELECT * FROM "+t+" WHERE "+c;}
console.log(buildQuery('users',{name:'Alice',role:'admin'}));
console.log(buildQuery('products',{}));`,
          hints: [],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `With conditions`, expected_output: `SELECT * FROM users WHERE name = 'Alice' AND role = 'admin'` },
            { description: `Without conditions`, expected_output: `SELECT * FROM products` },
          ],
        },
        {
          id: "php-u2-l3",
          unit_id: "php-u2",
          track_id: "php",
          type: "concept",
          title: "Composer & Packages",
          explanation_md: `## Composer: PHP Package Manager

\`\`\`json
// composer.json
{
  "require": {
    "php": ">=8.1",
    "illuminate/collections": "^10.0"
  },
  "autoload": {
    "psr-4": { "App\\\\": "src/" }
  }
}
\`\`\`

\`\`\`php
// PSR-4 autoloading
namespace App\\Models;

class User {
    public function __construct(
        public readonly string $name,
        public readonly string $email,
    ) {}
}
\`\`\`
### Challenge
Write \`autoload(namespace, className)\` returning the file path (\`Namespace/Class.php\` format).`,
          starter_code: `function autoload(ns,cls){return ns.replace(/\\\\/g,'/')+'/'+cls+'.php';}
console.log(autoload('App\\\\Models','User'));
console.log(autoload('App\\\\Http\\\\Controllers','UserController'));`,
          reference_solution: `function autoload(ns,cls){return ns.replace(/\\\\/g,'/')+'/'+cls+'.php';}
console.log(autoload('App\\\\Models','User'));
console.log(autoload('App\\\\Http\\\\Controllers','UserController'));`,
          hints: [],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `User path`, expected_output: `App/Models/User.php` },
            { description: `Controller path`, expected_output: `App/Http/Controllers/UserController.php` },
          ],
        },
        {
          id: "php-u2-l4",
          unit_id: "php-u2",
          track_id: "php",
          type: "challenge",
          title: "PHP Boss: Template Engine",
          explanation_md: `## Boss: Build a Template Engine

Implement \`render(template, data)\` that replaces \`{{variable}}\` with values from data:

\`\`\`
render('Hello, {{name}}! You have {{count}} messages.', {name: 'Alice', count: 5})
// -> 'Hello, Alice! You have 5 messages.'
\`\`\`
Also support \`{{#if condition}}...{{/if}}\` blocks.`,
          starter_code: `function render(template,data){
  // Replace {{variable}}
  let result=template.replace(/{{(\\w+)}}/g,(_,key)=>data[key]??'');
  // Handle {{#if KEY}}...{{/if}}
  result=result.replace(/{{#if (\\w+)}}([\\s\\S]*?){{\\\\/if}}/g,(_,key,content)=>data[key]?content:'');
  return result;
}
console.log(render('Hello, {{name}}! You have {{count}} messages.',{name:'Alice',count:5}));
console.log(render('{{#if isAdmin}}Admin Panel{{/if}} Welcome, {{name}}',{name:'Bob',isAdmin:true}));`,
          reference_solution: `function render(tpl,data){let r=tpl.replace(/{{(\\w+)}}/g,(_,k)=>data[k]??'');r=r.replace(/{{#if (\\w+)}}([\\s\\S]*?){{\\/if}}/g,(_,k,c)=>data[k]?c:'');return r;}
console.log(render('Hello, {{name}}! You have {{count}} messages.',{name:'Alice',count:5}));
console.log(render('{{#if isAdmin}}Admin Panel{{/if}} Welcome, {{name}}',{name:'Bob',isAdmin:true}));`,
          hints: [],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Variable replacement`, expected_output: `Hello, Alice! You have 5 messages.` },
            { description: `Conditional block`, expected_output: `Admin Panel Welcome, Bob` },
          ],
        },
      ],
    },
  ],
};
