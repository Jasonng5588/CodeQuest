/**
 * HTML & CSS Tracks — Complete lesson content
 * HTML: 4 units × 4 lessons  |  CSS: 4 units × 4 lessons
 * execution_engine: "browser" (rendered in iframe)
 *
 * NOTE: These are browser-rendered tracks. The code editor
 * shows HTML/CSS which is rendered live. Test cases check
 * for specific strings in the output/console.
 */
import type { StaticTrack } from "./lesson-content";

// ============================================================
// HTML Track
// ============================================================
export const HTML_TRACK: StaticTrack = {
  id: "html",
  title: "HTML",
  description: `The skeleton of every webpage. Learn to structure content with semantic HTML5 elements.`,
  color: "#e34c26",
  difficulty_curve: "beginner",
  execution_engine: "browser",
  category: "fundamentals",
  order_index: 1,
  is_published: true,
  estimated_hours: 8,
  learner_count: 12500,
  units: [
    // ─── Unit 1: HTML Basics ──────────────────────────────────
    {
      id: "html-u1",
      track_id: "html",
      title: "HTML Basics",
      description: `Structure your first webpage with tags and elements`,
      icon: "book",
      order_index: 1,
      lessons: [
        {
          id: "html-u1-l1",
          unit_id: "html-u1",
          track_id: "html",
          type: "concept",
          title: "Your First HTML Page",
          explanation_md: `# Your First HTML Page

HTML (**HyperText Markup Language**) uses **tags** to structure content:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\`

**Key concepts:**
- Tags come in pairs: \`<h1>\` opens, \`</h1>\` closes
- \`<head>\` = metadata (not visible)
- \`<body>\` = visible content

## Your Task
The code below uses \`console.log\` to simulate checking your HTML.
Change the \`title\` variable to \`"My First Page"\` and the \`heading\` to \`"Welcome to HTML!"\`.`,
          starter_code: `// Simulate an HTML page structure\nconst title = "My Page";\nconst heading = "Hello";\n\nconsole.log("Title: " + title);\nconsole.log("Heading: " + heading);\n`,
          reference_solution: `const title = "My First Page";\nconst heading = "Welcome to HTML!";\n\nconsole.log("Title: " + title);\nconsole.log("Heading: " + heading);\n`,
          hints: ["Change the string assigned to title", "Change the string assigned to heading", "Keep the console.log lines unchanged", ],
          test_cases: [
            { description: `Title is correct`, expected_output: `Title: My First Page` },
            { description: `Heading is correct`, expected_output: `Heading: Welcome to HTML!` },
          ],
          xp_reward: 50,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "html-u1-l2",
          unit_id: "html-u1",
          track_id: "html",
          type: "challenge",
          title: "Headings & Paragraphs",
          explanation_md: `# Headings & Paragraphs

HTML has **6 heading levels** and **paragraphs**:

\`\`\`html
<h1>Main Title (biggest)</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Smaller</h5>
<h6>Smallest</h6>

<p>This is a paragraph. HTML ignores extra
   whitespace and line breaks.</p>
\`\`\`

Use only **one \`<h1>\`** per page — it's important for SEO!

## Your Task
Build a blog post structure. Create:
1. An h1: \`"My Blog"\`
2. An h2: \`"First Post"\`
3. A paragraph: \`"This is my first blog post."\`

Output the tag names in order using console.log:`,
          starter_code: `// Output the HTML structure as tag names\nconst elements = [];\n\n// Add: "h1", "h2", "p" in order\n\nelements.forEach(tag => console.log(tag));\n`,
          reference_solution: `const elements = ["h1", "h2", "p"];\nelements.forEach(tag => console.log(tag));\n`,
          hints: ["Add three strings to the elements array", "The order matters: h1, h2, p", "Don't change the forEach loop", ],
          test_cases: [
            { description: `h1 comes first`, expected_output: `h1` },
            { description: `h2 comes second`, expected_output: `h2` },
            { description: `p comes third`, expected_output: `p` },
          ],
          xp_reward: 75,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "html-u1-l3",
          unit_id: "html-u1",
          track_id: "html",
          type: "challenge",
          title: "Lists",
          explanation_md: `# Lists

HTML has two types of lists:

**Unordered list** (bullets):
\`\`\`html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Mango</li>
</ul>
\`\`\`

**Ordered list** (numbered):
\`\`\`html
<ol>
  <li>Wake up</li>
  <li>Brush teeth</li>
  <li>Code</li>
</ol>
\`\`\`

Each item goes in an \`<li>\` (list item) tag.

## Your Task
You're building a shopping list. Write a function that returns the list items in the correct format \`"li: item"\`.`,
          starter_code: `function buildList(items) {\n  // Return an array of strings formatted as "li: item"\n  return [];\n}\n\nconst items = ["Milk", "Eggs", "Bread"];\nconst result = buildList(items);\nresult.forEach(s => console.log(s));\n`,
          reference_solution: `function buildList(items) {\n  return items.map(item => "li: " + item);\n}\n\nconst items = ["Milk", "Eggs", "Bread"];\nconst result = buildList(items);\nresult.forEach(s => console.log(s));\n`,
          hints: ["Use .map() to transform each item", "Prepend 'li: ' to each item string", "Return the mapped array"],
          test_cases: [
            { description: `First item formatted correctly`, expected_output: `li: Milk` },
            { description: `Second item formatted correctly`, expected_output: `li: Eggs` },
            { description: `Third item formatted correctly`, expected_output: `li: Bread` },
          ],
          xp_reward: 100,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "html-u1-l4",
          unit_id: "html-u1",
          track_id: "html",
          type: "boss",
          title: "Boss: HTML Element Builder",
          explanation_md: `# Boss: HTML Element Builder

Build a function that generates HTML tag strings!

Write \`createElement(tag, content, attrs)\` that returns an HTML tag string:
- \`createElement("h1", "Hello")\` → \`"<h1>Hello</h1>"\`
- \`createElement("a", "Click me", {href: "https://example.com"})\` → \`"<a href=\"https://example.com\">Click me</a>"\`
- \`createElement("p", "Text", {class: "intro", id: "main"})\` → \`"<p class=\"intro\" id=\"main\">Text</p>"\``,
          starter_code: `function createElement(tag, content, attrs = {}) {\n  // Build an HTML tag string with optional attributes\n}\n\nconsole.log(createElement("h1", "Hello"));\nconsole.log(createElement("p", "World", {class: "intro"}));\nconsole.log(createElement("a", "Click", {href: "https://example.com", target: "_blank"}));\n`,
          reference_solution: `function createElement(tag, content, attrs = {}) {\n  const attrStr = Object.entries(attrs)\n    .map(([key, val]) => \` \${key}="\${val}"\`)\n    .join("");\n  return \`<\${tag}\${attrStr}>\${content}</\${tag}>\`;\n}\n\nconsole.log(createElement("h1", "Hello"));\nconsole.log(createElement("p", "World", {class: "intro"}));\nconsole.log(createElement("a", "Click", {href: "https://example.com", target: "_blank"}));\n`,
          hints: ["Use Object.entries(attrs) to get [key, value] pairs",
            "Map each pair to ' key=\"value\"' with a space before key",
            "Join all attribute strings and embed in the tag",
          ],
          test_cases: [
            { description: `createElement('h1','Hello') output`, expected_output: `<h1>Hello</h1>` },
            { description: `createElement with class attribute`, expected_output: `<p class="intro">World</p>` },
          ],
          xp_reward: 300,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },

    // ─── Unit 2: Links & Images ───────────────────────────────
    {
      id: "html-u2",
      track_id: "html",
      title: "Links & Media",
      description: `Connect pages and embed images and media`,
      icon: "link",
      order_index: 2,
      lessons: [
        {
          id: "html-u2-l1",
          unit_id: "html-u2",
          track_id: "html",
          type: "challenge",
          title: "Anchor Tags (Links)",
          explanation_md: `# Anchor Tags (Links)

The \`<a>\` tag creates hyperlinks:

\`\`\`html
<!-- External link -->
<a href="https://google.com">Go to Google</a>

<!-- Open in new tab -->
<a href="https://github.com" target="_blank">GitHub</a>

<!-- Link to a section on the same page -->
<a href="#contact">Contact Us</a>
\`\`\`

Key attributes:
- \`href\` — the URL (required)
- \`target="_blank"\` — opens in new tab
- \`rel="noopener"\` — security best practice with \`_blank\`

## Your Task
Write \`buildLink(text, url, newTab)\` that returns a formatted link string:
- If \`newTab\` is true, include \`target="_blank"\`
- Otherwise just the href`,
          starter_code: `function buildLink(text, url, newTab = false) {\n  // Return an <a> tag string\n}\n\nconsole.log(buildLink("Google", "https://google.com"));\nconsole.log(buildLink("GitHub", "https://github.com", true));\n`,
          reference_solution: `function buildLink(text, url, newTab = false) {\n  if (newTab) {\n    return \`<a href="\${url}" target="_blank">\${text}</a>\`;\n  }\n  return \`<a href="\${url}">\${text}</a>\`;\n}\n\nconsole.log(buildLink("Google", "https://google.com"));\nconsole.log(buildLink("GitHub", "https://github.com", true));\n`,
          hints: ["Use a template literal to build the string", "Use an if statement to check newTab", "Add target=\"_blank\" attribute when newTab is true"],
          test_cases: [
            { description: `Simple link output`, expected_output: `<a href="https://google.com">Google</a>` },
            { description: `Link with target blank`, expected_output: `<a href="https://github.com" target="_blank">GitHub</a>` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "html-u2-l2",
          unit_id: "html-u2",
          track_id: "html",
          type: "challenge",
          title: "Images",
          explanation_md: `# Images

The \`<img>\` tag embeds images. It's **self-closing** (no end tag):

\`\`\`html
<img src="cat.jpg" alt="A cute cat" width="300" height="200">
\`\`\`

**Important attributes:**
- \`src\` — path to the image (required)
- \`alt\` — alternative text for accessibility (required!)
- \`width\` / \`height\` — dimensions in pixels

## Your Task
Write \`buildImage(src, alt, width)\` that returns an \`<img>\` tag string.`,
          starter_code: `function buildImage(src, alt, width) {\n  // Return an <img> tag string\n}\n\nconsole.log(buildImage("photo.jpg", "A sunset", 640));\nconsole.log(buildImage("logo.png", "Company logo", 120));\n`,
          reference_solution: `function buildImage(src, alt, width) {\n  return '<img src="' + src + '" alt="' + alt + '" width="' + width + '">';\n}\n\nconsole.log(buildImage("photo.jpg", "A sunset", 640));\nconsole.log(buildImage("logo.png", "Company logo", 120));\n`,
          hints: ["Use string concatenation for dynamic values", "The img tag doesn't have a closing tag", "Include src, alt, and width attributes", ],
          test_cases: [
            { description: `Image tag is correct`, expected_output: `<img src="photo.jpg" alt="A sunset" width="640">` },
            { description: `Logo tag is correct`, expected_output: `<img src="logo.png" alt="Company logo" width="120">` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "html-u2-l3",
          unit_id: "html-u2",
          track_id: "html",
          type: "challenge",
          title: "Tables",
          explanation_md: `# Tables

HTML tables display tabular data:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>95</td>
    </tr>
  </tbody>
</table>
\`\`\`

- \`<tr>\` = table row
- \`<th>\` = table header cell
- \`<td>\` = table data cell

## Your Task
Write \`buildTableRow(cells, isHeader)\` that returns a \`<tr>\` HTML string.
- If \`isHeader\` is true, use \`<th>\` tags
- Otherwise use \`<td>\` tags`,
          starter_code: `function buildTableRow(cells, isHeader = false) {\n  // Return a <tr> HTML string\n}\n\nconsole.log(buildTableRow(["Name", "Score"], true));\nconsole.log(buildTableRow(["Alice", "95"]));\n`,
          reference_solution: `function buildTableRow(cells, isHeader = false) {\n  const tag = isHeader ? "th" : "td";\n  const cellsHtml = cells.map(c => \`<\${tag}>\${c}</\${tag}>\`).join("");\n  return \`<tr>\${cellsHtml}</tr>\`;\n}\n\nconsole.log(buildTableRow(["Name", "Score"], true));\nconsole.log(buildTableRow(["Alice", "95"]));\n`,
          hints: ["Use a ternary to pick 'th' or 'td'", "Map each cell to its HTML string and join with empty string", "Wrap all in <tr>...</tr>", ],
          test_cases: [
            { description: `Header row uses th tags`, expected_output: `<tr><th>Name</th><th>Score</th></tr>` },
            { description: `Data row uses td tags`, expected_output: `<tr><td>Alice</td><td>95</td></tr>` },
          ],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "html-u2-l4",
          unit_id: "html-u2",
          track_id: "html",
          type: "boss",
          title: "Boss: HTML Table Generator",
          explanation_md: `# Boss: HTML Table Generator

Build a complete HTML table from data!

Write \`generateTable(headers, rows)\` that:
- Takes an array of header strings and a 2D array of rows
- Returns a complete \`<table>\` with \`<thead>\` and \`<tbody>\`

\`\`\`js
generateTable(
  ["Name", "Age"],
  [["Alice", 25], ["Bob", 30]]
)
// → <table><thead><tr><th>Name</th><th>Age</th></tr></thead>
//          <tbody><tr><td>Alice</td><td>25</td></tr>
//                 <tr><td>Bob</td><td>30</td></tr></tbody></table>
\`\`\``,
          starter_code: `function generateTable(headers, rows) {\n  // Build the complete table HTML\n}\n\nconst result = generateTable(\n  ["Name", "Score"],\n  [["Alice", 95], ["Bob", 82]]\n);\nconsole.log(result);\n`,
          reference_solution: `function generateTable(headers, rows) {\n  const thead = "<thead><tr>" +\n    headers.map(h => \`<th>\${h}</th>\`).join("") +\n    "</tr></thead>";\n  const tbody = "<tbody>" +\n    rows.map(row =>\n      "<tr>" + row.map(cell => \`<td>\${cell}</td>\`).join("") + "</tr>"\n    ).join("") +\n    "</tbody>";\n  return \`<table>\${thead}\${tbody}</table>\`;\n}\n\nconst result = generateTable(\n  ["Name", "Score"],\n  [["Alice", 95], ["Bob", 82]]\n);\nconsole.log(result);\n`,
          hints: ["Build thead separately using headers.map()", "Build tbody with rows.map() nested inside", "Join each row's cells with empty string, then wrap in <tr>", ],
          test_cases: [
            { description: `Output contains thead`, expected_output: `<thead>` },
            { description: `Output contains Alice row`, expected_output: `<td>Alice</td><td>95</td>` },
          ],
          xp_reward: 350,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },

    // ─── Unit 3: Forms ────────────────────────────────────────
    {
      id: "html-u3",
      track_id: "html",
      title: "Forms",
      description: `Collect user input with HTML forms`,
      icon: "edit",
      order_index: 3,
      lessons: [
        {
          id: "html-u3-l1",
          unit_id: "html-u3",
          track_id: "html",
          type: "challenge",
          title: "Form Inputs",
          explanation_md: `# Form Inputs

HTML forms collect user input:

\`\`\`html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" placeholder="Your name">
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  
  <button type="submit">Submit</button>
</form>
\`\`\`

Common \`type\` values:
- \`text\`, \`email\`, \`password\`, \`number\`, \`checkbox\`, \`radio\`

## Your Task
Write \`buildInput(type, id, placeholder)\` that returns an \`<input>\` tag string.`,
          starter_code: `function buildInput(type, id, placeholder) {\n  // Return an <input> tag with type, id, name=id, and placeholder\n}\n\nconsole.log(buildInput("text", "username", "Enter username"));\nconsole.log(buildInput("email", "user-email", "your@email.com"));\n`,
          reference_solution: `function buildInput(type, id, placeholder) {\n  return \`<input type="\${type}" id="\${id}" name="\${id}" placeholder="\${placeholder}">\`;\n}\n\nconsole.log(buildInput("text", "username", "Enter username"));\nconsole.log(buildInput("email", "user-email", "your@email.com"));\n`,
          hints: ["The input tag is self-closing", "Use name=id (both the same value)", "Include type, id, name, and placeholder attributes", ],
          test_cases: [
            { description: `Text input is correct`, expected_output: `<input type="text" id="username" name="username" placeholder="Enter username">` },
            { description: `Email input is correct`, expected_output: `<input type="email" id="user-email" name="user-email" placeholder="your@email.com">` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "html-u3-l2",
          unit_id: "html-u3",
          track_id: "html",
          type: "challenge",
          title: "Select & Options",
          explanation_md: `# Select & Options

Dropdown menus use \`<select>\` with \`<option>\` tags:

\`\`\`html
<select name="country" id="country">
  <option value="">-- Choose --</option>
  <option value="my">Malaysia</option>
  <option value="sg">Singapore</option>
  <option value="us" selected>United States</option>
</select>
\`\`\`

- \`value\` — what's sent when the form is submitted
- \`selected\` — pre-selects an option

## Your Task
Write \`buildSelect(id, options)\` where \`options\` is an array of \`{value, label}\` objects.`,
          starter_code: `function buildSelect(id, options) {\n  // Return a <select> tag with <option> tags inside\n}\n\nconst opts = [\n  {value: "js", label: "JavaScript"},\n  {value: "py", label: "Python"},\n  {value: "go", label: "Go"},\n];\nconsole.log(buildSelect("lang", opts));\n`,
          reference_solution: `function buildSelect(id, options) {\n  const optionsHtml = options\n    .map(o => \`<option value="\${o.value}">\${o.label}</option>\`)\n    .join("");\n  return \`<select id="\${id}" name="\${id}">\${optionsHtml}</select>\`;\n}\n\nconst opts = [\n  {value: "js", label: "JavaScript"},\n  {value: "py", label: "Python"},\n  {value: "go", label: "Go"},\n];\nconsole.log(buildSelect("lang", opts));\n`,
          hints: ["Map each option to an <option value=\"...\">...</option> string", "Join options with empty string", "Wrap in <select id=id name=id>...</select>"],
          test_cases: [
            { description: `Contains JavaScript option`, expected_output: `<option value="js">JavaScript</option>` },
            { description: `Wrapped in select tag`, expected_output: `<select id="lang"` },
          ],
          xp_reward: 125,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "html-u3-l3",
          unit_id: "html-u3",
          track_id: "html",
          type: "challenge",
          title: "Form Validation",
          explanation_md: `# Form Validation

HTML5 adds built-in validation:

\`\`\`html
<input type="email" required>
<input type="number" min="1" max="100">
<input type="text" minlength="3" maxlength="50">
<input type="url" pattern="https://.*">
\`\`\`

You can also validate with JavaScript:

\`\`\`js
function validate(email) {
  return email.includes("@") && email.includes(".");
}
\`\`\`

## Your Task
Write \`validateForm(data)\` that validates a form submission:
- \`name\`: must be at least 2 characters
- \`email\`: must contain \`@\` and \`.\`
- \`age\`: must be between 1 and 120

Returns \`{valid: true}\` or \`{valid: false, error: "message"}\``,
          starter_code: `function validateForm(data) {\n  // Validate name, email, and age\n  // Return {valid: true} or {valid: false, error: "..."}\n}\n\nconsole.log(JSON.stringify(validateForm({name: "Al", email: "al@x.com", age: 25})));\nconsole.log(JSON.stringify(validateForm({name: "A", email: "al@x.com", age: 25})));\nconsole.log(JSON.stringify(validateForm({name: "Alice", email: "notanemail", age: 25})));\nconsole.log(JSON.stringify(validateForm({name: "Alice", email: "a@b.com", age: 150})));\n`,
          reference_solution: `function validateForm(data) {\n  if (!data.name || data.name.length < 2) {\n    return {valid: false, error: "Name must be at least 2 characters"};\n  }\n  if (!data.email || !data.email.includes("@") || !data.email.includes(".")) {\n    return {valid: false, error: "Invalid email"};\n  }\n  if (!data.age || data.age < 1 || data.age > 120) {\n    return {valid: false, error: "Age must be between 1 and 120"};\n  }\n  return {valid: true};\n}\n\nconsole.log(JSON.stringify(validateForm({name: "Al", email: "al@x.com", age: 25})));\nconsole.log(JSON.stringify(validateForm({name: "A", email: "al@x.com", age: 25})));\nconsole.log(JSON.stringify(validateForm({name: "Alice", email: "notanemail", age: 25})));\nconsole.log(JSON.stringify(validateForm({name: "Alice", email: "a@b.com", age: 150})));\n`,
          hints: ["Check each field in order: name, then email, then age", "Use string.length for name length check", "Use string.includes('@') and string.includes('.') for email", ],
          test_cases: [
            { description: `Valid form returns valid: true`, expected_output: `{"valid":true}` },
            { description: `Short name returns valid: false`, expected_output: `"valid":false` },
            { description: `Bad email returns valid: false`, expected_output: `"valid":false` },
          ],
          xp_reward: 150,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "html-u3-l4",
          unit_id: "html-u3",
          track_id: "html",
          type: "boss",
          title: "Boss: Form Builder",
          explanation_md: `# Boss: Form Builder

Build a complete HTML form generator!

Write \`buildForm(action, fields)\` where \`fields\` is an array of:
\`{type, id, label, required}\`

The function should return a complete form HTML string with:
- A \`<form>\` tag with method="POST" and the action
- For each field: a \`<label>\` followed by an \`<input>\`
- A submit button at the end

\`\`\`js
buildForm("/register", [
  {type: "text", id: "name", label: "Full Name", required: true},
  {type: "email", id: "email", label: "Email", required: true},
])
\`\`\``,
          starter_code: `function buildForm(action, fields) {\n  // Build a complete <form> HTML string\n}\n\nconst html = buildForm("/login", [\n  {type: "email", id: "email", label: "Email", required: true},\n  {type: "password", id: "password", label: "Password", required: true},\n]);\nconsole.log(html);\n`,
          reference_solution: `function buildForm(action, fields) {\n  const fieldsHtml = fields.map(f => {\n    const req = f.required ? " required" : "";\n    return \`<label for="\${f.id}">\${f.label}</label><input type="\${f.type}" id="\${f.id}" name="\${f.id}"\${req}>\`;\n  }).join("");\n  return \`<form action="\${action}" method="POST">\${fieldsHtml}<button type="submit">Submit</button></form>\`;\n}\n\nconst html = buildForm("/login", [\n  {type: "email", id: "email", label: "Email", required: true},\n  {type: "password", id: "password", label: "Password", required: true},\n]);\nconsole.log(html);\n`,
          hints: ["Map each field to a label + input string", "Add 'required' attribute conditionally based on f.required", "Wrap everything in <form action method=POST>...<button>...</form>", ],
          test_cases: [
            { description: `Form tag has correct action`, expected_output: `<form action="/login"` },
            { description: `Email label is present`, expected_output: `<label for="email">Email</label>` },
            { description: `Submit button is present`, expected_output: `<button type="submit">Submit</button>` },
          ],
          xp_reward: 400,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },

    // ─── Unit 4: Semantic HTML ────────────────────────────────
    {
      id: "html-u4",
      track_id: "html",
      title: "Semantic HTML",
      description: `Use the right elements for meaning and accessibility`,
      icon: "layers",
      order_index: 4,
      lessons: [
        {
          id: "html-u4-l1",
          unit_id: "html-u4",
          track_id: "html",
          type: "challenge",
          title: "Semantic Elements",
          explanation_md: `# Semantic Elements

Semantic HTML tells the browser (and assistive tech) **what** content is, not just how it looks:

\`\`\`html
<!-- ❌ Non-semantic (meaningless) -->
<div class="header">...</div>
<div class="nav">...</div>

<!-- ✅ Semantic (meaningful) -->
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
\`\`\`

**Key semantic elements:**
\`header\`, \`nav\`, \`main\`, \`article\`, \`section\`, \`aside\`, \`footer\`

## Your Task
Given a list of element names, filter to return only the semantic HTML5 elements.`,
          starter_code: `function filterSemantic(elements) {\n  const SEMANTIC = ["header", "nav", "main", "article", "section", "aside", "footer", "figure", "figcaption", "time", "mark", "details", "summary"];\n  // Return only elements that are in SEMANTIC\n}\n\nconst input = ["div", "header", "span", "nav", "p", "footer", "h1", "main"];\nconst result = filterSemantic(input);\nresult.forEach(e => console.log(e));\n`,
          reference_solution: `function filterSemantic(elements) {\n  const SEMANTIC = ["header", "nav", "main", "article", "section", "aside", "footer", "figure", "figcaption", "time", "mark", "details", "summary"];\n  return elements.filter(e => SEMANTIC.includes(e));\n}\n\nconst input = ["div", "header", "span", "nav", "p", "footer", "h1", "main"];\nconst result = filterSemantic(input);\nresult.forEach(e => console.log(e));\n`,
          hints: ["Use .filter() with Array.includes()", "SEMANTIC.includes(e) returns true if e is in SEMANTIC", ],
          test_cases: [
            { description: `header is semantic`, expected_output: `header` },
            { description: `nav is semantic`, expected_output: `nav` },
            { description: `footer is semantic`, expected_output: `footer` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "html-u4-l2",
          unit_id: "html-u4",
          track_id: "html",
          type: "challenge",
          title: "Meta Tags & SEO",
          explanation_md: `# Meta Tags & SEO

The \`<head>\` section contains metadata about your page:

\`\`\`html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn HTML in 8 hours">
  <meta name="keywords" content="HTML, web, tutorial">
  <title>My HTML Course</title>
</head>
\`\`\`

These are crucial for:
- **SEO** (Search Engine Optimization)
- **Responsive design** (viewport meta)
- **Social sharing** (Open Graph tags)

## Your Task
Write \`buildMeta(name, content)\` that returns a \`<meta>\` tag string.`,
          starter_code: `function buildMeta(name, content) {\n  // Return a <meta name="..." content="..."> string\n}\n\nconsole.log(buildMeta("description", "Learn HTML fast"));\nconsole.log(buildMeta("keywords", "HTML, CSS, web"));\nconsole.log(buildMeta("author", "CodeQuest"));\n`,
          reference_solution: `function buildMeta(name, content) {\n  return \`<meta name="\${name}" content="\${content}">\`;\n}\n\nconsole.log(buildMeta("description", "Learn HTML fast"));\nconsole.log(buildMeta("keywords", "HTML, CSS, web"));\nconsole.log(buildMeta("author", "CodeQuest"));\n`,
          hints: ["Meta tags are self-closing", "Use name and content attributes", ],
          test_cases: [
            { description: `Description meta tag`, expected_output: `<meta name="description" content="Learn HTML fast">` },
            { description: `Author meta tag`, expected_output: `<meta name="author" content="CodeQuest">` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "html-u4-l3",
          unit_id: "html-u4",
          track_id: "html",
          type: "challenge",
          title: "Accessibility (ARIA)",
          explanation_md: `# Accessibility (ARIA)

**ARIA** (Accessible Rich Internet Applications) attributes help screen readers:

\`\`\`html
<!-- ARIA labels for screen readers -->
<button aria-label="Close menu">✕</button>

<!-- Landmarks -->
<nav aria-label="Main navigation">...</nav>

<!-- Live regions -->
<div aria-live="polite" id="status">Loading...</div>
\`\`\`

**Basic accessibility rules:**
1. Every \`<img>\` needs an \`alt\` attribute
2. Forms need \`<label>\` for every input
3. Use semantic HTML instead of div soup

## Your Task
Write \`addAriaLabel(tag, content, label)\` that builds an HTML element with an \`aria-label\` attribute.`,
          starter_code: `function addAriaLabel(tag, content, label) {\n  // Return an HTML element with aria-label\n}\n\nconsole.log(addAriaLabel("button", "✕", "Close dialog"));\nconsole.log(addAriaLabel("nav", "<a>Home</a>", "Main navigation"));\n`,
          reference_solution: `function addAriaLabel(tag, content, label) {\n  return \`<\${tag} aria-label="\${label}">\${content}</\${tag}>\`;\n}\n\nconsole.log(addAriaLabel("button", "✕", "Close dialog"));\nconsole.log(addAriaLabel("nav", "<a>Home</a>", "Main navigation"));\n`,
          hints: ["Use template literals to build the tag", "aria-label goes inside the opening tag", ],
          test_cases: [
            { description: `Button with aria-label`, expected_output: `<button aria-label="Close dialog">✕</button>` },
            { description: `Nav with aria-label`, expected_output: `<nav aria-label="Main navigation">` },
          ],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "html-u4-l4",
          unit_id: "html-u4",
          track_id: "html",
          type: "boss",
          title: "Boss: Page Structure Analyzer",
          explanation_md: `# Boss: Page Structure Analyzer

Analyze an HTML structure and return a report!

Write \`analyzeHTML(elements)\` that takes an array of HTML tag names (as they appear on a page) and returns an object:
- \`headings\`: count of h1-h6 tags
- \`hasH1\`: true if exactly one h1 exists
- \`semanticCount\`: count of semantic tags
- \`issues\`: array of issue strings (e.g. \`"Multiple h1 tags"\`, \`"No main element"\`)

\`\`\`js
analyzeHTML(["header", "h1", "h1", "main", "p", "footer"])
// → { headings: 2, hasH1: false, semanticCount: 3, issues: ["Multiple h1 tags"] }
\`\`\``,
          starter_code: `function analyzeHTML(elements) {\n  const SEMANTIC = ["header", "nav", "main", "article", "section", "aside", "footer"];\n  // Analyze and return the report object\n}\n\nconst result = analyzeHTML(["header", "h1", "main", "p", "section", "footer"]);\nconsole.log(result.headings);      // 1\nconsole.log(result.hasH1);        // true\nconsole.log(result.semanticCount); // 4\nconsole.log(result.issues.length); // 0\n`,
          reference_solution: `function analyzeHTML(elements) {\n  const SEMANTIC = ["header", "nav", "main", "article", "section", "aside", "footer"];\n  const headings = elements.filter(e => /^h[1-6]$/.test(e)).length;\n  const h1Count = elements.filter(e => e === "h1").length;\n  const hasH1 = h1Count === 1;\n  const semanticCount = elements.filter(e => SEMANTIC.includes(e)).length;\n  const issues = [];\n  if (h1Count > 1) issues.push("Multiple h1 tags");\n  if (h1Count === 0) issues.push("No h1 tag");\n  if (!elements.includes("main")) issues.push("No main element");\n  return { headings, hasH1, semanticCount, issues };\n}\n\nconst result = analyzeHTML(["header", "h1", "main", "p", "section", "footer"]);\nconsole.log(result.headings);\nconsole.log(result.hasH1);\nconsole.log(result.semanticCount);\nconsole.log(result.issues.length);\n`,
          hints: ["Use /^h[1-6]$/.test(e) to detect heading tags",
            "Filter for h1 specifically to count h1Count",
            "Build issues array with conditional pushes",
          ],
          test_cases: [
            { description: `headings count is 1`, expected_output: `1` },
            { description: `hasH1 is true`, expected_output: `true` },
            { description: `semanticCount is 4`, expected_output: `4` },
            { description: `No issues (0 issues)`, expected_output: `0` },
          ],
          xp_reward: 450,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },
  ],
};

// ============================================================
// CSS Track
// ============================================================
export const CSS_TRACK: StaticTrack = {
  id: "css",
  title: "CSS",
  description: `Style the web. Master selectors, flexbox, grid, animations, and modern CSS features.`,
  color: "#264de4",
  difficulty_curve: "beginner",
  execution_engine: "browser",
  category: "fundamentals",
  order_index: 2,
  is_published: true,
  estimated_hours: 12,
  learner_count: 11200,
  units: [
    // ─── Unit 1: CSS Basics ───────────────────────────────────
    {
      id: "css-u1",
      track_id: "css",
      title: "CSS Basics",
      description: `Selectors, properties, and the cascade`,
      icon: "book",
      order_index: 1,
      lessons: [
        {
          id: "css-u1-l1",
          unit_id: "css-u1",
          track_id: "css",
          type: "concept",
          title: "CSS Selectors",
          explanation_md: `# CSS Selectors

CSS **selectors** target HTML elements to style:

\`\`\`css
/* Element selector */
p { color: blue; }

/* Class selector */
.card { background: white; }

/* ID selector */
#header { height: 60px; }

/* Combinator: descendants */
.card p { font-size: 14px; }

/* Pseudo-class */
a:hover { text-decoration: underline; }
\`\`\`

**Specificity order** (highest to lowest): inline → ID → class → element

## Your Task
Write \`cssSpecificity(selector)\` that returns the specificity score:
- ID (#...) = 100 points each
- Class (.../pseudo-class/attribute) = 10 points each  
- Element = 1 point each`,
          starter_code: `function cssSpecificity(selector) {\n  // Count IDs (#) = 100 pts, classes (.) = 10 pts, elements = 1 pt\n  const ids = (selector.match(/#[a-z]/gi) || []).length;\n  const classes = (selector.match(/\\.[a-z]/gi) || []).length;\n  // Count element tags (simplified: words that don't start with # or .)\n  const elements = (selector.match(/\\b[a-z]+\\b/gi) || []).filter(\n    t => !selector.includes("#" + t) && !selector.includes("." + t)\n  ).length;\n  return ids * 100 + classes * 10 + elements;\n}\n\nconsole.log(cssSpecificity("#header"));          // 100\nconsole.log(cssSpecificity(".card"));             // 10\nconsole.log(cssSpecificity("p"));                 // 1\nconsole.log(cssSpecificity("#nav .link"));        // 110\n`,
          reference_solution: `function cssSpecificity(selector) {\n  const ids = (selector.match(/#[a-z]/gi) || []).length;\n  const classes = (selector.match(/\\.[a-z]/gi) || []).length;\n  const elements = (selector.match(/\\b[a-z]+\\b/gi) || []).filter(\n    t => !selector.includes("#" + t) && !selector.includes("." + t)\n  ).length;\n  return ids * 100 + classes * 10 + elements;\n}\n\nconsole.log(cssSpecificity("#header"));\nconsole.log(cssSpecificity(".card"));\nconsole.log(cssSpecificity("p"));\nconsole.log(cssSpecificity("#nav .link"));\n`,
          hints: ["Use regex .match(/#[a-z]/gi) to count IDs",
            "Use regex .match(/\\.[a-z]/gi) to count classes",
            "Multiply: IDs × 100, classes × 10, elements × 1",
          ],
          test_cases: [
            { description: `#header = 100`, expected_output: `100` },
            { description: `.card = 10`, expected_output: `10` },
            { description: `p = 1`, expected_output: `1` },
            { description: `#nav .link = 110`, expected_output: `110` },
          ],
          xp_reward: 75,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "css-u1-l2",
          unit_id: "css-u1",
          track_id: "css",
          type: "challenge",
          title: "The Box Model",
          explanation_md: `# The Box Model

Every element is a box with four layers:

\`\`\`
┌─────────────────────────────┐
│          MARGIN             │  (outside, transparent)
│  ┌───────────────────────┐  │
│  │        BORDER         │  │  (visible line)
│  │  ┌─────────────────┐  │  │
│  │  │    PADDING      │  │  │  (space inside border)
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  (your text/image)
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
\`\`\`

**Total width** = content + padding-left + padding-right + border-left + border-right + margin-left + margin-right

With \`box-sizing: border-box\`, padding and border are **included** in the width.

## Your Task
Write \`totalWidth(contentWidth, padding, border, margin)\` that calculates total element width (all sides, not border-box).`,
          starter_code: `function totalWidth(contentWidth, padding, border, margin) {\n  // Calculate total width (padding and border on both sides)\n  // padding, border, margin are single values applied to all sides\n}\n\nconsole.log(totalWidth(200, 10, 2, 20));  // 264\nconsole.log(totalWidth(300, 0, 1, 0));    // 302\n`,
          reference_solution: `function totalWidth(contentWidth, padding, border, margin) {\n  return contentWidth + (padding * 2) + (border * 2) + (margin * 2);\n}\n\nconsole.log(totalWidth(200, 10, 2, 20));\nconsole.log(totalWidth(300, 0, 1, 0));\n`,
          hints: ["Each value applies to both left and right sides (× 2)", "Total = content + padding*2 + border*2 + margin*2", ],
          test_cases: [
            { description: `totalWidth(200,10,2,20) = 264`, expected_output: `264` },
            { description: `totalWidth(300,0,1,0) = 302`, expected_output: `302` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "css-u1-l3",
          unit_id: "css-u1",
          track_id: "css",
          type: "challenge",
          title: "Colors & Typography",
          explanation_md: `# Colors & Typography

CSS has multiple ways to specify colors:

\`\`\`css
color: red;                    /* named */
color: #e34c26;               /* hex */
color: rgb(227, 76, 38);      /* RGB */
color: rgba(227, 76, 38, 0.5); /* RGBA (with opacity) */
color: hsl(15, 76%, 52%);     /* HSL */
\`\`\`

Typography properties:

\`\`\`css
font-family: 'Inter', sans-serif;
font-size: 16px;
font-weight: 700;    /* bold */
line-height: 1.6;
letter-spacing: 0.05em;
text-transform: uppercase;
\`\`\`

## Your Task
Write \`hexToRgb(hex)\` that converts a 6-digit hex color to its RGB string.

\`hexToRgb("#e34c26")\` → \`"rgb(227, 76, 38)"\``,
          starter_code: `function hexToRgb(hex) {\n  // Convert #rrggbb to rgb(r, g, b)\n  // Hint: use parseInt(hex.slice(1,3), 16) for r, etc.\n}\n\nconsole.log(hexToRgb("#e34c26"));  // rgb(227, 76, 38)\nconsole.log(hexToRgb("#ffffff"));  // rgb(255, 255, 255)\nconsole.log(hexToRgb("#000000"));  // rgb(0, 0, 0)\n`,
          reference_solution: `function hexToRgb(hex) {\n  const r = parseInt(hex.slice(1, 3), 16);\n  const g = parseInt(hex.slice(3, 5), 16);\n  const b = parseInt(hex.slice(5, 7), 16);\n  return \`rgb(\${r}, \${g}, \${b})\`;\n}\n\nconsole.log(hexToRgb("#e34c26"));\nconsole.log(hexToRgb("#ffffff"));\nconsole.log(hexToRgb("#000000"));\n`,
          hints: ["Slice the hex string: hex.slice(1, 3) for R, 3, 5 for G, 5, 7 for B", "parseInt(twoChars, 16) converts hex to decimal", "Format as 'rgb(r, g, b)' with spaces after commas", ],
          test_cases: [
            { description: `hexToRgb('#e34c26') = rgb(227, 76, 38)`, expected_output: `rgb(227, 76, 38)` },
            { description: `hexToRgb('#ffffff') = rgb(255, 255, 255)`, expected_output: `rgb(255, 255, 255)` },
            { description: `hexToRgb('#000000') = rgb(0, 0, 0)`, expected_output: `rgb(0, 0, 0)` },
          ],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "css-u1-l4",
          unit_id: "css-u1",
          track_id: "css",
          type: "boss",
          title: "Boss: CSS Rule Parser",
          explanation_md: `# Boss: CSS Rule Parser

Parse CSS rules into a structured object!

Write \`parseCss(cssText)\` that parses a CSS block like:

\`\`\`
"color: red; font-size: 16px; margin: 0 auto;"
\`\`\`

And returns an object:
\`\`\`js
{ color: "red", "font-size": "16px", margin: "0 auto" }
\`\`\`

Rules:
- Split on \`;\`
- Each rule is \`property: value\`
- Trim whitespace from keys and values
- Ignore empty rules`,
          starter_code: `function parseCss(cssText) {\n  // Parse CSS declaration block into an object\n}\n\nconst styles = parseCss("color: red; font-size: 16px; margin: 0 auto;");\nconsole.log(styles.color);         // red\nconsole.log(styles["font-size"]);  // 16px\nconsole.log(styles.margin);        // 0 auto\n`,
          reference_solution: `function parseCss(cssText) {\n  const result = {};\n  cssText.split(";").forEach(rule => {\n    rule = rule.trim();\n    if (!rule) return;\n    const colonIdx = rule.indexOf(":");\n    if (colonIdx === -1) return;\n    const key = rule.slice(0, colonIdx).trim();\n    const value = rule.slice(colonIdx + 1).trim();\n    result[key] = value;\n  });\n  return result;\n}\n\nconst styles = parseCss("color: red; font-size: 16px; margin: 0 auto;");\nconsole.log(styles.color);\nconsole.log(styles["font-size"]);\nconsole.log(styles.margin);\n`,
          hints: ["Split the string by ';' to get individual declarations", "For each declaration, find ':' to split key and value", "Trim whitespace from both key and value", "Skip empty strings after splitting", ],
          test_cases: [
            { description: `color is red`, expected_output: `red` },
            { description: `font-size is 16px`, expected_output: `16px` },
            { description: `margin is 0 auto`, expected_output: `0 auto` },
          ],
          xp_reward: 350,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },

    // ─── Unit 2: Flexbox ──────────────────────────────────────
    {
      id: "css-u2",
      track_id: "css",
      title: "Flexbox",
      description: `One-dimensional layout with CSS Flexbox`,
      icon: "layout",
      order_index: 2,
      lessons: [
        {
          id: "css-u2-l1",
          unit_id: "css-u2",
          track_id: "css",
          type: "challenge",
          title: "Flex Container",
          explanation_md: `# Flex Container

Apply \`display: flex\` to make a container use flexbox:

\`\`\`css
.container {
  display: flex;
  flex-direction: row;       /* or column */
  justify-content: center;   /* main axis */
  align-items: center;       /* cross axis */
  gap: 16px;
}
\`\`\`

**justify-content values:**
\`flex-start\`, \`flex-end\`, \`center\`, \`space-between\`, \`space-around\`, \`space-evenly\`

**align-items values:**
\`flex-start\`, \`flex-end\`, \`center\`, \`stretch\`, \`baseline\`

## Your Task
Write \`flexConfig(direction, justify, align)\` that returns the CSS properties as an object.`,
          starter_code: `function flexConfig(direction, justify, align) {\n  // Return an object with the CSS flex properties\n}\n\nconst config = flexConfig("row", "space-between", "center");\nconsole.log(config.display);           // flex\nconsole.log(config["flex-direction"]); // row\nconsole.log(config["justify-content"]); // space-between\nconsole.log(config["align-items"]);    // center\n`,
          reference_solution: `function flexConfig(direction, justify, align) {\n  return {\n    display: "flex",\n    "flex-direction": direction,\n    "justify-content": justify,\n    "align-items": align\n  };\n}\n\nconst config = flexConfig("row", "space-between", "center");\nconsole.log(config.display);\nconsole.log(config["flex-direction"]);\nconsole.log(config["justify-content"]);\nconsole.log(config["align-items"]);\n`,
          hints: ["Return an object with display: 'flex' always set", "Use quoted keys for hyphenated properties", ],
          test_cases: [
            { description: `display is flex`, expected_output: `flex` },
            { description: `flex-direction is row`, expected_output: `row` },
            { description: `justify-content is space-between`, expected_output: `space-between` },
            { description: `align-items is center`, expected_output: `center` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "css-u2-l2",
          unit_id: "css-u2",
          track_id: "css",
          type: "challenge",
          title: "Flex Items",
          explanation_md: `# Flex Items

Control how individual flex items behave:

\`\`\`css
.item {
  flex: 1;           /* grow to fill space */
  flex-grow: 2;      /* grow twice as much */
  flex-shrink: 0;    /* don't shrink */
  flex-basis: 200px; /* start at 200px */
  align-self: flex-end; /* override container's align */
  order: 2;          /* change visual order */
}
\`\`\`

**Shorthand:** \`flex: grow shrink basis\`
- \`flex: 1\` = \`flex: 1 1 0%\`
- \`flex: none\` = \`flex: 0 0 auto\`

## Your Task
Write \`distributeWidths(items, totalWidth)\` where each item has a \`flex\` value. Return an array of computed widths.`,
          starter_code: `function distributeWidths(items, totalWidth) {\n  // Each item: {name, flex}\n  // Distribute totalWidth proportionally by flex value\n  const totalFlex = items.reduce((sum, item) => sum + item.flex, 0);\n  return items.map(item => {\n    // Calculate this item's width\n  });\n}\n\nconst items = [\n  {name: "sidebar", flex: 1},\n  {name: "main",    flex: 3},\n  {name: "aside",   flex: 1},\n];\nconst widths = distributeWidths(items, 1000);\nwidths.forEach(w => console.log(w));\n`,
          reference_solution: `function distributeWidths(items, totalWidth) {\n  const totalFlex = items.reduce((sum, item) => sum + item.flex, 0);\n  return items.map(item => Math.round(totalWidth * item.flex / totalFlex));\n}\n\nconst items = [\n  {name: "sidebar", flex: 1},\n  {name: "main",    flex: 3},\n  {name: "aside",   flex: 1},\n];\nconst widths = distributeWidths(items, 1000);\nwidths.forEach(w => console.log(w));\n`,
          hints: ["Sum all flex values: items.reduce((sum, i) => sum + i.flex, 0)", "Each item's width = totalWidth * item.flex / totalFlex", "Use Math.round() for clean pixel values", ],
          test_cases: [
            { description: `sidebar (flex:1 of 5) = 200`, expected_output: `200` },
            { description: `main (flex:3 of 5) = 600`, expected_output: `600` },
            { description: `aside (flex:1 of 5) = 200`, expected_output: `200` },
          ],
          xp_reward: 125,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "css-u2-l3",
          unit_id: "css-u2",
          track_id: "css",
          type: "challenge",
          title: "Flexbox Wrapping",
          explanation_md: `# Flexbox Wrapping

By default, flex items stay on one line. Add \`flex-wrap: wrap\` to allow wrapping:

\`\`\`css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 300px;  /* grow, shrink, min 300px */
}
\`\`\`

This creates a **responsive grid** — items wrap to the next line when they can't fit!

## Your Task
Write \`calculateColumns(containerWidth, itemMinWidth, gap)\` that returns how many items fit per row.`,
          starter_code: `function calculateColumns(containerWidth, itemMinWidth, gap) {\n  // How many items fit in containerWidth given itemMinWidth and gap between items?\n  // Hint: n items need n * itemMinWidth + (n-1) * gap <= containerWidth\n}\n\nconsole.log(calculateColumns(1200, 300, 16));  // 3\nconsole.log(calculateColumns(800, 300, 16));   // 2\nconsole.log(calculateColumns(600, 300, 16));   // 1\n`,
          reference_solution: `function calculateColumns(containerWidth, itemMinWidth, gap) {\n  for (let n = Math.floor(containerWidth / itemMinWidth); n >= 1; n--) {\n    if (n * itemMinWidth + (n - 1) * gap <= containerWidth) {\n      return n;\n    }\n  }\n  return 1;\n}\n\nconsole.log(calculateColumns(1200, 300, 16));\nconsole.log(calculateColumns(800, 300, 16));\nconsole.log(calculateColumns(600, 300, 16));\n`,
          hints: ["n items need: n * itemMinWidth + (n-1) * gap ≤ containerWidth", "Start with the maximum possible n and work down", "Always return at least 1", ],
          test_cases: [
            { description: `1200px container = 3 columns`, expected_output: `3` },
            { description: `800px container = 2 columns`, expected_output: `2` },
            { description: `600px container = 1 column`, expected_output: `1` },
          ],
          xp_reward: 150,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "css-u2-l4",
          unit_id: "css-u2",
          track_id: "css",
          type: "boss",
          title: "Boss: CSS-in-JS Style Builder",
          explanation_md: `# Boss: CSS-in-JS Style Builder

Build a CSS-in-JS utility that creates style objects!

Write a \`style\` builder that:
1. \`style.flex(direction, justify, align)\` — returns flex container styles
2. \`style.text(size, weight, color)\` — returns text styles
3. \`style.spacing(padding, margin)\` — returns spacing styles
4. \`style.merge(...styles)\` — merges multiple style objects

Each method returns a plain JS object. \`merge\` combines them (later styles override earlier ones).`,
          starter_code: `const style = {\n  flex(direction, justify, align) {\n    // Return flex container style object\n  },\n  text(size, weight, color) {\n    // Return text style object\n  },\n  spacing(padding, margin) {\n    // Return spacing style object\n  },\n  merge(...styles) {\n    // Combine all style objects into one\n  }\n};\n\nconst cardStyle = style.merge(\n  style.flex("column", "flex-start", "stretch"),\n  style.text(14, 400, "#333"),\n  style.spacing(16, 8)\n);\nconsole.log(cardStyle.display);           // flex\nconsole.log(cardStyle["font-size"]);      // 14\nconsole.log(cardStyle.padding);           // 16\nconsole.log(cardStyle["flex-direction"]); // column\n`,
          reference_solution: `const style = {\n  flex(direction, justify, align) {\n    return {\n      display: "flex",\n      "flex-direction": direction,\n      "justify-content": justify,\n      "align-items": align\n    };\n  },\n  text(size, weight, color) {\n    return {\n      "font-size": size,\n      "font-weight": weight,\n      color: color\n    };\n  },\n  spacing(padding, margin) {\n    return { padding, margin };\n  },\n  merge(...styles) {\n    return Object.assign({}, ...styles);\n  }\n};\n\nconst cardStyle = style.merge(\n  style.flex("column", "flex-start", "stretch"),\n  style.text(14, 400, "#333"),\n  style.spacing(16, 8)\n);\nconsole.log(cardStyle.display);\nconsole.log(cardStyle["font-size"]);\nconsole.log(cardStyle.padding);\nconsole.log(cardStyle["flex-direction"]);\n`,
          hints: ["Each method returns a plain object {}", "Use Object.assign({}, ...styles) to merge objects", "Use quoted keys for hyphenated CSS properties", ],
          test_cases: [
            { description: `display is flex`, expected_output: `flex` },
            { description: `font-size is 14`, expected_output: `14` },
            { description: `padding is 16`, expected_output: `16` },
            { description: `flex-direction is column`, expected_output: `column` },
          ],
          xp_reward: 450,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },

    // ─── Unit 3: Grid & Responsive ────────────────────────────
    {
      id: "css-u3",
      track_id: "css",
      title: "Grid & Responsive Design",
      description: `CSS Grid and media queries for responsive layouts`,
      icon: "grid",
      order_index: 3,
      lessons: [
        {
          id: "css-u3-l1",
          unit_id: "css-u3",
          track_id: "css",
          type: "challenge",
          title: "CSS Grid",
          explanation_md: `# CSS Grid

CSS Grid creates two-dimensional layouts:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;  /* 3 columns */
  grid-template-rows: 100px auto;      /* 2 rows */
  gap: 16px;                           /* spacing */
}

.item {
  grid-column: 1 / 3;  /* spans from line 1 to 3 */
  grid-row: 1 / 2;
}
\`\`\`

**\`fr\`** = fractional unit (distributes remaining space)

## Your Task
Write \`parseGridTemplate(template)\` that parses a \`grid-template-columns\` value and returns the number of columns and whether it uses \`fr\` units.`,
          starter_code: `function parseGridTemplate(template) {\n  // Return {columns: number, usesFr: boolean}\n  const parts = template.trim().split(/\\s+/);\n  const columns = parts.length;\n  const usesFr = parts.some(p => p.endsWith("fr"));\n  return {columns, usesFr};\n}\n\nconst r1 = parseGridTemplate("1fr 2fr 1fr");\nconsole.log(r1.columns);  // 3\nconsole.log(r1.usesFr);   // true\n\nconst r2 = parseGridTemplate("200px 400px");\nconsole.log(r2.columns);  // 2\nconsole.log(r2.usesFr);   // false\n`,
          reference_solution: `function parseGridTemplate(template) {\n  const parts = template.trim().split(/\\s+/);\n  const columns = parts.length;\n  const usesFr = parts.some(p => p.endsWith("fr"));\n  return {columns, usesFr};\n}\n\nconst r1 = parseGridTemplate("1fr 2fr 1fr");\nconsole.log(r1.columns);\nconsole.log(r1.usesFr);\n\nconst r2 = parseGridTemplate("200px 400px");\nconsole.log(r2.columns);\nconsole.log(r2.usesFr);\n`,
          hints: ["Split the template by whitespace using /\\s+/", "Count the parts for number of columns", "Use .some() with .endsWith('fr') to detect fr units", ],
          test_cases: [
            { description: `'1fr 2fr 1fr' has 3 columns`, expected_output: `3` },
            { description: `'1fr 2fr 1fr' uses fr`, expected_output: `true` },
            { description: `'200px 400px' has 2 columns`, expected_output: `2` },
            { description: `'200px 400px' does not use fr`, expected_output: `false` },
          ],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "css-u3-l2",
          unit_id: "css-u3",
          track_id: "css",
          type: "challenge",
          title: "Media Queries",
          explanation_md: `# Media Queries

Media queries apply styles at different screen sizes:

\`\`\`css
/* Mobile first (default) */
.container { padding: 16px; }

/* Tablet and above */
@media (min-width: 768px) {
  .container { padding: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 32px; max-width: 1200px; }
}
\`\`\`

**Breakpoints** (common):
- Mobile: < 768px
- Tablet: 768px – 1023px
- Desktop: ≥ 1024px

## Your Task
Write \`getBreakpoint(width)\` that returns the breakpoint name for a given viewport width.`,
          starter_code: `function getBreakpoint(width) {\n  // Return: "mobile", "tablet", or "desktop"\n}\n\nconsole.log(getBreakpoint(320));   // mobile\nconsole.log(getBreakpoint(768));   // tablet\nconsole.log(getBreakpoint(1024));  // desktop\nconsole.log(getBreakpoint(1440));  // desktop\n`,
          reference_solution: `function getBreakpoint(width) {\n  if (width < 768) return "mobile";\n  if (width < 1024) return "tablet";\n  return "desktop";\n}\n\nconsole.log(getBreakpoint(320));\nconsole.log(getBreakpoint(768));\nconsole.log(getBreakpoint(1024));\nconsole.log(getBreakpoint(1440));\n`,
          hints: ["Use if/else if/else with the breakpoint values", "mobile: width < 768, tablet: 768-1023, desktop: 1024+", ],
          test_cases: [
            { description: `320px = mobile`, expected_output: `mobile` },
            { description: `768px = tablet`, expected_output: `tablet` },
            { description: `1024px = desktop`, expected_output: `desktop` },
          ],
          xp_reward: 100,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "css-u3-l3",
          unit_id: "css-u3",
          track_id: "css",
          type: "challenge",
          title: "CSS Variables",
          explanation_md: `# CSS Custom Properties (Variables)

CSS variables let you reuse values:

\`\`\`css
:root {
  --primary: #7c3aed;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --font-size-base: 16px;
}

.button {
  background: var(--primary);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
}
\`\`\`

**Benefits:**
- Change a value once, updates everywhere
- Can be overridden in child elements
- Accessible via JavaScript

## Your Task
Write a \`ThemeManager\` class that stores CSS variables and generates the \`:root { ... }\` CSS block.`,
          starter_code: `class ThemeManager {\n  constructor() {\n    this.vars = {};\n  }\n\n  set(name, value) {\n    // Store the CSS variable (name should start with --)\n  }\n\n  get(name) {\n    // Return the value of the CSS variable\n  }\n\n  toCSS() {\n    // Return :root { --name: value; ... } as a string\n  }\n}\n\nconst theme = new ThemeManager();\ntheme.set("--primary", "#7c3aed");\ntheme.set("--spacing", "16px");\nconsole.log(theme.get("--primary"));  // #7c3aed\nconsole.log(theme.toCSS());\n`,
          reference_solution: `class ThemeManager {\n  constructor() {\n    this.vars = {};\n  }\n\n  set(name, value) {\n    this.vars[name] = value;\n  }\n\n  get(name) {\n    return this.vars[name];\n  }\n\n  toCSS() {\n    const declarations = Object.entries(this.vars)\n      .map(([k, v]) => \`  \${k}: \${v};\`)\n      .join("\\n");\n    return \`:root {\\n\${declarations}\\n}\`;\n  }\n}\n\nconst theme = new ThemeManager();\ntheme.set("--primary", "#7c3aed");\ntheme.set("--spacing", "16px");\nconsole.log(theme.get("--primary"));\nconsole.log(theme.toCSS());\n`,
          hints: ["Store vars in this.vars object", "In toCSS(), use Object.entries().map() to build declarations", "Wrap in :root { ... }", ],
          test_cases: [
            { description: `get('--primary') returns #7c3aed`, expected_output: `#7c3aed` },
            { description: `toCSS() contains :root`, expected_output: `:root {` },
            { description: `toCSS() contains --primary`, expected_output: `--primary: #7c3aed;` },
          ],
          xp_reward: 150,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "css-u3-l4",
          unit_id: "css-u3",
          track_id: "css",
          type: "boss",
          title: "Boss: Responsive Breakpoint System",
          explanation_md: `# Boss: Responsive Breakpoint System

Build a responsive breakpoint utility!

Create a \`Responsive\` class that:
- Takes a \`breakpoints\` object (e.g. \`{sm: 640, md: 768, lg: 1024, xl: 1280}\`)
- \`above(bp)\` — returns styles to apply above that breakpoint
- \`between(bpA, bpB)\` — returns styles for a range
- \`mediaQuery(bp, styles)\` — generates a media query string

\`\`\`js
const r = new Responsive({sm: 640, md: 768, lg: 1024});
console.log(r.mediaQuery("md", "display: flex"));
// @media (min-width: 768px) { display: flex }
console.log(r.between("sm", "lg"));
// "(min-width: 640px) and (max-width: 1023px)"
\`\`\``,
          starter_code: `class Responsive {\n  constructor(breakpoints) {\n    this.breakpoints = breakpoints;\n  }\n\n  above(bp) {\n    // Return "(min-width: Xpx)"\n  }\n\n  between(bpA, bpB) {\n    // Return "(min-width: Xpx) and (max-width: Ypx)"\n    // Y = breakpoints[bpB] - 1\n  }\n\n  mediaQuery(bp, styles) {\n    // Return "@media (min-width: Xpx) { styles }"\n  }\n}\n\nconst r = new Responsive({sm: 640, md: 768, lg: 1024});\nconsole.log(r.above("md"));\nconsole.log(r.between("sm", "lg"));\nconsole.log(r.mediaQuery("md", "display: flex"));\n`,
          reference_solution: `class Responsive {\n  constructor(breakpoints) {\n    this.breakpoints = breakpoints;\n  }\n\n  above(bp) {\n    return \`(min-width: \${this.breakpoints[bp]}px)\`;\n  }\n\n  between(bpA, bpB) {\n    const min = this.breakpoints[bpA];\n    const max = this.breakpoints[bpB] - 1;\n    return \`(min-width: \${min}px) and (max-width: \${max}px)\`;\n  }\n\n  mediaQuery(bp, styles) {\n    return \`@media \${this.above(bp)} { \${styles} }\`;\n  }\n}\n\nconst r = new Responsive({sm: 640, md: 768, lg: 1024});\nconsole.log(r.above("md"));\nconsole.log(r.between("sm", "lg"));\nconsole.log(r.mediaQuery("md", "display: flex"));\n`,
          hints: ["above(bp) = (min-width: breakpoints[bp]px)",
            "between(bpA, bpB) = (min-width: A) and (max-width: B-1)",
            "mediaQuery calls above() to get the condition",
          ],
          test_cases: [
            { description: `above('md') = (min-width: 768px)`, expected_output: `(min-width: 768px)` },
            { description: `between('sm', 'lg') = correct range`, expected_output: `(min-width: 640px) and (max-width: 1023px)` },
            { description: `mediaQuery contains @media`, expected_output: `@media (min-width: 768px) { display: flex }` },
          ],
          xp_reward: 500,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },

    // ─── Unit 4: Animations ───────────────────────────────────
    {
      id: "css-u4",
      track_id: "css",
      title: "Transitions & Animations",
      description: `Bring your UI to life with CSS animations`,
      icon: "zap",
      order_index: 4,
      lessons: [
        {
          id: "css-u4-l1",
          unit_id: "css-u4",
          track_id: "css",
          type: "challenge",
          title: "CSS Transitions",
          explanation_md: `# CSS Transitions

Transitions animate changes from one state to another:

\`\`\`css
.button {
  background: blue;
  transition: background 0.3s ease, transform 0.2s;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}
\`\`\`

**Transition shorthand:** \`property duration timing-function delay\`

**Timing functions:** \`ease\`, \`linear\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`, \`cubic-bezier(...)\`

## Your Task
Write \`buildTransition(properties)\` where \`properties\` is an array of \`{name, duration, easing}\` objects. Return the full \`transition\` CSS value.`,
          starter_code: `function buildTransition(properties) {\n  // Return: "name1 dur1 ease1, name2 dur2 ease2, ..."\n}\n\nconst t = buildTransition([\n  {name: "background", duration: "0.3s", easing: "ease"},\n  {name: "transform",  duration: "0.2s", easing: "ease-out"},\n]);\nconsole.log(t);\n// background 0.3s ease, transform 0.2s ease-out\n`,
          reference_solution: `function buildTransition(properties) {\n  return properties\n    .map(p => \`\${p.name} \${p.duration} \${p.easing}\`)\n    .join(", ");\n}\n\nconst t = buildTransition([\n  {name: "background", duration: "0.3s", easing: "ease"},\n  {name: "transform",  duration: "0.2s", easing: "ease-out"},\n]);\nconsole.log(t);\n`,
          hints: ["Map each property to 'name duration easing' string", "Join with ', ' (comma + space)", ],
          test_cases: [{ description: `Transition string is correct`, expected_output: `background 0.3s ease, transform 0.2s ease-out` }],
          xp_reward: 100,
          order_index: 1,
          execution_engine: "browser",
        },
        {
          id: "css-u4-l2",
          unit_id: "css-u4",
          track_id: "css",
          type: "challenge",
          title: "Keyframe Animations",
          explanation_md: `# Keyframe Animations

\`@keyframes\` define multi-step animations:

\`\`\`css
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.button {
  animation: pulse 1s ease-in-out infinite;
}
\`\`\`

**Animation shorthand:** \`name duration timing iteration direction fill-mode\`

## Your Task
Write \`parseAnimation(anim)\` that parses an animation shorthand string and returns its components.

\`parseAnimation("pulse 1s ease-in-out infinite")\` → \`{name: "pulse", duration: "1s", timing: "ease-in-out", iteration: "infinite"}\``,
          starter_code: `function parseAnimation(anim) {\n  // Parse "name duration timing iteration" into an object\n  const parts = anim.trim().split(/\\s+/);\n  // Identify each part by its format\n}\n\nconst result = parseAnimation("pulse 1s ease-in-out infinite");\nconsole.log(result.name);      // pulse\nconsole.log(result.duration);  // 1s\nconsole.log(result.timing);    // ease-in-out\nconsole.log(result.iteration); // infinite\n`,
          reference_solution: `function parseAnimation(anim) {\n  const parts = anim.trim().split(/\\s+/);\n  const timings = ["ease", "linear", "ease-in", "ease-out", "ease-in-out"];\n  const durations = /^[\\d.]+s$|^[\\d.]+ms$/;\n  const result = {};\n  for (const part of parts) {\n    if (timings.includes(part)) result.timing = part;\n    else if (durations.test(part) && !result.duration) result.duration = part;\n    else if (part === "infinite" || /^\\d+$/.test(part)) result.iteration = part;\n    else if (!result.name) result.name = part;\n  }\n  return result;\n}\n\nconst result = parseAnimation("pulse 1s ease-in-out infinite");\nconsole.log(result.name);\nconsole.log(result.duration);\nconsole.log(result.timing);\nconsole.log(result.iteration);\n`,
          hints: ["Parse each part by checking its format", "Duration matches /^[\\d.]+s$/ or /^[\\d.]+ms$/",
            "Known timing functions: ease, linear, ease-in, ease-out, ease-in-out",
            "iteration is 'infinite' or a number",
            "The first unrecognized word is the name",
          ],
          test_cases: [
            { description: `name is pulse`, expected_output: `pulse` },
            { description: `duration is 1s`, expected_output: `1s` },
            { description: `timing is ease-in-out`, expected_output: `ease-in-out` },
            { description: `iteration is infinite`, expected_output: `infinite` },
          ],
          xp_reward: 150,
          order_index: 2,
          execution_engine: "browser",
        },
        {
          id: "css-u4-l3",
          unit_id: "css-u4",
          track_id: "css",
          type: "challenge",
          title: "Transforms",
          explanation_md: `# CSS Transforms

Transforms modify an element's appearance without affecting layout:

\`\`\`css
.card {
  transform: translate(50px, 20px);  /* move */
  transform: scale(1.5);             /* scale */
  transform: rotate(45deg);          /* rotate */
  transform: skew(10deg, 5deg);      /* skew */

  /* Combine: */
  transform: translateX(-50%) rotate(15deg) scale(0.9);
}
\`\`\`

## Your Task
Write \`buildTransform(operations)\` where operations is an array of \`{type, values}\` objects. Return the combined transform string.`,
          starter_code: `function buildTransform(operations) {\n  // Build "type1(values1) type2(values2) ..." string\n}\n\nconst t = buildTransform([\n  {type: "translateX", values: ["-50%"]},\n  {type: "rotate", values: ["15deg"]},\n  {type: "scale", values: [0.9]},\n]);\nconsole.log(t);\n// translateX(-50%) rotate(15deg) scale(0.9)\n`,
          reference_solution: `function buildTransform(operations) {\n  return operations\n    .map(op => \`\${op.type}(\${op.values.join(", ")})\`)\n    .join(" ");\n}\n\nconst t = buildTransform([\n  {type: "translateX", values: ["-50%"]},\n  {type: "rotate", values: ["15deg"]},\n  {type: "scale", values: [0.9]},\n]);\nconsole.log(t);\n`,
          hints: ["Map each operation to 'type(values)' string", "Join values array with ', '", "Join operations with ' ' (space)", ],
          test_cases: [{ description: `Transform string is correct`, expected_output: `translateX(-50%) rotate(15deg) scale(0.9)` }],
          xp_reward: 125,
          order_index: 3,
          execution_engine: "browser",
        },
        {
          id: "css-u4-l4",
          unit_id: "css-u4",
          track_id: "css",
          type: "boss",
          title: "Boss: Animation Library",
          explanation_md: `# Boss: Animation Library

Build a mini CSS animation library!

Create an \`Animate\` object with these preset animations that return CSS animation strings:
- \`Animate.fadeIn(duration)\` → \`"fadeIn Xs ease both"\`
- \`Animate.slideUp(duration, delay)\` → \`"slideUp Xs ease Ys both"\`
- \`Animate.pulse(duration, iterations)\` → \`"pulse Xs ease Ni ease"\`
- \`Animate.bounce(duration)\` → \`"bounce Xs cubic-bezier(0.36,0.07,0.19,0.97) both"\`

All durations and delays are numbers (seconds).`,
          starter_code: `const Animate = {\n  fadeIn(duration) {\n    // Return animation string\n  },\n  slideUp(duration, delay = 0) {\n    // Return animation string with delay\n  },\n  pulse(duration, iterations = "infinite") {\n    // Return animation string\n  },\n  bounce(duration) {\n    // Return animation string\n  },\n};\n\nconsole.log(Animate.fadeIn(0.3));\nconsole.log(Animate.slideUp(0.5, 0.2));\nconsole.log(Animate.pulse(1));\nconsole.log(Animate.bounce(0.6));\n`,
          reference_solution: `const Animate = {\n  fadeIn(duration) {\n    return \`fadeIn \${duration}s ease both\`;\n  },\n  slideUp(duration, delay = 0) {\n    return \`slideUp \${duration}s ease \${delay}s both\`;\n  },\n  pulse(duration, iterations = "infinite") {\n    return \`pulse \${duration}s ease \${iterations} ease\`;\n  },\n  bounce(duration) {\n    return \`bounce \${duration}s cubic-bezier(0.36,0.07,0.19,0.97) both\`;\n  },\n};\n\nconsole.log(Animate.fadeIn(0.3));\nconsole.log(Animate.slideUp(0.5, 0.2));\nconsole.log(Animate.pulse(1));\nconsole.log(Animate.bounce(0.6));\n`,
          hints: ["Use template literals with ${duration}s format", "slideUp includes a delay before 'both'", "pulse uses the iterations parameter (default 'infinite')", ],
          test_cases: [
            { description: `fadeIn(0.3) output`, expected_output: `fadeIn 0.3s ease both` },
            { description: `slideUp(0.5, 0.2) output`, expected_output: `slideUp 0.5s ease 0.2s both` },
            { description: `pulse(1) output`, expected_output: `pulse 1s ease infinite ease` },
            { description: `bounce(0.6) output`, expected_output: `bounce 0.6s cubic-bezier(0.36,0.07,0.19,0.97) both` },
          ],
          xp_reward: 500,
          order_index: 4,
          execution_engine: "browser",
        },
      ],
    },
  ],
};
