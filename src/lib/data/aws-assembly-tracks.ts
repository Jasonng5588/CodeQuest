import { StaticTrack } from "./lesson-content";

// ─── AWS Track ─────────────────────────────────────────────
export const AWS_TRACK: StaticTrack = {
  id: "aws",
  title: "AWS",
  description: `Cloud fundamentals. EC2, S3, Lambda, RDS, and cloud architecture patterns.`,
  color: "#ff9900",
  difficulty_curve: "advanced",
  execution_engine: "browser",
  category: "devops",
  order_index: 72,
  is_published: true,
  estimated_hours: 30,
  learner_count: 11200,
  units: [
    {
      id: "aws-u1", track_id: "aws",
      title: "AWS Core Services", icon: "cloud", order_index: 1,
      description: "S3, Lambda, EC2, IAM, and cloud architecture fundamentals",
      lessons: [
        {
          id: "aws-u1-l1", unit_id: "aws-u1", track_id: "aws",
          type: "concept", order_index: 1, xp_reward: 75, execution_engine: "browser",
          title: "S3 — Object Storage",
          explanation_md: `# Amazon S3 — Simple Storage Service

S3 stores files as **objects** inside **buckets**. Each object has a key (path), value (data), and metadata.

## Core Concepts
\`\`\`
Bucket: my-app-assets         ← globally unique name
  └── images/                 ← "folder" (just a key prefix)
      └── avatar.png          ← object key
  └── uploads/2024/           
      └── report.pdf

// Object key = full path: "images/avatar.png"
\`\`\`

## S3 Storage Classes
| Class | Use Case | Cost |
|-------|----------|------|
| **Standard** | Frequently accessed | $$$ |
| **Standard-IA** | Infrequently accessed | $$ |
| **Glacier** | Archive (minutes to restore) | $ |
| **Glacier Deep Archive** | Long-term archive (hours) | ¢ |

## Key S3 Features
- **Versioning** — keep all versions of an object
- **Lifecycle policies** — auto-transition between storage classes
- **Presigned URLs** — time-limited access to private objects
- **Static website hosting** — serve HTML/CSS/JS directly from S3

## SDK Operations
\`\`\`js
const s3 = new AWS.S3();

// Upload
await s3.putObject({ Bucket, Key, Body, ContentType }).promise();

// Download
const obj = await s3.getObject({ Bucket, Key }).promise();

// List
const list = await s3.listObjectsV2({ Bucket, Prefix: 'images/' }).promise();

// Generate presigned URL (valid 1 hour)
const url = s3.getSignedUrl('getObject', { Bucket, Key, Expires: 3600 });

// Delete
await s3.deleteObject({ Bucket, Key }).promise();
\`\`\`

## Your Task
Simulate an S3 bucket with CRUD operations:`,
          starter_code: `// Simulate Amazon S3 bucket operations
class S3Bucket {
  constructor(name) {
    this.name = name;
    this.objects = new Map(); // key → { body, contentType, size, lastModified }
    this.versioning = false;
    this.versions = new Map(); // key → [versions]
  }

  putObject(key, body, contentType = "application/octet-stream") {
    const obj = {
      key,
      body,
      contentType,
      size: body.length,
      lastModified: new Date().toISOString(),
      etag: '"' + Math.abs(body.split('').reduce((h, c) => (h << 5) - h + c.charCodeAt(0), 0)).toString(16) + '"',
    };
    this.objects.set(key, obj);
    return { ETag: obj.etag };
  }

  getObject(key) {
    const obj = this.objects.get(key);
    if (!obj) throw new Error(\`NoSuchKey: The key '\${key}' does not exist\`);
    return obj;
  }

  deleteObject(key) {
    if (!this.objects.has(key)) throw new Error(\`NoSuchKey: '\${key}'\`);
    this.objects.delete(key);
    return { DeleteMarker: false };
  }

  listObjects(prefix = "") {
    const items = [];
    for (const [key, obj] of this.objects) {
      if (key.startsWith(prefix)) {
        items.push({ key, size: obj.size, lastModified: obj.lastModified });
      }
    }
    return { Contents: items, KeyCount: items.length };
  }

  getSignedUrl(key, expiresIn = 3600) {
    if (!this.objects.has(key)) throw new Error(\`NoSuchKey: '\${key}'\`);
    const expiry = Date.now() + expiresIn * 1000;
    return \`https://\${this.name}.s3.amazonaws.com/\${key}?Expires=\${expiry}&Signature=abc123\`;
  }
}

// Run S3 operations
const bucket = new S3Bucket("my-app-assets");

// Upload objects
bucket.putObject("images/avatar.png", "PNG_DATA_HERE", "image/png");
bucket.putObject("images/banner.jpg", "JPG_DATA_HERE_LARGER", "image/jpeg");
bucket.putObject("docs/readme.txt", "Welcome to my app!", "text/plain");
bucket.putObject("docs/guide.pdf", "PDF_BINARY_CONTENT_HERE", "application/pdf");

// List images folder
const imageList = bucket.listObjects("images/");
console.log("Images folder (" + imageList.KeyCount + " objects):");
imageList.Contents.forEach(o => console.log("  " + o.key + " (" + o.size + " bytes)"));

// Get single object
const doc = bucket.getObject("docs/readme.txt");
console.log("\nreadme.txt content: " + doc.body);

// Presigned URL
const url = bucket.getSignedUrl("images/avatar.png", 3600);
console.log("Presigned URL: " + url.substring(0, 50) + "...");

// Delete and verify
bucket.deleteObject("images/banner.jpg");
const afterDelete = bucket.listObjects("images/");
console.log("\nAfter delete: " + afterDelete.KeyCount + " image(s)");

// Try to get deleted object
try {
  bucket.getObject("images/banner.jpg");
} catch (e) {
  console.log("Error: " + e.message);
}
`,
          reference_solution: `class S3Bucket{constructor(n){this.name=n;this.objects=new Map();}
putObject(k,b,ct="application/octet-stream"){const o={key:k,body:b,contentType:ct,size:b.length,lastModified:new Date().toISOString(),etag:'"'+Math.abs(b.split('').reduce((h,c)=>(h<<5)-h+c.charCodeAt(0),0)).toString(16)+'"'};this.objects.set(k,o);return{ETag:o.etag};}
getObject(k){const o=this.objects.get(k);if(!o)throw new Error(\`NoSuchKey: The key '\${k}' does not exist\`);return o;}
deleteObject(k){if(!this.objects.has(k))throw new Error(\`NoSuchKey: '\${k}'\`);this.objects.delete(k);return{DeleteMarker:false};}
listObjects(prefix=""){const i=[];for(const[k,o]of this.objects)if(k.startsWith(prefix))i.push({key:k,size:o.size,lastModified:o.lastModified});return{Contents:i,KeyCount:i.length};}
getSignedUrl(k,e=3600){if(!this.objects.has(k))throw new Error(\`NoSuchKey: '\${k}'\`);return\`https://\${this.name}.s3.amazonaws.com/\${k}?Expires=\${Date.now()+e*1000}&Signature=abc123\`;}}
const b=new S3Bucket("my-app-assets");
b.putObject("images/avatar.png","PNG_DATA_HERE","image/png");b.putObject("images/banner.jpg","JPG_DATA_HERE_LARGER","image/jpeg");b.putObject("docs/readme.txt","Welcome to my app!","text/plain");b.putObject("docs/guide.pdf","PDF_BINARY_CONTENT_HERE","application/pdf");
const il=b.listObjects("images/");console.log("Images folder ("+il.KeyCount+" objects):");il.Contents.forEach(o=>console.log("  "+o.key+" ("+o.size+" bytes)"));
console.log("\\nreadme.txt content: "+b.getObject("docs/readme.txt").body);
console.log("Presigned URL: "+b.getSignedUrl("images/avatar.png",3600).substring(0,50)+"...");
b.deleteObject("images/banner.jpg");const ad=b.listObjects("images/");console.log("\\nAfter delete: "+ad.KeyCount+" image(s)");
try{b.getObject("images/banner.jpg");}catch(e){console.log("Error: "+e.message);}
`,
          hints: [
            "listObjects('images/') filters by key prefix — 2 image objects",
            "deleteObject removes from the Map; subsequent getObject throws NoSuchKey",
            "getSignedUrl generates a time-limited URL including bucket name and key",
          ],
          test_cases: [
            { description: "Images folder has 2 objects", expected_output: "Images folder (2 objects):" },
            { description: "readme.txt content is correct", expected_output: "readme.txt content: Welcome to my app!" },
            { description: "After delete, 1 image remains", expected_output: "After delete: 1 image(s)" },
            { description: "Deleted object throws NoSuchKey", expected_output: "Error: NoSuchKey: The key 'images/banner.jpg' does not exist" },
          ],
        },
        {
          id: "aws-u1-l2", unit_id: "aws-u1", track_id: "aws",
          type: "challenge", order_index: 2, xp_reward: 125, execution_engine: "browser",
          title: "Lambda — Serverless Functions",
          explanation_md: `# AWS Lambda — Serverless Computing

Lambda runs code **without managing servers**. You pay only for execution time.

## How Lambda Works
\`\`\`
Event → Lambda Trigger → Your Function Runs → Response
         (S3, API GW,     (max 15 min,         (or stored
          SQS, DynamoDB,   128MB–10GB RAM)       to S3/DB)
          Schedule, etc.)
\`\`\`

## Lambda Handler
\`\`\`js
// handler.js
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event));
  
  // Process API Gateway event
  const { httpMethod, path, body, queryStringParameters } = event;
  const data = body ? JSON.parse(body) : {};
  
  try {
    const result = await processRequest(data);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
\`\`\`

## Lambda Triggers
| Trigger | Use Case |
|---------|----------|
| API Gateway | HTTP endpoints (REST/WebSocket) |
| S3 events | Process uploaded files |
| SQS | Process message queues |
| EventBridge | Scheduled jobs (cron) |
| DynamoDB Streams | React to DB changes |

## Cold Start vs Warm Start
- **Cold start** — Lambda container must spin up (~100-500ms penalty)
- **Warm start** — container reused from previous invocation (fast)
- **Provisioned concurrency** — pre-warm containers (eliminates cold starts)

## Your Task
Simulate a Lambda function router handling API Gateway events:`,
          starter_code: `// Simulate AWS Lambda + API Gateway integration
class LambdaRuntime {
  constructor() {
    this.handlers = new Map();
    this.invocations = 0;
    this.coldStart = true;
  }

  register(name, handler) {
    this.handlers.set(name, handler);
  }

  async invoke(name, event) {
    const handler = this.handlers.get(name);
    if (!handler) throw new Error(\`Function '\${name}' not found\`);

    const wasCold = this.coldStart;
    this.coldStart = false;
    this.invocations++;

    const startTime = Date.now();
    const context = {
      functionName: name,
      remainingTimeInMillis: () => 15 * 60 * 1000,
      invocationCount: this.invocations,
    };

    const result = await handler(event, context);
    const duration = Date.now() - startTime;

    return { result, duration, coldStart: wasCold };
  }
}

// Define Lambda functions
const runtime = new LambdaRuntime();

// API Lambda: processes API Gateway events
runtime.register("api-handler", async (event, ctx) => {
  const { httpMethod, path, body, queryStringParameters } = event;
  const params = queryStringParameters || {};

  if (httpMethod === "GET" && path === "/users") {
    const users = [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob",   role: "user"  },
    ];
    const filtered = params.role ? users.filter(u => u.role === params.role) : users;
    return { statusCode: 200, body: JSON.stringify(filtered) };
  }

  if (httpMethod === "POST" && path === "/users") {
    const data = JSON.parse(body || "{}");
    if (!data.name) return { statusCode: 400, body: JSON.stringify({ error: "name required" }) };
    return { statusCode: 201, body: JSON.stringify({ id: 3, ...data }) };
  }

  return { statusCode: 404, body: JSON.stringify({ error: "Not Found" }) };
});

// S3 event processor Lambda
runtime.register("s3-processor", async (event, ctx) => {
  const records = event.Records || [];
  const processed = records.map(r => ({
    bucket: r.s3.bucket.name,
    key: r.s3.object.key,
    size: r.s3.object.size,
    action: r.eventName.includes("Put") ? "UPLOAD" : "DELETE",
  }));
  return { processed: processed.length, files: processed };
});

// Test invocations
async function runTests() {
  // Test 1: Cold start GET
  const r1 = await runtime.invoke("api-handler", {
    httpMethod: "GET", path: "/users",
    queryStringParameters: null, body: null,
  });
  console.log("GET /users → " + r1.result.statusCode + " (coldStart: " + r1.coldStart + ")");

  // Test 2: Warm start POST
  const r2 = await runtime.invoke("api-handler", {
    httpMethod: "POST", path: "/users",
    body: JSON.stringify({ name: "Charlie", role: "user" }), queryStringParameters: null,
  });
  console.log("POST /users → " + r2.result.statusCode + " (coldStart: " + r2.coldStart + ")");
  const created = JSON.parse(r2.result.body);
  console.log("Created user: " + created.name + " (id=" + created.id + ")");

  // Test 3: S3 event
  const r3 = await runtime.invoke("s3-processor", {
    Records: [
      { eventName: "ObjectCreated:Put", s3: { bucket: { name: "my-bucket" }, object: { key: "uploads/photo.jpg", size: 204800 } } },
      { eventName: "ObjectCreated:Put", s3: { bucket: { name: "my-bucket" }, object: { key: "uploads/doc.pdf",   size: 102400 } } },
    ]
  });
  console.log("S3 event processed: " + r3.result.processed + " files");
  r3.result.files.forEach(f => console.log("  " + f.action + ": " + f.key));
}

runTests();
`,
          reference_solution: `class LambdaRuntime{constructor(){this.handlers=new Map();this.invocations=0;this.coldStart=true;}
register(n,h){this.handlers.set(n,h);}
async invoke(n,event){const h=this.handlers.get(n);if(!h)throw new Error(\`Function '\${n}' not found\`);const c=this.coldStart;this.coldStart=false;this.invocations++;const ctx={functionName:n,remainingTimeInMillis:()=>900000,invocationCount:this.invocations};const r=await h(event,ctx);return{result:r,coldStart:c};}}
const rt=new LambdaRuntime();
rt.register("api-handler",async(ev,ctx)=>{const{httpMethod,path,body,queryStringParameters:q}=ev;const p=q||{};if(httpMethod==="GET"&&path==="/users"){const u=[{id:1,name:"Alice",role:"admin"},{id:2,name:"Bob",role:"user"}];const f=p.role?u.filter(x=>x.role===p.role):u;return{statusCode:200,body:JSON.stringify(f)};}if(httpMethod==="POST"&&path==="/users"){const d=JSON.parse(body||"{}");if(!d.name)return{statusCode:400,body:JSON.stringify({error:"name required"})};return{statusCode:201,body:JSON.stringify({id:3,...d})};}return{statusCode:404,body:JSON.stringify({error:"Not Found"})};});
rt.register("s3-processor",async(ev)=>{const r=(ev.Records||[]).map(r=>({bucket:r.s3.bucket.name,key:r.s3.object.key,size:r.s3.object.size,action:r.eventName.includes("Put")?"UPLOAD":"DELETE"}));return{processed:r.length,files:r};});
(async()=>{const r1=await rt.invoke("api-handler",{httpMethod:"GET",path:"/users",queryStringParameters:null,body:null});console.log("GET /users → "+r1.result.statusCode+" (coldStart: "+r1.coldStart+")");
const r2=await rt.invoke("api-handler",{httpMethod:"POST",path:"/users",body:JSON.stringify({name:"Charlie",role:"user"}),queryStringParameters:null});console.log("POST /users → "+r2.result.statusCode+" (coldStart: "+r2.coldStart+")");const cr=JSON.parse(r2.result.body);console.log("Created user: "+cr.name+" (id="+cr.id+")");
const r3=await rt.invoke("s3-processor",{Records:[{eventName:"ObjectCreated:Put",s3:{bucket:{name:"my-bucket"},object:{key:"uploads/photo.jpg",size:204800}}},{eventName:"ObjectCreated:Put",s3:{bucket:{name:"my-bucket"},object:{key:"uploads/doc.pdf",size:102400}}}]});console.log("S3 event processed: "+r3.result.processed+" files");r3.result.files.forEach(f=>console.log("  "+f.action+": "+f.key));})();
`,
          hints: [
            "First invocation is always a cold start, subsequent ones are warm",
            "POST /users with valid body returns 201 with the created user",
            "S3 event with 2 ObjectCreated:Put records → 2 UPLOAD actions",
          ],
          test_cases: [
            { description: "First GET is cold start", expected_output: "GET /users → 200 (coldStart: true)" },
            { description: "POST is warm start and creates user", expected_output: "POST /users → 201 (coldStart: false)" },
            { description: "Created user is Charlie id=3", expected_output: "Created user: Charlie (id=3)" },
            { description: "S3 event processes 2 files", expected_output: "S3 event processed: 2 files" },
          ],
        },
        {
          id: "aws-u1-l3", unit_id: "aws-u1", track_id: "aws",
          type: "challenge", order_index: 3, xp_reward: 150, execution_engine: "browser",
          title: "IAM — Identity & Access Management",
          explanation_md: `# AWS IAM — Identity & Access Management

IAM controls **who** can do **what** on **which** AWS resources.

## Core Concepts

### Principals
Who is making the request:
- **Users** — human (Alice, Bob)
- **Roles** — assumed by services (EC2 role, Lambda role)
- **Groups** — collection of users

### Policies (JSON)
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadOnly",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    },
    {
      "Sid": "DenyDelete",
      "Effect": "Deny",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
\`\`\`

## IAM Evaluation Logic
1. **Default Deny** — everything is denied unless explicitly allowed
2. **Explicit Deny** — overrides any Allow (Deny wins)
3. **Explicit Allow** — grants access

## Least Privilege Principle
Grant only the minimum permissions needed for a task.

## Your Task
Simulate an IAM policy evaluator:`,
          starter_code: `// Simulate AWS IAM policy evaluation
class IAMEvaluator {
  constructor(policies) {
    this.policies = policies; // Array of policy documents
  }

  // Evaluate if an action on a resource is allowed
  evaluate(principal, action, resource) {
    let hasAllow = false;

    for (const policy of this.policies) {
      if (policy.principal && policy.principal !== principal) continue;

      for (const stmt of policy.statements) {
        const actions = Array.isArray(stmt.action) ? stmt.action : [stmt.action];
        const resources = Array.isArray(stmt.resource) ? stmt.resource : [stmt.resource];

        const actionMatch = actions.some(a => this._match(action, a));
        const resourceMatch = resources.some(r => this._match(resource, r));

        if (actionMatch && resourceMatch) {
          if (stmt.effect === "Deny") return { allowed: false, reason: "Explicit Deny" };
          if (stmt.effect === "Allow") hasAllow = true;
        }
      }
    }
    return hasAllow
      ? { allowed: true, reason: "Explicit Allow" }
      : { allowed: false, reason: "Default Deny (no matching Allow)" };
  }

  // Match action/resource with wildcards (* and ?)
  _match(value, pattern) {
    if (pattern === "*") return true;
    const regex = new RegExp("^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
    return regex.test(value);
  }
}

// Define IAM policies
const s3ReadPolicy = {
  statements: [
    { effect: "Allow", action: ["s3:GetObject", "s3:ListBucket"],
      resource: ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"] },
  ]
};

const s3DenyDeletePolicy = {
  statements: [
    { effect: "Deny", action: "s3:DeleteObject",
      resource: "arn:aws:s3:::my-bucket/*" },
  ]
};

const adminPolicy = {
  statements: [
    { effect: "Allow", action: "*", resource: "*" },
  ]
};

// Evaluator for a read-only user (attached: read + deny-delete)
const readOnlyUser = new IAMEvaluator([s3ReadPolicy, s3DenyDeletePolicy]);
// Evaluator for admin user
const adminUser = new IAMEvaluator([adminPolicy]);

const tests = [
  ["readOnly", readOnlyUser, "s3:GetObject",    "arn:aws:s3:::my-bucket/photo.jpg"],
  ["readOnly", readOnlyUser, "s3:DeleteObject", "arn:aws:s3:::my-bucket/photo.jpg"],
  ["readOnly", readOnlyUser, "s3:PutObject",    "arn:aws:s3:::my-bucket/photo.jpg"],
  ["admin",    adminUser,    "ec2:TerminateInstances", "arn:aws:ec2:us-east-1:123:instance/i-abc"],
];

tests.forEach(([name, iam, action, resource]) => {
  const r = iam.evaluate(name, action, resource);
  const shortAction = action.split(":")[1];
  console.log(\`[\${name}] \${shortAction}: \${r.allowed ? "✓ ALLOW" : "✗ DENY"} (\${r.reason})\`);
});
`,
          reference_solution: `class IAMEvaluator{constructor(p){this.policies=p;}
evaluate(principal,action,resource){let allow=false;for(const p of this.policies){if(p.principal&&p.principal!==principal)continue;for(const s of p.statements){const acts=Array.isArray(s.action)?s.action:[s.action];const res=Array.isArray(s.resource)?s.resource:[s.resource];const am=acts.some(a=>this._match(action,a));const rm=res.some(r=>this._match(resource,r));if(am&&rm){if(s.effect==="Deny")return{allowed:false,reason:"Explicit Deny"};if(s.effect==="Allow")allow=true;}}}return allow?{allowed:true,reason:"Explicit Allow"}:{allowed:false,reason:"Default Deny (no matching Allow)"};}
_match(v,p){if(p==="*")return true;return new RegExp("^"+p.replace(/\*/g,".*").replace(/\?/g,".")+"$").test(v);}}
const s3r={statements:[{effect:"Allow",action:["s3:GetObject","s3:ListBucket"],resource:["arn:aws:s3:::my-bucket","arn:aws:s3:::my-bucket/*"]}]};
const s3d={statements:[{effect:"Deny",action:"s3:DeleteObject",resource:"arn:aws:s3:::my-bucket/*"}]};
const adm={statements:[{effect:"Allow",action:"*",resource:"*"}]};
const ro=new IAMEvaluator([s3r,s3d]);const au=new IAMEvaluator([adm]);
[["readOnly",ro,"s3:GetObject","arn:aws:s3:::my-bucket/photo.jpg"],["readOnly",ro,"s3:DeleteObject","arn:aws:s3:::my-bucket/photo.jpg"],["readOnly",ro,"s3:PutObject","arn:aws:s3:::my-bucket/photo.jpg"],["admin",au,"ec2:TerminateInstances","arn:aws:ec2:us-east-1:123:instance/i-abc"]].forEach(([n,iam,a,r])=>{const res=iam.evaluate(n,a,r);console.log(\`[\${n}] \${a.split(":")[1]}: \${res.allowed?"✓ ALLOW":"✗ DENY"} (\${res.reason})\`);});
`,
          hints: [
            "GetObject is allowed by s3ReadPolicy → ✓ ALLOW",
            "DeleteObject is explicitly denied even though no Allow exists → ✗ DENY (Deny wins)",
            "PutObject has no Allow rule → ✗ DENY (Default Deny)",
            "Admin policy has Action:* Resource:* → ✓ ALLOW for everything",
          ],
          test_cases: [
            { description: "GetObject is allowed", expected_output: "[readOnly] GetObject: ✓ ALLOW (Explicit Allow)" },
            { description: "DeleteObject is explicitly denied", expected_output: "[readOnly] DeleteObject: ✗ DENY (Explicit Deny)" },
            { description: "PutObject hits default deny", expected_output: "[readOnly] PutObject: ✗ DENY (Default Deny (no matching Allow))" },
            { description: "Admin can terminate EC2", expected_output: "[admin] TerminateInstances: ✓ ALLOW (Explicit Allow)" },
          ],
        },
        {
          id: "aws-u1-l4", unit_id: "aws-u1", track_id: "aws",
          type: "boss", order_index: 4, xp_reward: 600, execution_engine: "browser",
          title: "Boss: Serverless Architecture",
          explanation_md: `# Boss: Build a Serverless Application

Design and simulate a complete serverless architecture:

\`\`\`
Client → API Gateway → Lambda → DynamoDB
                    ↘ S3 (file uploads)
                    ↘ SES (email notifications)

CloudWatch → Alarms → SNS → Lambda (auto-remediation)
EventBridge (cron) → Lambda (scheduled jobs)
\`\`\`

## Architecture Components

### API Layer
- **API Gateway** routes HTTP requests
- **Lambda** handles business logic (stateless)
- **Cognito** authenticates users (JWT tokens)

### Data Layer
- **DynamoDB** — key-value / document NoSQL (millisecond latency)
- **RDS Aurora Serverless** — relational, auto-scales to zero
- **ElastiCache** — Redis/Memcached caching layer

### Async Processing
- **SQS** — reliable message queue (guaranteed delivery)
- **SNS** — pub/sub fan-out to multiple subscribers
- **EventBridge** — event bus + scheduled rules

## Your Task
Simulate a complete order processing pipeline:`,
          starter_code: `// Simulate a serverless order processing pipeline
class EventBus {
  constructor() { this.subscribers = new Map(); }
  subscribe(event, handler) {
    if (!this.subscribers.has(event)) this.subscribers.set(event, []);
    this.subscribers.get(event).push(handler);
  }
  async publish(event, data) {
    const handlers = this.subscribers.get(event) || [];
    const results = await Promise.all(handlers.map(h => h(data)));
    return results;
  }
}

class DynamoDB {
  constructor() { this.tables = new Map(); }
  put(table, item) {
    if (!this.tables.has(table)) this.tables.set(table, new Map());
    this.tables.get(table).set(item.pk, item);
  }
  get(table, pk) { return this.tables.get(table)?.get(pk) || null; }
  query(table, filter) {
    const items = [...(this.tables.get(table)?.values() || [])];
    return items.filter(filter);
  }
}

// Services
const bus = new EventBus();
const db  = new DynamoDB();
const log = [];

// Lambda: Process Order
const processOrder = async (order) => {
  const orderId = "ORD-" + Math.random().toString(36).substr(2, 8).toUpperCase();
  const record = { pk: orderId, ...order, status: "pending", createdAt: new Date().toISOString() };
  db.put("orders", record);
  log.push(\`[Lambda:processOrder] Created order \${orderId} for \${order.customer}\`);
  await bus.publish("order:created", record);
  return { orderId, status: "pending" };
};

// Lambda: Send confirmation email
bus.subscribe("order:created", async (order) => {
  log.push(\`[Lambda:emailService] Sending confirmation to \${order.customer} for order \${order.pk}\`);
  return { sent: true };
});

// Lambda: Update inventory
bus.subscribe("order:created", async (order) => {
  const reserved = order.items.reduce((sum, item) => sum + item.qty, 0);
  log.push(\`[Lambda:inventory] Reserved \${reserved} unit(s) for order \${order.pk}\`);
  return { reserved };
});

// Lambda: Scheduled job — mark stale pending orders
const cleanupStaleOrders = async () => {
  const pending = db.query("orders", o => o.status === "pending");
  log.push(\`[Lambda:cleanup] Found \${pending.length} pending order(s) to review\`);
  return pending.length;
};

// Run the pipeline
(async () => {
  console.log("=== Serverless Order Pipeline ===\\n");

  // Create 2 orders
  const o1 = await processOrder({
    customer: "alice@example.com",
    items: [{ sku: "LAPTOP-01", qty: 1, price: 999 }, { sku: "MOUSE-02", qty: 2, price: 29 }],
    total: 1057,
  });
  console.log("Order created:", o1.orderId, "→", o1.status);

  const o2 = await processOrder({
    customer: "bob@example.com",
    items: [{ sku: "MONITOR-01", qty: 1, price: 399 }],
    total: 399,
  });
  console.log("Order created:", o2.orderId, "→", o2.status);

  // Scheduled cleanup
  const stale = await cleanupStaleOrders();
  console.log("Stale orders found:", stale);

  // Show full event log
  console.log("\\n=== Event Log ===");
  log.forEach(entry => console.log(entry));
})();
`,
          reference_solution: `class EventBus{constructor(){this.subscribers=new Map();}subscribe(e,h){if(!this.subscribers.has(e))this.subscribers.set(e,[]);this.subscribers.get(e).push(h);}async publish(e,d){return Promise.all((this.subscribers.get(e)||[]).map(h=>h(d)));}}
class DynamoDB{constructor(){this.tables=new Map();}put(t,i){if(!this.tables.has(t))this.tables.set(t,new Map());this.tables.get(t).set(i.pk,i);}get(t,pk){return this.tables.get(t)?.get(pk)||null;}query(t,f){return[...(this.tables.get(t)?.values()||[])].filter(f);}}
const bus=new EventBus();const db=new DynamoDB();const log=[];
const processOrder=async(o)=>{const id="ORD-"+Math.random().toString(36).substr(2,8).toUpperCase();const r={pk:id,...o,status:"pending",createdAt:new Date().toISOString()};db.put("orders",r);log.push(\`[Lambda:processOrder] Created order \${id} for \${o.customer}\`);await bus.publish("order:created",r);return{orderId:id,status:"pending"};};
bus.subscribe("order:created",async o=>{log.push(\`[Lambda:emailService] Sending confirmation to \${o.customer} for order \${o.pk}\`);return{sent:true};});
bus.subscribe("order:created",async o=>{const res=o.items.reduce((s,i)=>s+i.qty,0);log.push(\`[Lambda:inventory] Reserved \${res} unit(s) for order \${o.pk}\`);return{reserved:res};});
const cleanup=async()=>{const p=db.query("orders",o=>o.status==="pending");log.push(\`[Lambda:cleanup] Found \${p.length} pending order(s) to review\`);return p.length;};
(async()=>{console.log("=== Serverless Order Pipeline ===\\n");
const o1=await processOrder({customer:"alice@example.com",items:[{sku:"LAPTOP-01",qty:1,price:999},{sku:"MOUSE-02",qty:2,price:29}],total:1057});console.log("Order created:",o1.orderId,"→",o1.status);
const o2=await processOrder({customer:"bob@example.com",items:[{sku:"MONITOR-01",qty:1,price:399}],total:399});console.log("Order created:",o2.orderId,"→",o2.status);
const s=await cleanup();console.log("Stale orders found:",s);
console.log("\\n=== Event Log ===");log.forEach(e=>console.log(e));})();
`,
          hints: [
            "Each processOrder publishes 'order:created' which triggers 2 Lambda subscribers (email + inventory)",
            "Alice orders 1 laptop + 2 mice = 3 units reserved",
            "After 2 orders, cleanup finds 2 pending orders",
            "Event log shows all Lambda invocations in sequence",
          ],
          test_cases: [
            { description: "First order created with pending status", expected_output: "Order created: ORD-" },
            { description: "Cleanup finds 2 pending orders", expected_output: "Stale orders found: 2" },
            { description: "Email lambda fires for order 1", expected_output: "[Lambda:emailService] Sending confirmation to alice@example.com" },
            { description: "Inventory lambda reserves 3 units for Alice", expected_output: "[Lambda:inventory] Reserved 3 unit(s) for order ORD-" },
          ],
        },
      ],
    },
  ],
};

// ─── Assembly Track ────────────────────────────────────────
export const ASSEMBLY_TRACK: StaticTrack = {
  id: "assembly",
  title: "Assembly",
  description: `Talk directly to the CPU. Registers, instructions, and the x86 simplified machine.`,
  color: "#6b7280",
  difficulty_curve: "advanced",
  execution_engine: "browser",
  category: "cs-theory",
  order_index: 82,
  is_published: true,
  estimated_hours: 20,
  learner_count: 2100,
  units: [
    {
      id: "asm-u1", track_id: "assembly",
      title: "x86 Assembly Fundamentals", icon: "cpu", order_index: 1,
      description: "Registers, MOV, arithmetic, flags, and branching in x86 assembly",
      lessons: [
        {
          id: "asm-u1-l1", unit_id: "asm-u1", track_id: "assembly",
          type: "concept", order_index: 1, xp_reward: 75, execution_engine: "browser",
          title: "Registers & MOV",
          explanation_md: `# Assembly: Registers & MOV

Assembly language talks directly to CPU hardware. Instead of variables, you use **registers** — tiny, ultra-fast storage slots built into the CPU.

## x86-64 General Purpose Registers
| Register | Alias | Purpose |
|----------|-------|---------|
| \`rax\` / \`eax\` | accumulator | Return values, arithmetic |
| \`rbx\` / \`ebx\` | base | Base pointer |
| \`rcx\` / \`ecx\` | counter | Loop counter |
| \`rdx\` / \`edx\` | data | I/O, multiplication |
| \`rsi\` / \`esi\` | source | String source |
| \`rdi\` / \`edi\` | destination | String destination, arg 1 |
| \`rsp\` | stack pointer | Top of stack |
| \`rbp\` | base pointer | Stack frame base |

## Size Variants
\`\`\`
rax  = 64-bit (8 bytes)
eax  = 32-bit (lower 4 bytes of rax)
ax   = 16-bit (lower 2 bytes)
al   = 8-bit  (lowest byte)
\`\`\`

## MOV Instruction
\`\`\`asm
; Syntax: MOV destination, source
MOV rax, 42        ; rax = 42
MOV rbx, rax       ; rbx = rax (copy)
MOV rcx, [rbx]     ; rcx = memory at address rbx (load)
MOV [rdi], rax     ; store rax at memory address rdi
MOV rax, 0x1F      ; hex literal
\`\`\`

## System Calls (Linux x86-64)
\`\`\`asm
; Print "Hello" using syscall
MOV rax, 1         ; syscall: write
MOV rdi, 1         ; fd: stdout
MOV rsi, msg       ; address of string
MOV rdx, 5         ; length = 5
SYSCALL

MOV rax, 60        ; syscall: exit
MOV rdi, 0         ; exit code 0
SYSCALL
\`\`\`

## Your Task
Simulate a CPU register file and MOV operations:`,
          starter_code: `// Simulate x86-64 registers and MOV instruction
class CPU {
  constructor() {
    // 64-bit general purpose registers (stored as numbers)
    this.registers = {
      rax: 0, rbx: 0, rcx: 0, rdx: 0,
      rsi: 0, rdi: 0, rsp: 0xFFFF, rbp: 0,
    };
    this.memory = new Map(); // address → value
    this.flags = { ZF: 0, SF: 0, OF: 0, CF: 0 }; // status flags
  }

  // MOV dest, src — move data between registers/memory
  MOV(dest, src) {
    const value = this._getValue(src);
    this._setValue(dest, value);
  }

  _getValue(operand) {
    if (typeof operand === "number") return operand;
    if (operand.startsWith("[") && operand.endsWith("]")) {
      const addr = this.registers[operand.slice(1, -1)];
      return this.memory.get(addr) ?? 0;
    }
    return this.registers[operand] ?? 0;
  }

  _setValue(dest, value) {
    if (dest.startsWith("[") && dest.endsWith("]")) {
      const addr = this.registers[dest.slice(1, -1)];
      this.memory.set(addr, value);
    } else {
      this.registers[dest] = value;
    }
  }

  dumpRegisters() {
    const regs = ["rax", "rbx", "rcx", "rdx", "rsi", "rdi"];
    regs.forEach(r => {
      if (this.registers[r] !== 0) {
        console.log(\`  \${r.padEnd(4)} = \${this.registers[r]} (0x\${this.registers[r].toString(16).toUpperCase()})\`);
      }
    });
  }
}

// Run assembly-like program
const cpu = new CPU();

console.log("=== Assembly Program: Register Operations ===");

// MOV immediate values into registers
cpu.MOV("rax", 42);         // rax = 42
cpu.MOV("rbx", 100);        // rbx = 100
cpu.MOV("rcx", "rax");      // rcx = rax = 42
cpu.MOV("rdx", "rbx");      // rdx = rbx = 100

console.log("After MOV operations:");
cpu.dumpRegisters();

// Store rax to memory address in rdi, then load it back
cpu.MOV("rdi", 0x1000);     // rdi = memory address 0x1000
cpu.MOV("[rdi]", "rax");    // memory[0x1000] = rax = 42
cpu.MOV("rsi", 0x1000);     // rsi = 0x1000
cpu.MOV("rax", 0);          // clear rax
cpu.MOV("rax", "[rsi]");    // rax = memory[0x1000] = 42

console.log("\\nAfter memory store/load:");
console.log("  rax =", cpu.registers.rax, "(restored from memory)");
console.log("  memory[0x1000] =", cpu.memory.get(0x1000));
`,
          reference_solution: `class CPU{constructor(){this.registers={rax:0,rbx:0,rcx:0,rdx:0,rsi:0,rdi:0,rsp:0xFFFF,rbp:0};this.memory=new Map();this.flags={ZF:0,SF:0,OF:0,CF:0};}
MOV(d,s){this._setValue(d,this._getValue(s));}
_getValue(o){if(typeof o==="number")return o;if(o.startsWith("[")&&o.endsWith("]"))return this.memory.get(this.registers[o.slice(1,-1)])??0;return this.registers[o]??0;}
_setValue(d,v){if(d.startsWith("[")&&d.endsWith("]"))this.memory.set(this.registers[d.slice(1,-1)],v);else this.registers[d]=v;}
dumpRegisters(){["rax","rbx","rcx","rdx","rsi","rdi"].forEach(r=>{if(this.registers[r]!==0)console.log(\`  \${r.padEnd(4)} = \${this.registers[r]} (0x\${this.registers[r].toString(16).toUpperCase()})\`);});}}
const cpu=new CPU();
console.log("=== Assembly Program: Register Operations ===");
cpu.MOV("rax",42);cpu.MOV("rbx",100);cpu.MOV("rcx","rax");cpu.MOV("rdx","rbx");
console.log("After MOV operations:");cpu.dumpRegisters();
cpu.MOV("rdi",0x1000);cpu.MOV("[rdi]","rax");cpu.MOV("rsi",0x1000);cpu.MOV("rax",0);cpu.MOV("rax","[rsi]");
console.log("\\nAfter memory store/load:");
console.log("  rax =",cpu.registers.rax,"(restored from memory)");
console.log("  memory[0x1000] =",cpu.memory.get(0x1000));
`,
          hints: [
            "MOV rcx, rax copies rax's value (42) into rcx",
            "[rdi] means memory at address stored in rdi — store/load operations",
            "After zeroing rax and loading from memory[0x1000], rax becomes 42 again",
          ],
          test_cases: [
            { description: "rax = 42 after MOV", expected_output: "  rax  = 42 (0x2A)" },
            { description: "rbx = 100 after MOV", expected_output: "  rbx  = 100 (0x64)" },
            { description: "rax restored from memory as 42", expected_output: "  rax = 42 (restored from memory)" },
          ],
        },
        {
          id: "asm-u1-l2", unit_id: "asm-u1", track_id: "assembly",
          type: "challenge", order_index: 2, xp_reward: 125, execution_engine: "browser",
          title: "Arithmetic Instructions",
          explanation_md: `# Assembly Arithmetic

The CPU's ALU (Arithmetic Logic Unit) handles math operations:

## Arithmetic Instructions
\`\`\`asm
ADD rax, rbx      ; rax = rax + rbx
SUB rax, rbx      ; rax = rax - rbx
MUL rbx           ; rdx:rax = rax * rbx  (64-bit result in rdx:rax)
IMUL rbx          ; signed multiply
DIV rbx           ; rax = rdx:rax / rbx,  rdx = remainder
IDIV rbx          ; signed divide
INC rax           ; rax = rax + 1 (faster than ADD rax, 1)
DEC rax           ; rax = rax - 1
NEG rax           ; rax = -rax
\`\`\`

## Bitwise Instructions
\`\`\`asm
AND rax, rbx      ; rax = rax AND rbx   (bit mask)
OR  rax, rbx      ; rax = rax OR rbx
XOR rax, rax      ; rax = 0 (XOR with self = fastest clear)
NOT rax           ; rax = ~rax (flip all bits)
SHL rax, 3        ; rax = rax << 3  (multiply by 8)
SHR rax, 1        ; rax = rax >> 1  (divide by 2, unsigned)
SAR rax, 1        ; rax = rax >> 1  (divide by 2, signed — preserves sign)
\`\`\`

## Flags (set after arithmetic)
- **ZF** (Zero Flag) — set when result is 0
- **SF** (Sign Flag) — set when result is negative
- **CF** (Carry Flag) — set on unsigned overflow
- **OF** (Overflow Flag) — set on signed overflow

## Your Task
Implement an ALU simulator supporting ADD, SUB, MUL, DIV, SHL, SHR, XOR:`,
          starter_code: `// Simulate x86 ALU (Arithmetic Logic Unit)
class CPU {
  constructor() {
    this.registers = { rax: 0, rbx: 0, rcx: 0, rdx: 0 };
    this.flags = { ZF: 0, SF: 0, CF: 0, OF: 0 };
  }

  _setFlags(result, a, b, op) {
    this.flags.ZF = result === 0 ? 1 : 0;
    this.flags.SF = result < 0 ? 1 : 0;
    // Simplified overflow detection
    if (op === "ADD") this.flags.OF = (a > 0 && b > 0 && result < 0) ? 1 : 0;
    if (op === "SUB") this.flags.OF = (a > 0 && b < 0 && result < 0) ? 1 : 0;
  }

  MOV(dest, value) { this.registers[dest] = typeof value === "string" ? this.registers[value] : value; }

  ADD(dest, src) {
    const a = this.registers[dest], b = typeof src === "number" ? src : this.registers[src];
    const result = a + b;
    this._setFlags(result, a, b, "ADD");
    this.registers[dest] = result;
  }

  SUB(dest, src) {
    const a = this.registers[dest], b = typeof src === "number" ? src : this.registers[src];
    const result = a - b;
    this._setFlags(result, a, b, "SUB");
    this.registers[dest] = result;
  }

  IMUL(dest, src) {
    const a = this.registers[dest], b = typeof src === "number" ? src : this.registers[src];
    this.registers[dest] = a * b;
  }

  IDIV(divisor) {
    const b = this.registers[divisor];
    const quotient = Math.trunc(this.registers.rax / b);
    this.registers.rdx = this.registers.rax % b;  // remainder in rdx
    this.registers.rax = quotient;
  }

  SHL(dest, count) { this.registers[dest] = this.registers[dest] << count; }
  SHR(dest, count) { this.registers[dest] = this.registers[dest] >>> count; }
  XOR(dest, src)   { this.registers[dest] ^= (typeof src === "number" ? src : this.registers[src]); }
  INC(dest)        { this.registers[dest]++; }
  DEC(dest)        { this.registers[dest]--; }
}

const cpu = new CPU();

// Program 1: (10 + 5) * 3
console.log("=== Program 1: (10 + 5) * 3 ===");
cpu.MOV("rax", 10);
cpu.ADD("rax", 5);          // rax = 15
cpu.MOV("rbx", 3);
cpu.IMUL("rax", "rbx");     // rax = 45
console.log("Result: rax =", cpu.registers.rax);  // 45

// Program 2: 100 / 7 with remainder
console.log("\\n=== Program 2: 100 / 7 ===");
cpu.MOV("rax", 100);
cpu.MOV("rbx", 7);
cpu.IDIV("rbx");             // rax = quotient, rdx = remainder
console.log("Quotient: rax =", cpu.registers.rax);   // 14
console.log("Remainder: rdx =", cpu.registers.rdx);  // 2

// Program 3: Bit manipulation — multiply by 8 using SHL
console.log("\\n=== Program 3: 5 * 8 via SHL ===");
cpu.MOV("rax", 5);
cpu.SHL("rax", 3);           // rax = 5 << 3 = 40
console.log("5 << 3 =", cpu.registers.rax);  // 40

// Program 4: XOR to zero a register
console.log("\\n=== Program 4: XOR clear ===");
cpu.MOV("rcx", 0xDEAD);
cpu.XOR("rcx", "rcx");       // rcx = 0 (fastest way to clear)
console.log("After XOR rcx,rcx:", cpu.registers.rcx);  // 0
console.log("ZF =", cpu.flags.ZF);  // 1 (Zero Flag set)
`,
          reference_solution: `class CPU{constructor(){this.registers={rax:0,rbx:0,rcx:0,rdx:0};this.flags={ZF:0,SF:0,CF:0,OF:0};}
_setFlags(r,a,b,op){this.flags.ZF=r===0?1:0;this.flags.SF=r<0?1:0;if(op==="ADD")this.flags.OF=(a>0&&b>0&&r<0)?1:0;if(op==="SUB")this.flags.OF=(a>0&&b<0&&r<0)?1:0;}
MOV(d,v){this.registers[d]=typeof v==="string"?this.registers[v]:v;}
ADD(d,s){const a=this.registers[d],b=typeof s==="number"?s:this.registers[s];const r=a+b;this._setFlags(r,a,b,"ADD");this.registers[d]=r;}
SUB(d,s){const a=this.registers[d],b=typeof s==="number"?s:this.registers[s];const r=a-b;this._setFlags(r,a,b,"SUB");this.registers[d]=r;}
IMUL(d,s){const a=this.registers[d],b=typeof s==="number"?s:this.registers[s];this.registers[d]=a*b;}
IDIV(div){const b=this.registers[div];this.registers.rdx=this.registers.rax%b;this.registers.rax=Math.trunc(this.registers.rax/b);}
SHL(d,c){this.registers[d]=this.registers[d]<<c;}
SHR(d,c){this.registers[d]=this.registers[d]>>>c;}
XOR(d,s){this.registers[d]^=(typeof s==="number"?s:this.registers[s]);}
INC(d){this.registers[d]++;}DEC(d){this.registers[d]--;}}
const cpu=new CPU();
console.log("=== Program 1: (10 + 5) * 3 ===");cpu.MOV("rax",10);cpu.ADD("rax",5);cpu.MOV("rbx",3);cpu.IMUL("rax","rbx");console.log("Result: rax =",cpu.registers.rax);
console.log("\\n=== Program 2: 100 / 7 ===");cpu.MOV("rax",100);cpu.MOV("rbx",7);cpu.IDIV("rbx");console.log("Quotient: rax =",cpu.registers.rax);console.log("Remainder: rdx =",cpu.registers.rdx);
console.log("\\n=== Program 3: 5 * 8 via SHL ===");cpu.MOV("rax",5);cpu.SHL("rax",3);console.log("5 << 3 =",cpu.registers.rax);
console.log("\\n=== Program 4: XOR clear ===");cpu.MOV("rcx",0xDEAD);cpu.XOR("rcx","rcx");console.log("After XOR rcx,rcx:",cpu.registers.rcx);console.log("ZF =",cpu.flags.ZF);
`,
          hints: [
            "10 + 5 = 15, then 15 * 3 = 45",
            "100 / 7 = 14 quotient, 100 - (14*7) = 2 remainder",
            "SHL by 3 = multiply by 2³ = 8: 5 * 8 = 40",
            "XOR register with itself always = 0, so ZF=1",
          ],
          test_cases: [
            { description: "Program 1: 15 * 3 = 45", expected_output: "Result: rax = 45" },
            { description: "100 / 7 = 14 quotient", expected_output: "Quotient: rax = 14" },
            { description: "Remainder is 2", expected_output: "Remainder: rdx = 2" },
            { description: "5 << 3 = 40", expected_output: "5 << 3 = 40" },
            { description: "XOR clears to 0, ZF=1", expected_output: "ZF = 1" },
          ],
        },
        {
          id: "asm-u1-l3", unit_id: "asm-u1", track_id: "assembly",
          type: "challenge", order_index: 3, xp_reward: 150, execution_engine: "browser",
          title: "CMP & Branching",
          explanation_md: `# Assembly Branching: CMP & JMP

Unlike high-level \`if\`, assembly uses **compare** then **jump** instructions.

## CMP Instruction
\`CMP\` subtracts src from dest but **only updates flags** (doesn't store result):
\`\`\`asm
CMP rax, rbx    ; sets ZF, SF, CF based on (rax - rbx)
\`\`\`

## Jump Instructions
\`\`\`asm
JMP  label     ; unconditional jump
JE   label     ; Jump if Equal        (ZF=1)
JNE  label     ; Jump if Not Equal    (ZF=0)
JL   label     ; Jump if Less         (SF≠OF)
JLE  label     ; Jump if Less/Equal   (ZF=1 or SF≠OF)
JG   label     ; Jump if Greater      (ZF=0 and SF=OF)
JGE  label     ; Jump if ≥            (SF=OF)
JZ   label     ; Jump if Zero         (ZF=1) — same as JE
JNZ  label     ; Jump if Not Zero     (ZF=0) — same as JNE
\`\`\`

## High-Level to Assembly
\`\`\`c
// C code:
if (a > b) { result = a; } else { result = b; }
\`\`\`
\`\`\`asm
; Equivalent assembly (find max):
    MOV  rax, a       ; rax = a
    MOV  rbx, b       ; rbx = b
    CMP  rax, rbx     ; compare a vs b
    JGE  store_a      ; if a >= b, jump
    MOV  rax, rbx     ; else rax = b (b is larger)
store_a:
    MOV  [result], rax ; store result
\`\`\`

## Loop with Branch
\`\`\`asm
; Sum 1..10
    MOV rcx, 10    ; counter = 10
    MOV rax, 0     ; sum = 0
loop:
    ADD rax, rcx   ; sum += counter
    DEC rcx        ; counter--
    JNZ loop       ; if counter != 0, repeat
; rax = 55
\`\`\`

## Your Task
Simulate CMP + conditional jumps to compute max, min, and sum:`,
          starter_code: `// Simulate x86 CMP and conditional jump instructions
class CPU {
  constructor() {
    this.registers = { rax: 0, rbx: 0, rcx: 0, rdx: 0 };
    this.flags = { ZF: 0, SF: 0, OF: 0, CF: 0 };
  }
  MOV(d, s) { this.registers[d] = typeof s === "number" ? s : this.registers[s]; }
  ADD(d, s) { this.registers[d] += typeof s === "number" ? s : this.registers[s]; }
  SUB(d, s) { this.registers[d] -= typeof s === "number" ? s : this.registers[s]; }
  INC(d)    { this.registers[d]++; }
  DEC(d)    { this.registers[d]--; this.flags.ZF = this.registers[d] === 0 ? 1 : 0; }

  CMP(a, b) {
    const va = this.registers[a];
    const vb = typeof b === "number" ? b : this.registers[b];
    const result = va - vb;
    this.flags.ZF = result === 0 ? 1 : 0;
    this.flags.SF = result < 0 ? 1 : 0;
    this.flags.CF = va < vb ? 1 : 0;  // unsigned borrow
    this.flags.OF = ((va > 0 && vb < 0 && result < 0) || (va < 0 && vb > 0 && result > 0)) ? 1 : 0;
  }

  JE()  { return this.flags.ZF === 1; }
  JNE() { return this.flags.ZF === 0; }
  JL()  { return this.flags.SF !== this.flags.OF; }
  JG()  { return this.flags.ZF === 0 && this.flags.SF === this.flags.OF; }
  JGE() { return this.flags.SF === this.flags.OF; }
  JNZ() { return this.flags.ZF === 0; }
}

const cpu = new CPU();

// Program 1: MAX(a, b)
function asmMax(a, b) {
  cpu.MOV("rax", a);
  cpu.MOV("rbx", b);
  cpu.CMP("rax", "rbx");  // compare a, b
  if (!cpu.JGE()) {        // if rax < rbx
    cpu.MOV("rax", "rbx");  // rax = rbx (b is larger)
  }
  return cpu.registers.rax;
}
console.log("MAX(17, 42) =", asmMax(17, 42));   // 42
console.log("MAX(99, 3)  =", asmMax(99, 3));    // 99

// Program 2: SUM of 1..N using loop
function asmSum(n) {
  cpu.MOV("rcx", n);   // counter = n
  cpu.MOV("rax", 0);   // sum = 0
  do {
    cpu.ADD("rax", "rcx"); // sum += counter
    cpu.DEC("rcx");         // counter--
  } while (cpu.JNZ());      // while counter != 0
  return cpu.registers.rax;
}
console.log("SUM(1..10) =", asmSum(10));   // 55
console.log("SUM(1..5)  =", asmSum(5));    // 15

// Program 3: Classify number (positive/negative/zero)
function classify(n) {
  cpu.MOV("rax", n);
  cpu.CMP("rax", 0);
  if (cpu.JE())  return "zero";
  if (cpu.JL())  return "negative";
  return "positive";
}
console.log("classify(7)  →", classify(7));
console.log("classify(-3) →", classify(-3));
console.log("classify(0)  →", classify(0));
`,
          reference_solution: `class CPU{constructor(){this.registers={rax:0,rbx:0,rcx:0,rdx:0};this.flags={ZF:0,SF:0,OF:0,CF:0};}
MOV(d,s){this.registers[d]=typeof s==="number"?s:this.registers[s];}
ADD(d,s){this.registers[d]+=typeof s==="number"?s:this.registers[s];}
DEC(d){this.registers[d]--;this.flags.ZF=this.registers[d]===0?1:0;}
CMP(a,b){const va=this.registers[a],vb=typeof b==="number"?b:this.registers[b],r=va-vb;this.flags.ZF=r===0?1:0;this.flags.SF=r<0?1:0;this.flags.CF=va<vb?1:0;this.flags.OF=((va>0&&vb<0&&r<0)||(va<0&&vb>0&&r>0))?1:0;}
JE(){return this.flags.ZF===1;}JNE(){return this.flags.ZF===0;}JL(){return this.flags.SF!==this.flags.OF;}JG(){return this.flags.ZF===0&&this.flags.SF===this.flags.OF;}JGE(){return this.flags.SF===this.flags.OF;}JNZ(){return this.flags.ZF===0;}}
const cpu=new CPU();
function asmMax(a,b){cpu.MOV("rax",a);cpu.MOV("rbx",b);cpu.CMP("rax","rbx");if(!cpu.JGE())cpu.MOV("rax","rbx");return cpu.registers.rax;}
console.log("MAX(17, 42) =",asmMax(17,42));console.log("MAX(99, 3)  =",asmMax(99,3));
function asmSum(n){cpu.MOV("rcx",n);cpu.MOV("rax",0);do{cpu.ADD("rax","rcx");cpu.DEC("rcx");}while(cpu.JNZ());return cpu.registers.rax;}
console.log("SUM(1..10) =",asmSum(10));console.log("SUM(1..5)  =",asmSum(5));
function classify(n){cpu.MOV("rax",n);cpu.CMP("rax",0);if(cpu.JE())return"zero";if(cpu.JL())return"negative";return"positive";}
console.log("classify(7)  →",classify(7));console.log("classify(-3) →",classify(-3));console.log("classify(0)  →",classify(0));
`,
          hints: [
            "MAX: CMP rax, rbx → if rax < rbx (JGE fails), copy rbx into rax",
            "SUM loop: add rcx to rax, decrement rcx, repeat while JNZ (counter != 0)",
            "SUM(1..10) = 55 (Gauss formula: n*(n+1)/2 = 10*11/2 = 55)",
            "classify: CMP with 0 sets ZF=1 for zero, SF=1 for negative",
          ],
          test_cases: [
            { description: "MAX(17, 42) = 42", expected_output: "MAX(17, 42) = 42" },
            { description: "SUM(1..10) = 55", expected_output: "SUM(1..10) = 55" },
            { description: "classify(-3) is negative", expected_output: "classify(-3) → negative" },
            { description: "classify(0) is zero", expected_output: "classify(0)  → zero" },
          ],
        },
        {
          id: "asm-u1-l4", unit_id: "asm-u1", track_id: "assembly",
          type: "boss", order_index: 4, xp_reward: 600, execution_engine: "browser",
          title: "Boss: Fibonacci in Assembly",
          explanation_md: `# Boss: Complete Assembly Program — Fibonacci

Write a complete assembly program that computes the Fibonacci sequence using the stack for function calls.

## The Call Stack
\`\`\`asm
; Function prologue
PUSH rbp          ; save caller's base pointer
MOV  rbp, rsp     ; set our stack frame
SUB  rsp, 16      ; allocate 16 bytes for locals

; ... function body ...

; Function epilogue
MOV  rsp, rbp     ; restore stack pointer
POP  rbp          ; restore caller's base pointer
RET               ; return to caller
\`\`\`

## Calling Convention (x86-64 Linux/SysV)
- **Arguments**: rdi, rsi, rdx, rcx, r8, r9 (then stack)
- **Return value**: rax
- **Caller-saved**: rax, rcx, rdx, rsi, rdi, r8, r9, r10, r11
- **Callee-saved**: rbx, rbp, r12–r15

## Fibonacci Algorithm in Assembly
\`\`\`asm
; fib(n) — iterative version
fib:
    CMP  rdi, 1       ; if n <= 1
    JLE  return_n     ;   return n
    MOV  rax, 0       ; prev = 0
    MOV  rbx, 1       ; curr = 1
    MOV  rcx, 2       ; i = 2
loop:
    MOV  rdx, rbx     ; temp = curr
    ADD  rbx, rax     ; curr = curr + prev
    MOV  rax, rdx     ; prev = temp
    INC  rcx          ; i++
    CMP  rcx, rdi     ; if i <= n
    JLE  loop         ;   continue
    MOV  rax, rbx     ; return curr
    RET
return_n:
    MOV  rax, rdi
    RET
\`\`\`

## Boss Challenge
Implement a full CPU simulator and run a Fibonacci program:`,
          starter_code: `// Full CPU simulator — run assembly Fibonacci program
class CPU {
  constructor() {
    this.regs = { rax:0, rbx:0, rcx:0, rdx:0, rdi:0, rsi:0, rsp:0xFFF0, rbp:0 };
    this.flags = { ZF:0, SF:0 };
    this.stack = [];
    this.output = [];
  }
  MOV(d, s) { this.regs[d] = typeof s === "number" ? s : this.regs[s]; }
  ADD(d, s) { this.regs[d] += typeof s === "number" ? s : this.regs[s]; }
  INC(d)    { this.regs[d]++; }
  DEC(d)    { this.regs[d]--; }
  CMP(a, b) {
    const r = this.regs[a] - (typeof b === "number" ? b : this.regs[b]);
    this.flags.ZF = r === 0 ? 1 : 0;
    this.flags.SF = r < 0 ? 1 : 0;
  }
  JLE() { return this.flags.ZF === 1 || this.flags.SF === 1; }
  JNE() { return this.flags.ZF === 0; }

  // Simulate the fib(n) function
  fib(n) {
    this.MOV("rdi", n);       // argument: n

    // Edge case: fib(0) = 0, fib(1) = 1
    this.CMP("rdi", 1);
    if (this.JLE()) {
      this.MOV("rax", "rdi");
      return this.regs.rax;
    }

    // Iterative loop
    this.MOV("rax", 0);   // prev = 0
    this.MOV("rbx", 1);   // curr = 1
    this.MOV("rcx", 2);   // i = 2

    // loop: while i <= n
    while (true) {
      this.MOV("rdx", "rbx");  // temp = curr
      this.ADD("rbx", "rax");  // curr += prev
      this.MOV("rax", "rdx");  // prev = temp
      this.INC("rcx");          // i++
      this.CMP("rcx", "rdi");  // compare i, n
      if (!this.JLE()) break;   // if i > n, exit loop
    }

    this.MOV("rax", "rbx");   // return curr
    return this.regs.rax;
  }
}

const cpu = new CPU();

// Compute first 10 Fibonacci numbers
console.log("Fibonacci sequence (assembly simulation):");
const fibs = [];
for (let n = 0; n <= 9; n++) {
  fibs.push(cpu.fib(n));
}
console.log("fib(0..9): " + fibs.join(", "));

// Specific values
console.log("fib(10) =", cpu.fib(10));
console.log("fib(15) =", cpu.fib(15));
console.log("fib(20) =", cpu.fib(20));

// Find first fib number > 100
let n = 0;
while (cpu.fib(n) <= 100) n++;
console.log("First fib > 100: fib(" + n + ") =", cpu.fib(n));
`,
          reference_solution: `class CPU{constructor(){this.regs={rax:0,rbx:0,rcx:0,rdx:0,rdi:0,rsi:0,rsp:0xFFF0,rbp:0};this.flags={ZF:0,SF:0};}
MOV(d,s){this.regs[d]=typeof s==="number"?s:this.regs[s];}
ADD(d,s){this.regs[d]+=typeof s==="number"?s:this.regs[s];}
INC(d){this.regs[d]++;}
CMP(a,b){const r=this.regs[a]-(typeof b==="number"?b:this.regs[b]);this.flags.ZF=r===0?1:0;this.flags.SF=r<0?1:0;}
JLE(){return this.flags.ZF===1||this.flags.SF===1;}
fib(n){this.MOV("rdi",n);this.CMP("rdi",1);if(this.JLE()){this.MOV("rax","rdi");return this.regs.rax;}this.MOV("rax",0);this.MOV("rbx",1);this.MOV("rcx",2);while(true){this.MOV("rdx","rbx");this.ADD("rbx","rax");this.MOV("rax","rdx");this.regs.rcx++;this.CMP("rcx","rdi");if(!(this.flags.ZF===1||this.flags.SF===1))break;}this.MOV("rax","rbx");return this.regs.rax;}}
const cpu=new CPU();
console.log("Fibonacci sequence (assembly simulation):");
const f=[];for(let n=0;n<=9;n++)f.push(cpu.fib(n));
console.log("fib(0..9): "+f.join(", "));
console.log("fib(10) =",cpu.fib(10));console.log("fib(15) =",cpu.fib(15));console.log("fib(20) =",cpu.fib(20));
let n=0;while(cpu.fib(n)<=100)n++;console.log("First fib > 100: fib("+n+") =",cpu.fib(n));
`,
          hints: [
            "Fibonacci: 0,1,1,2,3,5,8,13,21,34 — fib(0..9)",
            "fib(10) = 55, fib(15) = 610, fib(20) = 6765",
            "First fib > 100 is fib(12) = 144",
            "The iterative algorithm tracks prev/curr registers just like assembly would",
          ],
          test_cases: [
            { description: "First 10 fibonacci numbers", expected_output: "fib(0..9): 0, 1, 1, 2, 3, 5, 8, 13, 21, 34" },
            { description: "fib(10) = 55", expected_output: "fib(10) = 55" },
            { description: "fib(20) = 6765", expected_output: "fib(20) = 6765" },
            { description: "First fib > 100 is fib(12) = 144", expected_output: "First fib > 100: fib(12) = 144" },
          ],
        },
      ],
    },
  ],
};
