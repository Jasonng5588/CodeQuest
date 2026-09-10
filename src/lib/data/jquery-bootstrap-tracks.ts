import { StaticTrack } from "./lesson-content";

export const JQUERY_TRACK: StaticTrack = {
  id: "jquery",
  title: "jQuery",
  description: `The classic DOM manipulation library. Still powers millions of websites today.`,
  color: "#0769ad",
  difficulty_curve: "beginner",
  execution_engine: "browser",
  category: "web",
  order_index: 14,
  is_published: true,
  estimated_hours: 8,
  learner_count: 4200,
  units: [
    {
      id: "jq-u1", track_id: "jquery", title: "jQuery Basics", description: "Selectors, DOM manipulation, and events", icon: "zap",order_index: 1,
      lessons: [
        {
          id: "jq-u1-l1", unit_id: "jq-u1", track_id: "jquery", type: "concept", title: "jQuery Selectors",
          explanation_md: `# jQuery Selectors\n\njQuery uses **CSS-style selectors** to find elements:\n\n\`\`\`js\n// Select by ID\n$("#myId")\n\n// Select by class\n$(".myClass")\n\n// Select by tag\n$("p")\n\n// Multiple selectors\n$("h1, h2, h3")\n\`\`\`\n\n## How it Works in Browser\njQuery wraps the native DOM API with a cleaner syntax. \`$(selector)\` returns a jQuery object with methods for manipulation.\n\n## Your Task\nUsing jQuery, select all \`<p>\` elements and log how many there are:\n\`console.log($("p").length)\`\n\nFor this exercise, simulate jQuery's \`$\` with a mock that counts elements:`,
          starter_code: `// Mock jQuery selector that counts elements
// Simulate: $("p").length where there are 3 paragraphs
function $(selector) {
  // Simulate 3 paragraph elements
  if (selector === "p") return { length: 3 };
  if (selector === "#title") return { length: 1 };
  return { length: 0 };
}

// Select all paragraphs and log the count
const paragraphs = $("p");
console.log(paragraphs.length); // should print 3
`,
          reference_solution: `function $(selector) {\n  if (selector === "p") return { length: 3 };\n  if (selector === "#title") return { length: 1 };\n  return { length: 0 };\n}\nconst paragraphs = $("p");\nconsole.log(paragraphs.length);\n`,
          hints: ["Use the $ function like jQuery", 'Call $("p").length to count paragraph elements'],
          test_cases: [{ description: `Prints 3 for paragraph count`, expected_output: `3` }],
          xp_reward: 50, order_index: 1, execution_engine: "browser",
        },
        {
          id: "jq-u1-l2", unit_id: "jq-u1", track_id: "jquery", type: "challenge", title: "DOM Traversal",
          explanation_md: `# jQuery DOM Traversal\n\njQuery provides powerful methods to navigate the DOM tree:\n\n\`\`\`js\n$("ul").children()      // direct children\n$("li").parent()         // parent element\n$("p").siblings()        // same-level siblings\n$("div").find("span")    // descendants\n$("li").first()          // first element\n$("li").last()           // last element\n$("li").eq(2)            // element at index 2\n\`\`\`\n\n## Your Task\nUse traversal logic to find: given a list of 5 items, print the index of the last item (0-based):`,
          starter_code: `// Simulate jQuery traversal
const items = ["Home", "About", "Services", "Portfolio", "Contact"];

// Using array methods to simulate jQuery traversal
function getLast(arr) {
  // Return the last item's index
  return arr.length - 1;
}

console.log(getLast(items)); // Should print 4
`,
          reference_solution: `const items = ["Home", "About", "Services", "Portfolio", "Contact"];\nfunction getLast(arr) { return arr.length - 1; }\nconsole.log(getLast(items));\n`,
          hints: ["The last index is array.length - 1", 'items has 5 elements so last index is 4'],
          test_cases: [{ description: `Prints last index 4`, expected_output: `4` }],
          xp_reward: 75, order_index: 2, execution_engine: "browser",
        },
        {
          id: "jq-u1-l3", unit_id: "jq-u1", track_id: "jquery", type: "challenge", title: "Event Handling",
          explanation_md: `# jQuery Events\n\njQuery simplifies attaching event listeners:\n\n\`\`\`js\n// Click event\n$("button").on("click", function() {\n  console.log("Button clicked!");\n});\n\n// Shorthand\n$("button").click(function() {\n  console.log("Clicked!");\n});\n\n// Multiple events\n$("input").on("focus blur", function(e) {\n  console.log(e.type); // "focus" or "blur"\n});\n\n// Event object\n$("a").on("click", function(e) {\n  e.preventDefault(); // stop default action\n  console.log("Link clicked");\n});\n\`\`\`\n\n## Your Task\nSimulate a click counter — track how many times a button is clicked:`,
          starter_code: `// Simulate jQuery click event
let clickCount = 0;

// Simulate the click handler
function onButtonClick() {
  clickCount++;
  console.log("Clicks: " + clickCount);
}

// Simulate 3 clicks
onButtonClick();
onButtonClick();
onButtonClick();
`,
          reference_solution: `let clickCount = 0;\nfunction onButtonClick() { clickCount++; console.log("Clicks: " + clickCount); }\nonButtonClick();\nonButtonClick();\nonButtonClick();\n`,
          hints: ["Each click increments the counter", 'console.log shows the current count'],
          test_cases: [{ description: `Shows click counts 1, 2, 3`, expected_output: `Clicks: 1\nClicks: 2\nClicks: 3` }],
          xp_reward: 100, order_index: 3, execution_engine: "browser",
        },
        {
          id: "jq-u1-l4", unit_id: "jq-u1", track_id: "jquery", type: "boss", title: "Boss: Event Delegation",
          explanation_md: `# Boss: Event Delegation\n\nEvent delegation is a key jQuery pattern — attach one listener to a parent to handle all children:\n\n\`\`\`js\n// Instead of this (attaches to each li):\n$("li").on("click", handler);\n\n// Do this (one listener on ul, catches all li clicks):\n$("ul").on("click", "li", function() {\n  console.log($(this).text());\n});\n\`\`\`\n\n**Why delegation?** Works for dynamically added elements, better performance.\n\n## Boss Challenge\nSimulate event delegation: process clicks for a dynamically growing list. Count total clicks across all list items:`,
          starter_code: `// Event delegation simulation
const items = ["Apple", "Banana", "Cherry"];
let totalClicks = 0;

// Delegated handler - processes any item click
function handleItemClick(item) {
  totalClicks++;
  console.log("Clicked: " + item + " (total: " + totalClicks + ")");
}

// Simulate clicks on each item
items.forEach(item => handleItemClick(item));

// Add new item dynamically and click it
items.push("Dragonfruit");
handleItemClick("Dragonfruit");

console.log("Total clicks: " + totalClicks);
`,
          reference_solution: `const items = ["Apple","Banana","Cherry"];\nlet totalClicks = 0;\nfunction handleItemClick(item) { totalClicks++; console.log("Clicked: " + item + " (total: " + totalClicks + ")"); }\nitems.forEach(item => handleItemClick(item));\nitems.push("Dragonfruit");\nhandleItemClick("Dragonfruit");\nconsole.log("Total clicks: " + totalClicks);\n`,
          hints: ["Each forEach iteration calls handleItemClick", 'Total should be 4 (3 + 1 new item)'],
          test_cases: [{ description: `Total clicks is 4`, expected_output: `Total clicks: 4` }],
          xp_reward: 300, order_index: 4, execution_engine: "browser",
        },
      ],
    },
    {
      id: "jq-u2", track_id: "jquery", title: "AJAX & Effects", description: "Animations, AJAX requests, and DOM manipulation", icon: "zap",order_index: 2,
      lessons: [
        {
          id: "jq-u2-l1", unit_id: "jq-u2", track_id: "jquery", type: "concept", title: "jQuery Effects",
          explanation_md: `# jQuery Effects & Animations\n\njQuery provides built-in animation methods:\n\n\`\`\`js\n$("div").hide();           // instantly hide\n$("div").show();           // instantly show\n$("div").toggle();         // toggle visibility\n\n$("div").fadeIn(400);      // fade in over 400ms\n$("div").fadeOut("slow");  // fade out slowly\n\n$("div").slideDown();      // slide into view\n$("div").slideUp();        // slide out of view\n\n// Animate custom properties\n$("div").animate({\n  opacity: 0.5,\n  left: "+=50px",\n}, 500);\n\n// Chaining\n$("div").fadeOut(400).fadeIn(400).slideDown();\n\`\`\`\n\n## Your Task\nSimulate an animation sequence — log the state after each step:`,
          starter_code: `// Simulate jQuery animation states
let visible = true;

function hide() { visible = false; console.log("State: hidden"); }
function show() { visible = true; console.log("State: visible"); }
function toggle() { if (visible) hide(); else show(); }

// Run animation sequence
show();
hide();
toggle(); // should show
toggle(); // should hide
console.log("Final: " + (visible ? "visible" : "hidden"));
`,
          reference_solution: `let visible = true;\nfunction hide() { visible = false; console.log("State: hidden"); }\nfunction show() { visible = true; console.log("State: visible"); }\nfunction toggle() { if (visible) hide(); else show(); }\nshow();\nhide();\ntoggle();\ntoggle();\nconsole.log("Final: " + (visible ? "visible" : "hidden"));\n`,
          hints: ["start: visible=true, show=visible, hide=hidden", 'toggle flips the state'],
          test_cases: [{ description: `Final state is hidden`, expected_output: `Final: hidden` }],
          xp_reward: 75, order_index: 1, execution_engine: "browser",
        },
        {
          id: "jq-u2-l2", unit_id: "jq-u2", track_id: "jquery", type: "challenge", title: "AJAX with $.ajax()",
          explanation_md: `# jQuery AJAX\n\njQuery simplifies HTTP requests:\n\n\`\`\`js\n// GET request\n$.get("/api/users", function(data) {\n  console.log(data);\n});\n\n// POST request\n$.post("/api/save", { name: "Alice" }, function(res) {\n  console.log(res);\n});\n\n// Full $.ajax() call\n$.ajax({\n  url: "/api/data",\n  method: "GET",\n  success: function(data) { console.log("Got:", data); },\n  error: function(xhr) { console.log("Error:", xhr.status); },\n});\n\`\`\`\n\n## Your Task\nSimulate an AJAX success/error handler:`,
          starter_code: `// Simulate $.ajax with success/error callbacks
function mockAjax({ url, method, success, error }) {
  // Simulate: /api/users succeeds, anything else fails
  if (url === "/api/users") {
    const fakeData = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
    success(fakeData);
  } else {
    error({ status: 404, message: "Not found" });
  }
}

// Make a successful request
mockAjax({
  url: "/api/users",
  method: "GET",
  success: function(data) { console.log("Users: " + data.length); },
  error: function(xhr) { console.log("Error: " + xhr.status); },
});

// Make a failing request
mockAjax({
  url: "/api/missing",
  method: "GET",
  success: function(data) { console.log("Got data"); },
  error: function(xhr) { console.log("Error: " + xhr.status); },
});
`,
          reference_solution: `function mockAjax({url,method,success,error}){if(url==="/api/users"){success([{id:1,name:"Alice"},{id:2,name:"Bob"}]);}else{error({status:404});}}\nmockAjax({url:"/api/users",method:"GET",success:d=>console.log("Users: "+d.length),error:e=>console.log("Error: "+e.status)});\nmockAjax({url:"/api/missing",method:"GET",success:()=>{},error:e=>console.log("Error: "+e.status)});\n`,
          hints: ["/api/users returns 2 users", '/api/missing returns status 404'],
          test_cases: [{ description: `Success prints 2 users, error prints 404`, expected_output: `Users: 2\nError: 404` }],
          xp_reward: 125, order_index: 2, execution_engine: "browser",
        },
        {
          id: "jq-u2-l3", unit_id: "jq-u2", track_id: "jquery", type: "challenge", title: "DOM Manipulation",
          explanation_md: `# jQuery DOM Manipulation\n\nCreate, add, modify, and remove elements:\n\n\`\`\`js\n// Create element\n$("<li>").text("New item").appendTo("ul");\n\n// Modify content\n$("h1").text("New Title");\n$("div").html("<strong>Bold</strong>");\n\n// Attributes\n$("img").attr("src", "photo.jpg");\n$("a").attr("href", "https://example.com");\n\n// CSS classes\n$("div").addClass("active");\n$("div").removeClass("hidden");\n$("div").toggleClass("open");\n\n// Styles\n$("p").css("color", "red");\n$("div").css({ background: "blue", padding: "10px" });\n\n// Remove\n$("p.old").remove();\n\`\`\`\n\n## Your Task\nBuild a simple list manager — add and remove items:`,
          starter_code: `// DOM manipulation simulation
const list = [];

function addItem(text) {
  list.push(text);
  console.log("Added: " + text);
}

function removeItem(index) {
  const removed = list.splice(index, 1)[0];
  console.log("Removed: " + removed);
}

function showList() {
  console.log("List: " + list.join(", "));
}

addItem("Apple");
addItem("Banana");
addItem("Cherry");
showList();
removeItem(1); // Remove Banana
showList();
`,
          reference_solution: `const list=[];\nfunction addItem(t){list.push(t);console.log("Added: "+t);}\nfunction removeItem(i){const r=list.splice(i,1)[0];console.log("Removed: "+r);}\nfunction showList(){console.log("List: "+list.join(", "));}\naddItem("Apple");addItem("Banana");addItem("Cherry");\nshowList();\nremoveItem(1);\nshowList();\n`,
          hints: ["addItem pushes to array", 'removeItem uses splice to remove by index'],
          test_cases: [{ description: `Final list is Apple, Cherry`, expected_output: `List: Apple, Cherry` }],
          xp_reward: 125, order_index: 3, execution_engine: "browser",
        },
        {
          id: "jq-u2-l4", unit_id: "jq-u2", track_id: "jquery", type: "boss", title: "Boss: jQuery Plugin",
          explanation_md: `# Boss: Write a jQuery Plugin\n\nCustom jQuery plugins extend the jQuery prototype:\n\n\`\`\`js\n// Plugin definition\n$.fn.highlight = function(color) {\n  return this.css("background-color", color || "yellow");\n};\n\n// Usage\n$("p").highlight();\n$(".error").highlight("red");\n\`\`\`\n\nKey rules:\n1. Attach to \`$.fn\` (the jQuery prototype)\n2. Return \`this\` to enable chaining\n3. Accept options as parameter\n\n## Boss Challenge\nCreate a counter plugin that tracks call count on each element:`,
          starter_code: `// Simulate jQuery plugin system
const jQueryPrototype = {
  elements: [],
  callCounts: {},
};

// Plugin: $.fn.counter
function createPlugin(elements) {
  const obj = { elements };
  
  obj.counter = function() {
    this.elements.forEach(el => {
      jQueryPrototype.callCounts[el] = (jQueryPrototype.callCounts[el] || 0) + 1;
    });
    return this; // enable chaining
  };
  
  obj.getCount = function(el) {
    return jQueryPrototype.callCounts[el] || 0;
  };
  
  return obj;
}

// Test plugin
const $div1 = createPlugin(["div1"]);
const $div2 = createPlugin(["div2"]);

$div1.counter().counter(); // called twice
$div2.counter();           // called once

console.log("div1 count: " + $div1.getCount("div1"));
console.log("div2 count: " + $div2.getCount("div2"));
`,
          reference_solution: `const jQueryPrototype={elements:[],callCounts:{}};\nfunction createPlugin(elements){const obj={elements};obj.counter=function(){this.elements.forEach(el=>{jQueryPrototype.callCounts[el]=(jQueryPrototype.callCounts[el]||0)+1;});return this;};obj.getCount=function(el){return jQueryPrototype.callCounts[el]||0;};return obj;}\nconst $div1=createPlugin(["div1"]);const $div2=createPlugin(["div2"]);\n$div1.counter().counter();$div2.counter();\nconsole.log("div1 count: "+$div1.getCount("div1"));\nconsole.log("div2 count: "+$div2.getCount("div2"));\n`,
          hints: ["counter() increments the count for each element", 'chaining works because counter() returns this'],
          test_cases: [{ description: `div1 count is 2, div2 count is 1`, expected_output: `div1 count: 2\ndiv2 count: 1` }],
          xp_reward: 350, order_index: 4, execution_engine: "browser",
        },
      ],
    },
  ],
};

export const BOOTSTRAP_TRACK: StaticTrack = {
  id: "bootstrap",
  title: "Bootstrap",
  description: `Responsive design made easy. Grid system, components, and utilities.`,
  color: "#7952b3",
  difficulty_curve: "beginner",
  execution_engine: "browser",
  category: "web",
  order_index: 15,
  is_published: true,
  estimated_hours: 6,
  learner_count: 6800,
  units: [
    {
      id: "bs-u1", track_id: "bootstrap", title: "Bootstrap Grid", description: "Responsive 12-column grid system", icon: "layers",order_index: 1,
      lessons: [
        {
          id: "bs-u1-l1", unit_id: "bs-u1", track_id: "bootstrap", type: "concept", title: "Grid System Basics",
          explanation_md: `# Bootstrap Grid System\n\nBootstrap uses a **12-column responsive grid**:\n\n\`\`\`html\n<div class="container">\n  <div class="row">\n    <div class="col-4">One Third</div>\n    <div class="col-4">One Third</div>\n    <div class="col-4">One Third</div>\n  </div>\n</div>\n\`\`\`\n\n## Breakpoints\n| Class | Breakpoint | Size |\n|-------|-----------|------|\n| col-  | < 576px   | xs   |\n| col-sm- | ≥ 576px | sm |\n| col-md- | ≥ 768px | md |\n| col-lg- | ≥ 992px | lg |\n| col-xl- | ≥ 1200px | xl |\n\n## Your Task\nCalculate: if you have 3 equal columns in a 12-column grid, what is each column width?`,
          starter_code: `// Bootstrap grid calculation
const totalColumns = 12;
const numberOfColumns = 3;

// Calculate column span
const colSpan = totalColumns / numberOfColumns;
console.log("Column span: col-" + colSpan);

// Calculate percentage width
const widthPct = (colSpan / totalColumns) * 100;
console.log("Width: " + widthPct + "%");
`,
          reference_solution: `const totalColumns=12;\nconst numberOfColumns=3;\nconst colSpan=totalColumns/numberOfColumns;\nconsole.log("Column span: col-"+colSpan);\nconst widthPct=(colSpan/totalColumns)*100;\nconsole.log("Width: "+widthPct+"%");\n`,
          hints: ["12 / 3 = 4 columns each", '4/12 * 100 = 33.33...%'],
          test_cases: [{ description: `Shows col-4 and 33.33%`, expected_output: `Column span: col-4\nWidth: 33.333333333333336%` }],
          xp_reward: 50, order_index: 1, execution_engine: "browser",
        },
        {
          id: "bs-u1-l2", unit_id: "bs-u1", track_id: "bootstrap", type: "challenge", title: "Responsive Breakpoints",
          explanation_md: `# Bootstrap Responsive Classes\n\nColumns can change size at different breakpoints:\n\n\`\`\`html\n<!-- Full width on mobile, half on tablet, quarter on desktop -->\n<div class="col-12 col-md-6 col-lg-3">Content</div>\n\`\`\`\n\n## Common Patterns\n\`\`\`html\n<!-- Two equal columns, stack on mobile -->\n<div class="col-12 col-md-6">Left</div>\n<div class="col-12 col-md-6">Right</div>\n\n<!-- 3-column layout -->\n<div class="col-12 col-md-4">1</div>\n<div class="col-12 col-md-4">2</div>\n<div class="col-12 col-md-4">3</div>\n\`\`\`\n\n## Your Task\nGiven a layout description, output the correct Bootstrap class:`,
          starter_code: `// Bootstrap responsive class generator
function getBootstrapClass(mobile, tablet, desktop) {
  const classes = [];
  if (mobile) classes.push("col-" + mobile);
  if (tablet) classes.push("col-md-" + tablet);
  if (desktop) classes.push("col-lg-" + desktop);
  return classes.join(" ");
}

// Full-width mobile, half tablet, third desktop
console.log(getBootstrapClass(12, 6, 4));

// Full-width mobile, full tablet, half desktop
console.log(getBootstrapClass(12, 12, 6));
`,
          reference_solution: `function getBootstrapClass(m,t,d){const c=[];if(m)c.push("col-"+m);if(t)c.push("col-md-"+t);if(d)c.push("col-lg-"+d);return c.join(" ");}\nconsole.log(getBootstrapClass(12,6,4));\nconsole.log(getBootstrapClass(12,12,6));\n`,
          hints: ["Build the class string from the three breakpoints", 'Separate classes with spaces'],
          test_cases: [{ description: `First layout is col-12 col-md-6 col-lg-4`, expected_output: `col-12 col-md-6 col-lg-4\ncol-12 col-md-12 col-lg-6` }],
          xp_reward: 100, order_index: 2, execution_engine: "browser",
        },
        {
          id: "bs-u1-l3", unit_id: "bs-u1", track_id: "bootstrap", type: "challenge", title: "Offset and Order",
          explanation_md: `# Bootstrap Offset & Order\n\n## Offset\nShift columns right using \`offset-*\`:\n\n\`\`\`html\n<!-- Center a 6-col element -->\n<div class="col-6 offset-3">Centered</div>\n\n<!-- Push right by 2 columns -->\n<div class="col-4 offset-2">Offset</div>\n\`\`\`\n\n## Order\nReorder columns visually with \`order-*\`:\n\n\`\`\`html\n<div class="col order-3">First in HTML, third visually</div>\n<div class="col order-1">Second in HTML, first visually</div>\n<div class="col order-2">Third in HTML, second visually</div>\n\`\`\`\n\n## Your Task\nCalculate the total column space used including offset:`,
          starter_code: `// Bootstrap layout calculator
function layoutWidth(colSpan, offset) {
  const total = colSpan + offset;
  const remaining = 12 - total;
  console.log("Col: " + colSpan + ", Offset: " + offset);
  console.log("Total used: " + total + " of 12");
  console.log("Remaining: " + remaining);
  return total;
}

layoutWidth(6, 3); // centered 6-col with offset-3
layoutWidth(4, 2); // 4-col with offset-2
`,
          reference_solution: `function layoutWidth(c,o){const t=c+o;const r=12-t;console.log("Col: "+c+", Offset: "+o);console.log("Total used: "+t+" of 12");console.log("Remaining: "+r);return t;}\nlayoutWidth(6,3);\nlayoutWidth(4,2);\n`,
          hints: ["Total = colSpan + offset", 'Remaining = 12 - total'],
          test_cases: [{ description: `Centered 6-col uses 9 of 12`, expected_output: `Total used: 9 of 12` }],
          xp_reward: 100, order_index: 3, execution_engine: "browser",
        },
        {
          id: "bs-u1-l4", unit_id: "bs-u1", track_id: "bootstrap", type: "boss", title: "Boss: Responsive Layout",
          explanation_md: `# Boss: Design a Responsive Layout\n\nBuild a layout system that generates Bootstrap class strings for different screen sizes:\n\n\`\`\`html\n<!-- Card grid: 1 col mobile, 2 col tablet, 3 col desktop -->\n<div class="col-12 col-sm-6 col-lg-4">Card</div>\n\`\`\`\n\n## Boss Challenge\nBuild a function that generates the complete Bootstrap class string for a card grid with n cards per row at each breakpoint:`,
          starter_code: `// Bootstrap card grid class generator
function cardGrid(mobile, sm, md, lg) {
  const classes = [];
  classes.push("col-" + (12 / mobile));
  if (sm) classes.push("col-sm-" + (12 / sm));
  if (md) classes.push("col-md-" + (12 / md));
  if (lg) classes.push("col-lg-" + (12 / lg));
  return classes.join(" ");
}

// 1 column mobile, 2 sm, 3 md, 4 lg
console.log(cardGrid(1, 2, 3, 4));

// 1 mobile, 2 tablet, 3 desktop
console.log(cardGrid(1, null, 2, 3));
`,
          reference_solution: `function cardGrid(m,sm,md,lg){const c=[];c.push("col-"+(12/m));if(sm)c.push("col-sm-"+(12/sm));if(md)c.push("col-md-"+(12/md));if(lg)c.push("col-lg-"+(12/lg));return c.join(" ");}\nconsole.log(cardGrid(1,2,3,4));\nconsole.log(cardGrid(1,null,2,3));\n`,
          hints: ["12 / cardsPerRow = columns per card", 'null breakpoints are skipped'],
          test_cases: [{ description: `First grid is col-12 col-sm-6 col-md-4 col-lg-3`, expected_output: `col-12 col-sm-6 col-md-4 col-lg-3\ncol-12 col-md-6 col-lg-4` }],
          xp_reward: 350, order_index: 4, execution_engine: "browser",
        },
      ],
    },
    {
      id: "bs-u2", track_id: "bootstrap", title: "Components & Utilities", description: "Buttons, cards, navbars, and utility classes", icon: "layers",order_index: 2,
      lessons: [
        {
          id: "bs-u2-l1", unit_id: "bs-u2", track_id: "bootstrap", type: "concept", title: "Bootstrap Components",
          explanation_md: `# Bootstrap Components\n\nBootstrap includes ready-made UI components:\n\n## Buttons\n\`\`\`html\n<button class="btn btn-primary">Primary</button>\n<button class="btn btn-secondary">Secondary</button>\n<button class="btn btn-danger">Danger</button>\n<button class="btn btn-lg btn-success">Large</button>\n<button class="btn btn-sm btn-outline-dark">Small Outline</button>\n\`\`\`\n\n## Cards\n\`\`\`html\n<div class="card" style="width: 18rem;">\n  <img src="img.jpg" class="card-img-top">\n  <div class="card-body">\n    <h5 class="card-title">Title</h5>\n    <p class="card-text">Some text.</p>\n    <a href="#" class="btn btn-primary">Go</a>\n  </div>\n</div>\n\`\`\`\n\n## Your Task\nGenerate button class names based on type and size:`,
          starter_code: `// Bootstrap button class generator
function btnClass(variant, size, outline) {
  const parts = ["btn"];
  const prefix = outline ? "btn-outline-" : "btn-";
  parts.push(prefix + variant);
  if (size === "lg") parts.push("btn-lg");
  if (size === "sm") parts.push("btn-sm");
  return parts.join(" ");
}

console.log(btnClass("primary", null, false));  // btn btn-primary
console.log(btnClass("danger", "lg", false));   // btn btn-danger btn-lg
console.log(btnClass("dark", "sm", true));      // btn btn-outline-dark btn-sm
`,
          reference_solution: `function btnClass(v,s,o){const p=["btn"];p.push((o?"btn-outline-":"btn-")+v);if(s==="lg")p.push("btn-lg");if(s==="sm")p.push("btn-sm");return p.join(" ");}\nconsole.log(btnClass("primary",null,false));\nconsole.log(btnClass("danger","lg",false));\nconsole.log(btnClass("dark","sm",true));\n`,
          hints: ["Outline buttons use btn-outline-variant", 'Size is appended as btn-lg or btn-sm'],
          test_cases: [{ description: `First button is btn btn-primary`, expected_output: `btn btn-primary\nbtn btn-danger btn-lg\nbtn btn-outline-dark btn-sm` }],
          xp_reward: 75, order_index: 1, execution_engine: "browser",
        },
        {
          id: "bs-u2-l2", unit_id: "bs-u2", track_id: "bootstrap", type: "challenge", title: "Utility Classes",
          explanation_md: `# Bootstrap Utilities\n\nUtility classes for spacing, text, display, and more:\n\n## Spacing\n\`\`\`html\n<!-- Margin/padding: p=padding, m=margin, t/b/l/r/x/y = sides -->\n<div class="mt-3 mb-2 px-4 py-2">Spaced</div>\n<!-- Scale 0-5: 0=0, 1=4px, 2=8px, 3=16px, 4=24px, 5=48px -->\n\`\`\`\n\n## Display\n\`\`\`html\n<div class="d-none d-md-block">Hidden on mobile</div>\n<div class="d-flex align-items-center justify-content-between">Flex</div>\n\`\`\`\n\n## Text\n\`\`\`html\n<p class="text-center text-primary fw-bold fs-3">Text</p>\n<p class="text-muted text-truncate">Long text...</p>\n\`\`\`\n\n## Your Task\nGenerate spacing utility classes from pixel values:`,
          starter_code: `// Bootstrap spacing utility generator
// Bootstrap spacing scale: 0=0, 1=4, 2=8, 3=16, 4=24, 5=48 (px)
const spacingScale = [0, 4, 8, 16, 24, 48];

function getSpacingClass(type, side, pixels) {
  const level = spacingScale.indexOf(pixels);
  if (level === -1) return "invalid";
  const sideChar = side === "all" ? "" : side[0]; // t, b, l, r, x, y
  return type + sideChar + "-" + level;
}

console.log(getSpacingClass("m", "top", 16));    // mt-3
console.log(getSpacingClass("p", "all", 8));     // p-2
console.log(getSpacingClass("m", "x", 24));      // mx-4
`,
          reference_solution: `const spacingScale=[0,4,8,16,24,48];\nfunction getSpacingClass(t,s,p){const l=spacingScale.indexOf(p);if(l===-1)return "invalid";const sc=s==="all"?"":s[0];return t+sc+"-"+l;}\nconsole.log(getSpacingClass("m","top",16));\nconsole.log(getSpacingClass("p","all",8));\nconsole.log(getSpacingClass("m","x",24));\n`,
          hints: ["Level 3 = 16px", "No side char for 'all'"],
          test_cases: [{ description: `mt-3, p-2, mx-4`, expected_output: `mt-3\np-2\nmx-4` }],
          xp_reward: 100, order_index: 2, execution_engine: "browser",
        },
        {
          id: "bs-u2-l3", unit_id: "bs-u2", track_id: "bootstrap", type: "challenge", title: "Navbar & Collapse",
          explanation_md: `# Bootstrap Navbar\n\nCreate a responsive navigation bar:\n\n\`\`\`html\n<nav class="navbar navbar-expand-lg navbar-dark bg-dark">\n  <div class="container">\n    <a class="navbar-brand" href="#">Brand</a>\n    <button class="navbar-toggler" data-bs-toggle="collapse"\n            data-bs-target="#navMenu">\n      <span class="navbar-toggler-icon"></span>\n    </button>\n    <div class="collapse navbar-collapse" id="navMenu">\n      <ul class="navbar-nav ms-auto">\n        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>\n        <li class="nav-item"><a class="nav-link active" href="#">About</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n\`\`\`\n\n## Your Task\nSimulate navbar toggle state management:`,
          starter_code: `// Navbar collapse simulation
let isExpanded = false;

function toggleNav() {
  isExpanded = !isExpanded;
  console.log("Nav: " + (isExpanded ? "expanded" : "collapsed"));
}

function setActive(links, activeIndex) {
  return links.map((link, i) => ({
    text: link,
    active: i === activeIndex
  }));
}

// Simulate navbar behavior
toggleNav(); // expand
toggleNav(); // collapse
toggleNav(); // expand again

const navLinks = setActive(["Home", "About", "Contact"], 1);
navLinks.forEach(l => console.log(l.text + (l.active ? " (active)" : "")));
`,
          reference_solution: `let isExpanded=false;\nfunction toggleNav(){isExpanded=!isExpanded;console.log("Nav: "+(isExpanded?"expanded":"collapsed"));}\nfunction setActive(l,a){return l.map((t,i)=>({text:t,active:i===a}));}\ntoggleNav();toggleNav();toggleNav();\nconst nav=setActive(["Home","About","Contact"],1);\nnav.forEach(l=>console.log(l.text+(l.active?" (active)":"")));\n`,
          hints: ["Toggle flips isExpanded each time", 'Active item is at index 1 (About)'],
          test_cases: [{ description: `About shows as active`, expected_output: `About (active)` }],
          xp_reward: 125, order_index: 3, execution_engine: "browser",
        },
        {
          id: "bs-u2-l4", unit_id: "bs-u2", track_id: "bootstrap", type: "boss", title: "Boss: Complete Dashboard",
          explanation_md: `# Boss: Bootstrap Dashboard Layout\n\nDesign a complete dashboard layout using Bootstrap classes.\n\nA typical dashboard has:\n- Navbar at top (sticky)\n- Sidebar (col-2 on desktop, hidden on mobile)\n- Main content area (col-10)\n- Card grid for stats\n- Responsive table\n\n## Boss Challenge\nGenerate the complete class structure for a responsive dashboard:`,
          starter_code: `// Bootstrap dashboard class generator
function dashboardClasses() {
  return {
    wrapper: "d-flex flex-column min-vh-100",
    navbar: "navbar navbar-dark bg-dark sticky-top",
    sidebar: "col-md-2 d-none d-md-block bg-light",
    main: "col-md-10 p-4",
    statCard: "card shadow-sm mb-4",
    statCardBody: "card-body d-flex align-items-center",
    table: "table table-striped table-hover",
    tableWrapper: "table-responsive",
  };
}

const classes = dashboardClasses();
console.log("Sidebar: " + classes.sidebar);
console.log("Main: " + classes.main);
console.log("Card: " + classes.statCard);

// Verify responsive sidebar
const hasSidebarHide = classes.sidebar.includes("d-none d-md-block");
console.log("Sidebar hidden on mobile: " + hasSidebarHide);
`,
          reference_solution: `function dashboardClasses(){return{wrapper:"d-flex flex-column min-vh-100",navbar:"navbar navbar-dark bg-dark sticky-top",sidebar:"col-md-2 d-none d-md-block bg-light",main:"col-md-10 p-4",statCard:"card shadow-sm mb-4",statCardBody:"card-body d-flex align-items-center",table:"table table-striped table-hover",tableWrapper:"table-responsive"};}\nconst classes=dashboardClasses();\nconsole.log("Sidebar: "+classes.sidebar);\nconsole.log("Main: "+classes.main);\nconsole.log("Card: "+classes.statCard);\nconsole.log("Sidebar hidden on mobile: "+classes.sidebar.includes("d-none d-md-block"));\n`,
          hints: ["d-none d-md-block hides on mobile, shows on md+", 'col-md-2 and col-md-10 make a 2:10 split'],
          test_cases: [{ description: `Sidebar hidden on mobile is true`, expected_output: `Sidebar hidden on mobile: true` }],
          xp_reward: 400, order_index: 4, execution_engine: "browser",
        },
      ],
    },
  ],
};
