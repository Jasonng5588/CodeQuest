import type { StaticTrack } from "./lesson-content";

export const RUST_TRACK: StaticTrack = {
  id: "rust",
  title: "Rust",
  description: `Memory safety without GC. Ownership, borrowing, and fearless concurrency.`,
  color: "#dea584",
  difficulty_curve: "advanced",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "rust-u1",
      track_id: "rust",
      title: "Rust Unit 1",
      description: `Core Rust concepts`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "rust-u1-l1",
          unit_id: "rust-u1",
          track_id: "rust",
          type: "concept",
          title: "Ownership & Borrowing",
          explanation_md: `## Rust: Memory Safety Without GC

Rust's ownership system prevents memory bugs at compile time:

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 is MOVED, not copied!
    // println!("{}", s1); // ERROR: value moved!
    println!("{}", s2);  // OK
    
    // Borrowing
    let s3 = String::from("world");
    let len = calculate_length(&s3);  // borrow
    println!("{} has {} chars", s3, len);  // s3 still valid
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
\`\`\`
### Challenge
Write \`countChars(s)\` returning \`"'STR' has N chars"\`.`,
          starter_code: `function countChars(s) {
  return \`'\${s}' has \${s.length} chars\`;
}
console.log(countChars("hello"));
console.log(countChars("rust"));`,
          reference_solution: `function countChars(s){return \`'\${s}' has \${s.length} chars\`;}
console.log(countChars("hello"));
console.log(countChars("rust"));`,
          hints: ['Use template literals'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `hello`, expected_output: `'hello' has 5 chars` },
            { description: `rust`, expected_output: `'rust' has 4 chars` },
          ],
        },
        {
          id: "rust-u1-l2",
          unit_id: "rust-u1",
          track_id: "rust",
          type: "concept",
          title: "Structs & Enums",
          explanation_md: `## Rust Structs and Enums

\`\`\`rust
#[derive(Debug)]
struct Point { x: f64, y: f64 }
impl Point {
    fn new(x: f64, y: f64) -> Self { Point { x, y } }
    fn distance(&self, other: &Point) -> f64 {
        ((self.x-other.x).powi(2) + (self.y-other.y).powi(2)).sqrt()
    }
}

enum Shape { Circle(f64), Rectangle(f64,f64) }
impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w,h) => w * h,
        }
    }
}
\`\`\`
### Challenge
Write \`distance(x1,y1,x2,y2)\` (rounded to 2dp).`,
          starter_code: `function distance(x1,y1,x2,y2){
  return Math.round(Math.sqrt((x2-x1)**2+(y2-y1)**2)*100)/100;
}
console.log(distance(0,0,3,4));
console.log(distance(1,1,4,5));`,
          reference_solution: `function distance(x1,y1,x2,y2){return Math.round(Math.sqrt((x2-x1)**2+(y2-y1)**2)*100)/100;}
console.log(distance(0,0,3,4));
console.log(distance(1,1,4,5));`,
          hints: ['Use Pythagorean theorem'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `3-4-5 triangle`, expected_output: `5` },
            { description: `other triangle`, expected_output: `5` },
          ],
        },
        {
          id: "rust-u1-l3",
          unit_id: "rust-u1",
          track_id: "rust",
          type: "concept",
          title: "Pattern Matching",
          explanation_md: `## Rust Pattern Matching

\`\`\`rust
fn classify(n: i32) -> &'static str {
    match n {
        i32::MIN..=-1 => "negative",
        0 => "zero",
        1..=9 => "single digit",
        10..=99 => "double digit",
        _ => "large",
    }
}

// Destructuring
let (x, y) = (3, 4);
let Point { x, y } = point;
let [first, .., last] = [1,2,3,4,5];
\`\`\`
### Challenge
Write \`classify(n)\` for negative/zero/small(1-9)/medium(10-99)/large.`,
          starter_code: `function classify(n){
  if(n<0) return "negative";
  if(n===0) return "zero";
  if(n<=9) return "small";
  if(n<=99) return "medium";
  return "large";
}
[[-5,"negative"],[0,"zero"],[7,"small"],[42,"medium"],[1000,"large"]].forEach(([n,e])=>console.log(classify(n)));`,
          reference_solution: `function classify(n){if(n<0)return"negative";if(n===0)return"zero";if(n<=9)return"small";if(n<=99)return"medium";return"large";}
[[-5,"negative"],[0,"zero"],[7,"small"],[42,"medium"],[1000,"large"]].forEach(([n])=>console.log(classify(n)));`,
          hints: ['Check each range in order'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `negative`, expected_output: `negative` },
            { description: `zero`, expected_output: `zero` },
            { description: `small`, expected_output: `small` },
            { description: `medium`, expected_output: `medium` },
            { description: `large`, expected_output: `large` },
          ],
        },
        {
          id: "rust-u1-l4",
          unit_id: "rust-u1",
          track_id: "rust",
          type: "challenge",
          title: "Rust Boss: Iterator Chain",
          explanation_md: `## Boss: Implement Iterator Methods

Rust iterators are lazy and composable:

\`\`\`rust
let sum: i32 = (1..=10)
    .filter(|n| n % 2 == 0)
    .map(|n| n * n)
    .sum();  // 220
\`\`\`

Write \`sumOfSquaresOfEvens(max)\` — sum of squares of even numbers from 1 to max.`,
          starter_code: `function sumOfSquaresOfEvens(max) {
  let sum = 0;
  for (let i = 2; i <= max; i += 2) sum += i * i;
  return sum;
}
console.log(sumOfSquaresOfEvens(10));
console.log(sumOfSquaresOfEvens(6));`,
          reference_solution: `function sumOfSquaresOfEvens(max){let s=0;for(let i=2;i<=max;i+=2)s+=i*i;return s;}
console.log(sumOfSquaresOfEvens(10));
console.log(sumOfSquaresOfEvens(6));`,
          hints: ['Step by 2 starting from 2'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `1-10: 220`, expected_output: `220` },
            { description: `1-6: 56`, expected_output: `56` },
          ],
        },
      ],
    },
    {
      id: "rust-u2",
      track_id: "rust",
      title: "Rust Unit 2",
      description: `Core Rust concepts`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "rust-u2-l1",
          unit_id: "rust-u2",
          track_id: "rust",
          type: "concept",
          title: "Error Handling with Result",
          explanation_md: `## Result<T, E>: Safe Error Handling

\`\`\`rust
use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.parse::<i32>()?;  // ? propagates error
    Ok(n * 2)
}

match parse_and_double("5") {
    Ok(v) => println!("Result: {}", v),
    Err(e) => println!("Error: {}", e),
}
\`\`\`
### Challenge
Write \`parseAndDouble(s)\` returning the number×2 or \`"Error: invalid input"\`.`,
          starter_code: `function parseAndDouble(s){
  const n=parseInt(s);
  if(isNaN(n)) return "Error: invalid input";
  return n*2;
}
console.log(parseAndDouble("5"));
console.log(parseAndDouble("abc"));
console.log(parseAndDouble("-3"));`,
          reference_solution: `function parseAndDouble(s){const n=parseInt(s);return isNaN(n)?"Error: invalid input":n*2;}
console.log(parseAndDouble("5"));
console.log(parseAndDouble("abc"));
console.log(parseAndDouble("-3"));`,
          hints: ['Check isNaN after parseInt'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `5*2=10`, expected_output: `10` },
            { description: `invalid`, expected_output: `Error: invalid input` },
            { description: `-3*2=-6`, expected_output: `-6` },
          ],
        },
        {
          id: "rust-u2-l2",
          unit_id: "rust-u2",
          track_id: "rust",
          type: "concept",
          title: "Traits",
          explanation_md: `## Rust Traits: Shared Behavior

\`\`\`rust
trait Describable {
    fn describe(&self) -> String;
    fn short_desc(&self) -> String {
        self.describe().chars().take(20).collect()
    }
}

struct Book { title: String, pages: u32 }
impl Describable for Book {
    fn describe(&self) -> String {
        format!("{} ({} pages)", self.title, self.pages)
    }
}
\`\`\`
### Challenge
Write \`createDescribable(title, pages)\` with \`describe()\` and \`shortDesc()\` (first 20 chars).`,
          starter_code: `function createDescribable(title,pages){
  return {
    describe(){return title + " (" + pages + " pages)";},
    shortDesc(){return this.describe().slice(0,20);},
  };
}
const book=createDescribable("The Rust Programming Language",526);
console.log(book.describe());
console.log(book.shortDesc());`,
          reference_solution: `function createDescribable(title,pages){return{describe(){return title+" ("+pages+" pages)";},shortDesc(){return this.describe().slice(0,20);}};}
const book=createDescribable("The Rust Programming Language",526);
console.log(book.describe());
console.log(book.shortDesc());`,
          hints: ['Use slice(0, 20) for shortDesc'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `Full description`, expected_output: `The Rust Programming Language (526 pages)` },
            { description: `Short (20 chars)`, expected_output: `The Rust Programming` },
          ],
        },
        {
          id: "rust-u2-l3",
          unit_id: "rust-u2",
          track_id: "rust",
          type: "concept",
          title: "Lifetimes",
          explanation_md: `## Lifetimes: Reference Validity

\`\`\`rust
// 'a is a lifetime annotation
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Struct with lifetime
struct ImportantExcerpt<'a> {
    part: &'a str,
}

// Static lifetime: lives for entire program
let s: &'static str = "I have a static lifetime.";
\`\`\`
### Challenge
Write \`longest(a, b)\` returning the longer string (or a if equal).`,
          starter_code: `function longest(a,b){
  return a.length >= b.length ? a : b;
}
console.log(longest("hello","hi"));
console.log(longest("a","bbb"));
console.log(longest("ab","cd"));`,
          reference_solution: `function longest(a,b){return a.length>=b.length?a:b;}
console.log(longest("hello","hi"));
console.log(longest("a","bbb"));
console.log(longest("ab","cd"));`,
          hints: ['Compare lengths with >='],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `hello > hi`, expected_output: `hello` },
            { description: `bbb > a`, expected_output: `bbb` },
            { description: `equal length: first`, expected_output: `ab` },
          ],
        },
        {
          id: "rust-u2-l4",
          unit_id: "rust-u2",
          track_id: "rust",
          type: "challenge",
          title: "Rust Boss: Functional Pipeline",
          explanation_md: `## Boss: Functional Data Processing

Combine Rust's iterator methods into a data pipeline:

\`\`\`rust
let results: Vec<String> = data
    .into_iter()
    .filter(|x| x.score > 50)
    .map(|x| format!("{}: {}", x.name, x.score))
    .collect();
\`\`\`
### Boss
Write \`processData(records)\` — each record is \`{name, score}\`. Filter score > 50, format as \`"NAME: SCORE"\`, sort alphabetically.`,
          starter_code: `function processData(records){
  return records
    .filter(r=>r.score>50)
    .map(r=>r.name+": "+r.score)
    .sort()
    .join("\\n");
}
console.log(processData([
  {name:"Alice",score:95},
  {name:"Bob",score:42},
  {name:"Carol",score:78},
  {name:"Dave",score:51},
]));`,
          reference_solution: `function processData(records){return records.filter(r=>r.score>50).map(r=>r.name+": "+r.score).sort().join("\\n");}
console.log(processData([{name:"Alice",score:95},{name:"Bob",score:42},{name:"Carol",score:78},{name:"Dave",score:51}]));`,
          hints: ['Chain filter, map, sort, join'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice passes`, expected_output: `Alice: 95` },
            { description: `Carol passes`, expected_output: `Carol: 78` },
            { description: `Dave passes`, expected_output: `Dave: 51` },
          ],
        },
      ],
    },
  ],
};
