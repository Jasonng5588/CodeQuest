import { StaticTrack } from "./lesson-content";

// ─── ASP.NET Core Track ────────────────────────────────────
export const ASPNET_TRACK: StaticTrack = {
  id: "aspnet",
  title: "ASP.NET Core",
  description: `Microsoft's web framework. MVC, Web API, Entity Framework, and Azure deployment.`,
  color: "#5c2d91",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "backend",
  order_index: 43,
  is_published: true,
  estimated_hours: 22,
  learner_count: 5400,
  units: [
    {
      id: "aspnet-u1", track_id: "aspnet",
      title: "ASP.NET Core Fundamentals", icon: "server", order_index: 1,
      description: "MVC pattern, routing, controllers, and Entity Framework Core",
      lessons: [
        {
          id: "aspnet-u1-l1", unit_id: "aspnet-u1", track_id: "aspnet",
          type: "concept", order_index: 1, xp_reward: 75, execution_engine: "browser",
          title: "MVC Architecture",
          explanation_md: `# ASP.NET Core MVC

ASP.NET Core follows the **Model-View-Controller** pattern:

\`\`\`csharp
// Model — the data
public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
}

// Controller — the logic
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase {
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]                  // GET /api/products
    public IActionResult GetAll() =>
        Ok(_db.Products.ToList());

    [HttpGet("{id}")]          // GET /api/products/1
    public IActionResult GetById(int id) {
        var product = _db.Products.Find(id);
        if (product == null) return NotFound();
        return Ok(product);
    }
}
\`\`\`

## Dependency Injection
ASP.NET Core has built-in DI. Services are registered in \`Program.cs\`:
\`\`\`csharp
builder.Services.AddDbContext<AppDbContext>(...);
builder.Services.AddScoped<IProductService, ProductService>();
\`\`\`

## Your Task
Simulate the MVC routing system:`,
          starter_code: `// Simulate ASP.NET Core MVC routing
const routes = [
  { method: "GET",    path: "/api/products",    action: "GetAll"    },
  { method: "GET",    path: "/api/products/:id", action: "GetById"  },
  { method: "POST",   path: "/api/products",    action: "Create"    },
  { method: "PUT",    path: "/api/products/:id", action: "Update"   },
  { method: "DELETE", path: "/api/products/:id", action: "Delete"   },
];

function matchRoute(method, requestPath) {
  for (const route of routes) {
    const pattern = route.path.replace(/:id/, "\\\\d+");
    const regex = new RegExp("^" + pattern + "$");
    if (route.method === method && regex.test(requestPath)) {
      return route.action;
    }
  }
  return "NotFound";
}

// Test routing
const requests = [
  ["GET",    "/api/products"],
  ["GET",    "/api/products/42"],
  ["POST",   "/api/products"],
  ["DELETE", "/api/products/7"],
  ["GET",    "/api/unknown"],
];

requests.forEach(([method, path]) => {
  console.log(\`\${method} \${path} → \${matchRoute(method, path)}\`);
});
`,
          reference_solution: `const routes=[{method:"GET",path:"/api/products",action:"GetAll"},{method:"GET",path:"/api/products/:id",action:"GetById"},{method:"POST",path:"/api/products",action:"Create"},{method:"PUT",path:"/api/products/:id",action:"Update"},{method:"DELETE",path:"/api/products/:id",action:"Delete"}];
function matchRoute(m,p){for(const r of routes){const pat=r.path.replace(/:id/,"\\\\d+");if(r.method===m&&new RegExp("^"+pat+"$").test(p))return r.action;}return"NotFound";}
[["GET","/api/products"],["GET","/api/products/42"],["POST","/api/products"],["DELETE","/api/products/7"],["GET","/api/unknown"]].forEach(([m,p])=>console.log(\`\${m} \${p} → \${matchRoute(m,p)}\`));
`,
          hints: [
            "Routes with :id match any number using \\\\d+",
            "GET /api/products → GetAll, GET /api/products/42 → GetById",
          ],
          test_cases: [
            { description: "GET /api/products → GetAll", expected_output: "GET /api/products → GetAll" },
            { description: "DELETE /api/products/7 → Delete", expected_output: "DELETE /api/products/7 → Delete" },
          ],
        },
        {
          id: "aspnet-u1-l2", unit_id: "aspnet-u1", track_id: "aspnet",
          type: "challenge", order_index: 2, xp_reward: 125, execution_engine: "browser",
          title: "Entity Framework Core ORM",
          explanation_md: `# Entity Framework Core

EF Core is ASP.NET's ORM — it maps C# classes to database tables.

\`\`\`csharp
// DbContext — represents the database
public class AppDbContext : DbContext {
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(ModelBuilder mb) {
        mb.Entity<Product>()
          .HasMany(p => p.OrderItems)
          .WithOne(i => i.Product)
          .HasForeignKey(i => i.ProductId);
    }
}

// LINQ queries — EF translates to SQL
var products = await _db.Products
    .Where(p => p.Price < 100 && p.Stock > 0)
    .OrderBy(p => p.Name)
    .Select(p => new { p.Name, p.Price })
    .ToListAsync();

// Eager loading (SQL JOIN)
var orders = await _db.Orders
    .Include(o => o.Customer)
    .Include(o => o.Items)
        .ThenInclude(i => i.Product)
    .Where(o => o.Status == "pending")
    .ToListAsync();
\`\`\`

## Your Task
Simulate EF Core LINQ queries on an in-memory dataset:`,
          starter_code: `// Simulate Entity Framework Core LINQ queries
const products = [
  { id: 1, name: "Laptop",    price: 999,  stock: 15, category: "electronics" },
  { id: 2, name: "Mouse",     price: 29,   stock: 80, category: "electronics" },
  { id: 3, name: "Desk",      price: 349,  stock: 5,  category: "furniture"   },
  { id: 4, name: "Keyboard",  price: 79,   stock: 42, category: "electronics" },
  { id: 5, name: "Chair",     price: 499,  stock: 0,  category: "furniture"   },
  { id: 6, name: "Webcam",    price: 89,   stock: 23, category: "electronics" },
];

// Simulate: products.Where(p => p.Price < 100 && p.Stock > 0).OrderBy(p => p.Name)
const affordable = products
  .filter(p => p.Price < 100 && p.stock > 0)
  .sort((a, b) => a.name.localeCompare(b.name));

console.log("Affordable in-stock items:");
affordable.forEach(p => console.log(\`  \${p.name}: $\${p.price}\`));

// Simulate: products.GroupBy(p => p.category).Select(g => { category, count, avg })
const grouped = {};
products.forEach(p => {
  if (!grouped[p.category]) grouped[p.category] = [];
  grouped[p.category].push(p);
});

console.log("\\nCategory summary:");
Object.entries(grouped).forEach(([cat, items]) => {
  const avg = (items.reduce((s, p) => s + p.price, 0) / items.length).toFixed(2);
  console.log(\`  \${cat}: \${items.length} items, avg $\${avg}\`);
});
`,
          reference_solution: `const products=[{id:1,name:"Laptop",price:999,stock:15,category:"electronics"},{id:2,name:"Mouse",price:29,stock:80,category:"electronics"},{id:3,name:"Desk",price:349,stock:5,category:"furniture"},{id:4,name:"Keyboard",price:79,stock:42,category:"electronics"},{id:5,name:"Chair",price:499,stock:0,category:"furniture"},{id:6,name:"Webcam",price:89,stock:23,category:"electronics"}];
const affordable=products.filter(p=>p.price<100&&p.stock>0).sort((a,b)=>a.name.localeCompare(b.name));
console.log("Affordable in-stock items:");
affordable.forEach(p=>console.log(\`  \${p.name}: $\${p.price}\`));
const g={};products.forEach(p=>{if(!g[p.category])g[p.category]=[];g[p.category].push(p);});
console.log("\\nCategory summary:");
Object.entries(g).forEach(([cat,items])=>{const avg=(items.reduce((s,p)=>s+p.price,0)/items.length).toFixed(2);console.log(\`  \${cat}: \${items.length} items, avg $\${avg}\`);});
`,
          hints: [
            "Filter by price < 100 AND stock > 0 — Mouse, Keyboard, Webcam qualify",
            "Chair has stock 0 so it's excluded",
            "Electronics: 4 items, Furniture: 2 items",
          ],
          test_cases: [
            { description: "Keyboard is affordable and in-stock", expected_output: "  Keyboard: $79" },
            { description: "Electronics has 4 items", expected_output: "  electronics: 4 items" },
          ],
        },
        {
          id: "aspnet-u1-l3", unit_id: "aspnet-u1", track_id: "aspnet",
          type: "challenge", order_index: 3, xp_reward: 150, execution_engine: "browser",
          title: "Web API & Middleware",
          explanation_md: `# ASP.NET Core Web API & Middleware

## Middleware Pipeline
Requests flow through a pipeline of middleware:

\`\`\`csharp
var app = builder.Build();

// Each Use() adds middleware
app.UseHttpsRedirection();          // redirect HTTP → HTTPS
app.UseAuthentication();            // validate JWT tokens
app.UseAuthorization();             // check permissions
app.UseRateLimiting();              // throttle requests
app.MapControllers();               // route to controllers

// Custom middleware
app.Use(async (context, next) => {
    var sw = Stopwatch.StartNew();
    await next(context);            // call next middleware
    sw.Stop();
    context.Response.Headers.Add("X-Response-Time",
        sw.ElapsedMilliseconds + "ms");
});
\`\`\`

## Action Results
\`\`\`csharp
return Ok(data);           // 200 with JSON
return Created(uri, data); // 201 with Location header
return BadRequest(errors); // 400 validation errors
return NotFound();         // 404
return Unauthorized();     // 401
return Forbid();           // 403
\`\`\`

## Your Task
Simulate a middleware pipeline and API response builder:`,
          starter_code: `// Simulate ASP.NET Core middleware pipeline
function createPipeline(...middlewares) {
  return function(request) {
    let index = -1;

    function next() {
      index++;
      if (index < middlewares.length) {
        middlewares[index](request, next);
      }
    }
    next();
    return request;
  };
}

// Middleware functions
const logMiddleware = (req, next) => {
  req.log = (req.log || []);
  req.log.push("Logger");
  next();
};

const authMiddleware = (req, next) => {
  if (!req.token) { req.status = 401; req.body = "Unauthorized"; return; }
  req.log.push("Auth:OK");
  next();
};

const rateLimitMiddleware = (req, next) => {
  if (req.requestCount > 100) { req.status = 429; req.body = "Too Many Requests"; return; }
  req.log.push("RateLimit:OK");
  next();
};

const controllerMiddleware = (req, next) => {
  req.status = 200;
  req.body = { message: "Hello from Controller!", path: req.path };
  req.log.push("Controller");
};

const pipeline = createPipeline(logMiddleware, authMiddleware, rateLimitMiddleware, controllerMiddleware);

// Test 1: Valid request
const req1 = { path: "/api/data", token: "Bearer abc123", requestCount: 5 };
pipeline(req1);
console.log("Request 1 status:", req1.status);
console.log("Pipeline:", req1.log.join(" → "));

// Test 2: Unauthenticated
const req2 = { path: "/api/data", token: null, requestCount: 1, log: [] };
pipeline(req2);
console.log("Request 2 status:", req2.status, "-", req2.body);
`,
          reference_solution: `function createPipeline(...mw){return function(req){let i=-1;function next(){i++;if(i<mw.length)mw[i](req,next);}next();return req;};}
const log=(req,next)=>{req.log=(req.log||[]);req.log.push("Logger");next();};
const auth=(req,next)=>{if(!req.token){req.status=401;req.body="Unauthorized";return;}req.log.push("Auth:OK");next();};
const rateLimit=(req,next)=>{if(req.requestCount>100){req.status=429;req.body="Too Many Requests";return;}req.log.push("RateLimit:OK");next();};
const controller=(req,next)=>{req.status=200;req.body={message:"Hello from Controller!",path:req.path};req.log.push("Controller");};
const pipeline=createPipeline(log,auth,rateLimit,controller);
const req1={path:"/api/data",token:"Bearer abc123",requestCount:5};pipeline(req1);
console.log("Request 1 status:",req1.status);
console.log("Pipeline:",req1.log.join(" → "));
const req2={path:"/api/data",token:null,requestCount:1,log:[]};pipeline(req2);
console.log("Request 2 status:",req2.status,"-",req2.body);
`,
          hints: [
            "Middleware calls next() to pass control to the next middleware",
            "Auth middleware short-circuits (returns 401) without calling next() when no token",
            "Valid request flows through all 4 middlewares",
          ],
          test_cases: [
            { description: "Valid request returns 200", expected_output: "Request 1 status: 200" },
            { description: "No token returns 401 Unauthorized", expected_output: "Request 2 status: 401 - Unauthorized" },
          ],
        },
        {
          id: "aspnet-u1-l4", unit_id: "aspnet-u1", track_id: "aspnet",
          type: "boss", order_index: 4, xp_reward: 500, execution_engine: "browser",
          title: "Boss: Full CRUD REST API",
          explanation_md: `# Boss: Build a Complete REST API

Implement a full in-memory CRUD API following ASP.NET Core conventions:

\`\`\`
GET    /api/products        → list all (with pagination & filtering)
GET    /api/products/:id    → get one (404 if not found)
POST   /api/products        → create (201 + Location header)
PUT    /api/products/:id    → full update (200 or 404)
PATCH  /api/products/:id    → partial update
DELETE /api/products/:id    → delete (204 No Content)
\`\`\`

Your API must:
- Return proper HTTP status codes (200, 201, 204, 400, 404)
- Validate input (name required, price > 0)
- Support filtering: \`?category=electronics\`
- Support pagination: \`?page=1&pageSize=3\``,
          starter_code: `// Full CRUD REST API simulation (ASP.NET Core style)
class ProductsAPI {
  constructor() {
    this._db = [
      { id: 1, name: "Laptop",   price: 999, category: "electronics" },
      { id: 2, name: "Mouse",    price: 29,  category: "electronics" },
      { id: 3, name: "Desk",     price: 349, category: "furniture"   },
    ];
    this._nextId = 4;
  }

  // GET /api/products?category=electronics&page=1&pageSize=10
  getAll({ category, page = 1, pageSize = 10 } = {}) {
    let data = [...this._db];
    if (category) data = data.filter(p => p.category === category);
    const total = data.length;
    const items = data.slice((page - 1) * pageSize, page * pageSize);
    return { status: 200, body: { items, total, page, pageSize } };
  }

  // GET /api/products/:id
  getById(id) {
    const product = this._db.find(p => p.id === id);
    if (!product) return { status: 404, body: { error: "Product not found" } };
    return { status: 200, body: product };
  }

  // POST /api/products
  create({ name, price, category }) {
    if (!name || !price || price <= 0)
      return { status: 400, body: { error: "Name required, price must be > 0" } };
    const product = { id: this._nextId++, name, price, category: category || "general" };
    this._db.push(product);
    return { status: 201, headers: { Location: \`/api/products/\${product.id}\` }, body: product };
  }

  // DELETE /api/products/:id
  delete(id) {
    const index = this._db.findIndex(p => p.id === id);
    if (index === -1) return { status: 404, body: { error: "Product not found" } };
    this._db.splice(index, 1);
    return { status: 204, body: null };
  }
}

const api = new ProductsAPI();

// Test the API
let res;

res = api.getAll({ category: "electronics" });
console.log(\`GET /api/products?category=electronics → \${res.status} (\${res.body.total} items)\`);

res = api.getById(1);
console.log(\`GET /api/products/1 → \${res.status}: \${res.body.name}\`);

res = api.create({ name: "Monitor", price: 399, category: "electronics" });
console.log(\`POST /api/products → \${res.status}: \${res.body.name} (id=\${res.body.id})\`);

res = api.create({ name: "", price: -1 });
console.log(\`POST invalid → \${res.status}: \${res.body.error}\`);

res = api.delete(2);
console.log(\`DELETE /api/products/2 → \${res.status}\`);

res = api.getAll();
console.log(\`GET /api/products → \${res.status} (\${res.body.total} items total)\`);
`,
          reference_solution: `class ProductsAPI{constructor(){this._db=[{id:1,name:"Laptop",price:999,category:"electronics"},{id:2,name:"Mouse",price:29,category:"electronics"},{id:3,name:"Desk",price:349,category:"furniture"}];this._nextId=4;}
getAll({category,page=1,pageSize=10}={}){let d=[...this._db];if(category)d=d.filter(p=>p.category===category);const t=d.length;const i=d.slice((page-1)*pageSize,page*pageSize);return{status:200,body:{items:i,total:t,page,pageSize}};}
getById(id){const p=this._db.find(p=>p.id===id);if(!p)return{status:404,body:{error:"Product not found"}};return{status:200,body:p};}
create({name,price,category}){if(!name||!price||price<=0)return{status:400,body:{error:"Name required, price must be > 0"}};const p={id:this._nextId++,name,price,category:category||"general"};this._db.push(p);return{status:201,headers:{Location:\`/api/products/\${p.id}\`},body:p};}
delete(id){const i=this._db.findIndex(p=>p.id===id);if(i===-1)return{status:404,body:{error:"Product not found"}};this._db.splice(i,1);return{status:204,body:null};}}
const api=new ProductsAPI();
let res;
res=api.getAll({category:"electronics"});console.log(\`GET /api/products?category=electronics → \${res.status} (\${res.body.total} items)\`);
res=api.getById(1);console.log(\`GET /api/products/1 → \${res.status}: \${res.body.name}\`);
res=api.create({name:"Monitor",price:399,category:"electronics"});console.log(\`POST /api/products → \${res.status}: \${res.body.name} (id=\${res.body.id})\`);
res=api.create({name:"",price:-1});console.log(\`POST invalid → \${res.status}: \${res.body.error}\`);
res=api.delete(2);console.log(\`DELETE /api/products/2 → \${res.status}\`);
res=api.getAll();console.log(\`GET /api/products → \${res.status} (\${res.body.total} items total)\`);
`,
          hints: [
            "GET returns 200, POST returns 201, DELETE returns 204",
            "Invalid input (empty name or price ≤ 0) returns 400 Bad Request",
            "After deleting Mouse(id=2) and adding Monitor(id=4), total is still 3",
          ],
          test_cases: [
            { description: "Electronics filter returns 2 items", expected_output: "GET /api/products?category=electronics → 200 (2 items)" },
            { description: "POST invalid returns 400", expected_output: "POST invalid → 400: Name required, price must be > 0" },
            { description: "DELETE returns 204", expected_output: "DELETE /api/products/2 → 204" },
            { description: "After delete+add, total is 3", expected_output: "GET /api/products → 200 (3 items total)" },
          ],
        },
      ],
    },
  ],
};

// ─── Laravel Track ─────────────────────────────────────────
export const LARAVEL_TRACK: StaticTrack = {
  id: "laravel",
  title: "Laravel",
  description: `The PHP framework for artisans. Eloquent ORM, Blade templates, and artisan CLI.`,
  color: "#ff2d20",
  difficulty_curve: "intermediate",
  execution_engine: "judge0",
  category: "backend",
  order_index: 42,
  is_published: true,
  estimated_hours: 20,
  learner_count: 6200,
  units: [
    {
      id: "laravel-u1", track_id: "laravel",
      title: "Laravel Fundamentals", icon: "server", order_index: 1,
      description: "Eloquent ORM, routing, Blade templates, and artisan patterns",
      lessons: [
        {
          id: "laravel-u1-l1", unit_id: "laravel-u1", track_id: "laravel",
          type: "concept", order_index: 1, xp_reward: 75, execution_engine: "judge0",
          title: "Eloquent ORM",
          explanation_md: `# Laravel Eloquent ORM

Eloquent is Laravel's ActiveRecord ORM — each model maps to a database table:

\`\`\`php
// Model definition
class Post extends Model {
    protected $fillable = ['title', 'body', 'user_id', 'published'];
    
    // Relationships
    public function user() {
        return $this->belongsTo(User::class);
    }
    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}

// Fluent query builder
$posts = Post::where('published', true)
    ->with('user', 'tags')          // eager load
    ->orderBy('created_at', 'desc')
    ->paginate(15);

// Create / Update
$post = Post::create(['title' => 'Hello', 'body' => '...']);
$post->update(['title' => 'Updated']);

// Soft deletes (adds deleted_at column, not real delete)
class Post extends Model {
    use SoftDeletes;
}
$post->delete();           // sets deleted_at
Post::withTrashed()->get(); // includes soft-deleted
\`\`\`

## Your Task
Simulate Eloquent query operations in PHP:`,
          starter_code: `<?php
// Simulate Eloquent ORM operations
$posts = [
    ["id"=>1, "title"=>"Getting Started with Laravel", "user_id"=>1, "published"=>true,  "views"=>1250],
    ["id"=>2, "title"=>"Eloquent Relationships Guide",  "user_id"=>1, "published"=>true,  "views"=>890],
    ["id"=>3, "title"=>"Draft: Advanced Queues",        "user_id"=>2, "published"=>false, "views"=>0],
    ["id"=>4, "title"=>"Laravel Testing Best Practices","user_id"=>2, "published"=>true,  "views"=>2100],
    ["id"=>5, "title"=>"Unpublished Feature Preview",   "user_id"=>3, "published"=>false, "views"=>0],
];

// Simulate: Post::where('published', true)->orderBy('views', 'desc')->get()
$published = array_filter($posts, fn($p) => $p['published']);
usort($published, fn($a, $b) => $b['views'] - $a['views']);

echo "Published posts by popularity:\n";
foreach ($published as $post) {
    echo "  [{$post['id']}] {$post['title']} ({$post['views']} views)\n";
}

// Simulate: Post::where('user_id', 1)->count()
$user1Count = count(array_filter($posts, fn($p) => $p['user_id'] === 1));
echo "\nUser 1 post count: " . $user1Count . "\n";

// Simulate: Post::sum('views')
$totalViews = array_sum(array_column($posts, 'views'));
echo "Total views: " . $totalViews . "\n";
?>`,
          reference_solution: `<?php
$posts=[["id"=>1,"title"=>"Getting Started with Laravel","user_id"=>1,"published"=>true,"views"=>1250],["id"=>2,"title"=>"Eloquent Relationships Guide","user_id"=>1,"published"=>true,"views"=>890],["id"=>3,"title"=>"Draft: Advanced Queues","user_id"=>2,"published"=>false,"views"=>0],["id"=>4,"title"=>"Laravel Testing Best Practices","user_id"=>2,"published"=>true,"views"=>2100],["id"=>5,"title"=>"Unpublished Feature Preview","user_id"=>3,"published"=>false,"views"=>0]];
$pub=array_filter($posts,fn($p)=>$p['published']);usort($pub,fn($a,$b)=>$b['views']-$a['views']);
echo "Published posts by popularity:\n";
foreach($pub as $p)echo "  [{$p['id']}] {$p['title']} ({$p['views']} views)\n";
$c=count(array_filter($posts,fn($p)=>$p['user_id']===1));echo "\nUser 1 post count: ".$c."\n";
echo "Total views: ".array_sum(array_column($posts,'views'))."\n";
?>`,
          hints: [
            "3 published posts: ids 1, 2, 4 — sorted by views descending: 2100, 1250, 890",
            "User 1 has 2 posts (ids 1 and 2)",
            "Total views: 1250 + 890 + 0 + 2100 + 0 = 4240",
          ],
          test_cases: [
            { description: "Top post has 2100 views", expected_output: "  [4] Laravel Testing Best Practices (2100 views)" },
            { description: "User 1 has 2 posts", expected_output: "User 1 post count: 2" },
            { description: "Total views is 4240", expected_output: "Total views: 4240" },
          ],
        },
        {
          id: "laravel-u1-l2", unit_id: "laravel-u1", track_id: "laravel",
          type: "challenge", order_index: 2, xp_reward: 125, execution_engine: "judge0",
          title: "Laravel Routing",
          explanation_md: `# Laravel Routing

Routes are defined in \`routes/web.php\` (web) or \`routes/api.php\` (API):

\`\`\`php
// Basic routes
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::put('/posts/{post}', [PostController::class, 'update']);
Route::delete('/posts/{post}', [PostController::class, 'destroy']);

// Route::resource generates all 7 RESTful routes
Route::resource('posts', PostController::class);
// GET    /posts           → index
// GET    /posts/create    → create
// POST   /posts           → store
// GET    /posts/{id}      → show
// GET    /posts/{id}/edit → edit
// PUT    /posts/{id}      → update
// DELETE /posts/{id}      → destroy

// Route middleware & groups
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::prefix('admin')->group(function () {
        Route::resource('users', AdminUserController::class);
    });
});

// Route model binding (auto-loads model from DB)
Route::get('/posts/{post}', fn(Post $post) => $post); // $post is auto-fetched!
\`\`\`

## Your Task
Simulate Laravel's resource route generator:`,
          starter_code: `<?php
// Simulate Laravel Route::resource() generator
function resourceRoutes($name, $controller) {
    $routes = [
        ["method" => "GET",    "uri" => "/$name",           "action" => "$controller@index"],
        ["method" => "GET",    "uri" => "/$name/create",    "action" => "$controller@create"],
        ["method" => "POST",   "uri" => "/$name",           "action" => "$controller@store"],
        ["method" => "GET",    "uri" => "/$name/{id}",      "action" => "$controller@show"],
        ["method" => "GET",    "uri" => "/$name/{id}/edit", "action" => "$controller@edit"],
        ["method" => "PUT",    "uri" => "/$name/{id}",      "action" => "$controller@update"],
        ["method" => "DELETE", "uri" => "/$name/{id}",      "action" => "$controller@destroy"],
    ];
    return $routes;
}

// Route matching simulation
function matchRoute($routes, $method, $uri) {
    foreach ($routes as $route) {
        $pattern = preg_replace('/\{id\}/', '[0-9]+', $route['uri']);
        $pattern = '#^' . $pattern . '$#';
        if ($route['method'] === $method && preg_match($pattern, $uri)) {
            return $route['action'];
        }
    }
    return "404 Not Found";
}

$routes = resourceRoutes('posts', 'PostController');

echo "Laravel Resource Routes for 'posts':\n";
foreach ($routes as $r) {
    echo sprintf("  %-7s %-25s → %s\n", $r['method'], $r['uri'], $r['action']);
}

echo "\nRoute matching:\n";
$tests = [
    ["GET",    "/posts"],
    ["POST",   "/posts"],
    ["GET",    "/posts/42"],
    ["DELETE", "/posts/7"],
    ["GET",    "/posts/99/edit"],
];
foreach ($tests as [$m, $u]) {
    echo "  $m $u → " . matchRoute($routes, $m, $u) . "\n";
}
?>`,
          reference_solution: `<?php
function resourceRoutes($name,$controller){return[["method"=>"GET","uri"=>"/$name","action"=>"$controller@index"],["method"=>"GET","uri"=>"/$name/create","action"=>"$controller@create"],["method"=>"POST","uri"=>"/$name","action"=>"$controller@store"],["method"=>"GET","uri"=>"/$name/{id}","action"=>"$controller@show"],["method"=>"GET","uri"=>"/$name/{id}/edit","action"=>"$controller@edit"],["method"=>"PUT","uri"=>"/$name/{id}","action"=>"$controller@update"],["method"=>"DELETE","uri"=>"/$name/{id}","action"=>"$controller@destroy"]];}
function matchRoute($routes,$method,$uri){foreach($routes as $r){$p='#^'.preg_replace('/\{id\}/','[0-9]+',$r['uri']).'$#';if($r['method']===$method&&preg_match($p,$uri))return $r['action'];}return"404 Not Found";}
$routes=resourceRoutes('posts','PostController');
echo "Laravel Resource Routes for 'posts':\n";
foreach($routes as $r)echo sprintf("  %-7s %-25s → %s\n",$r['method'],$r['uri'],$r['action']);
echo "\nRoute matching:\n";
foreach([["GET","/posts"],["POST","/posts"],["GET","/posts/42"],["DELETE","/posts/7"],["GET","/posts/99/edit"]]as[$m,$u])echo"  $m $u → ".matchRoute($routes,$m,$u)."\n";
?>`,
          hints: [
            "Resource routes generate 7 standard RESTful routes",
            "GET /posts → index, POST /posts → store",
            "{id} matches any number in the URI",
          ],
          test_cases: [
            { description: "GET /posts → PostController@index", expected_output: "  GET /posts → PostController@index" },
            { description: "DELETE /posts/7 → destroy", expected_output: "  DELETE /posts/7 → PostController@destroy" },
          ],
        },
        {
          id: "laravel-u1-l3", unit_id: "laravel-u1", track_id: "laravel",
          type: "challenge", order_index: 3, xp_reward: 150, execution_engine: "judge0",
          title: "Blade Templates",
          explanation_md: `# Laravel Blade Templates

Blade is Laravel's powerful templating engine:

\`\`\`blade
{{-- layouts/app.blade.php --}}
<!DOCTYPE html>
<html>
<head><title>@yield('title', 'App')</title></head>
<body>
    @include('partials.navbar')
    <main>@yield('content')</main>
</body>
</html>

{{-- posts/index.blade.php --}}
@extends('layouts.app')

@section('title', 'All Posts')

@section('content')
    @if($posts->isEmpty())
        <p>No posts yet.</p>
    @else
        @foreach($posts as $post)
            <article>
                <h2>{{ $post->title }}</h2>       {{-- auto-escaped XSS safe --}}
                <p>By {{ $post->user->name }}</p>
                @can('edit', $post)
                    <a href="{{ route('posts.edit', $post) }}">Edit</a>
                @endcan
            </article>
        @endforeach
        {{ $posts->links() }}  {{-- pagination --}}
    @endif
@endsection
\`\`\`

## Blade Directives
\`\`\`blade
@if / @elseif / @else / @endif
@foreach / @endforeach
@for / @endfor
@while / @endwhile
@forelse($items as $item) / @empty / @endforelse
@isset($var) / @endisset
@auth / @guest / @endauth
@can('permission') / @endcan
\`\`\`

## Your Task
Simulate Blade template rendering in PHP:`,
          starter_code: `<?php
// Simulate Blade template rendering
function bladeRender($template, $data) {
    // Extract data variables
    extract($data);
    
    // Simulate @foreach / @endforeach
    $output = preg_replace_callback(
        '/@foreach\(\$(\w+) as \$(\w+)\)(.*?)@endforeach/s',
        function($m) use ($data) {
            $collection = $data[$m[1]] ?? [];
            $varName = $m[2];
            $body = $m[3];
            $result = '';
            foreach ($collection as $item) {
                $rendered = preg_replace_callback(
                    '/\{\{\s*\$' . $varName . '->(\w+)\s*\}\}/',
                    fn($inner) => htmlspecialchars($item[$inner[1]] ?? ''),
                    $body
                );
                $result .= $rendered;
            }
            return $result;
        },
        $template
    );
    
    // Simulate {{ $var }} output (XSS-safe)
    $output = preg_replace_callback(
        '/\{\{\s*\$(\w+)\s*\}\}/',
        fn($m) => htmlspecialchars($data[$m[1]] ?? ''),
        $output
    );
    
    return trim($output);
}

$template = <<<BLADE
Posts by {{ \$author }}:
@foreach(\$posts as \$post)
  - {{ \$post->title }} ({{ \$post->views }} views)
@endforeach
BLADE;

$data = [
    'author' => 'Alice <admin>',  // XSS test!
    'posts' => [
        ['title' => 'Laravel Basics',    'views' => 1250],
        ['title' => 'Eloquent Deep Dive', 'views' => 890],
        ['title' => 'Testing in Laravel', 'views' => 2100],
    ],
];

echo bladeRender($template, $data) . "\n";
?>`,
          reference_solution: `<?php
function bladeRender($t,$data){extract($data);$o=preg_replace_callback('/@foreach\(\$(\w+) as \$(\w+)\)(.*?)@endforeach/s',function($m)use($data){$c=$data[$m[1]]??[];$vn=$m[2];$b=$m[3];$r='';foreach($c as $item){$r.=preg_replace_callback('/\{\{\s*\$'.$vn.'->(\w+)\s*\}\}/',fn($i)=>htmlspecialchars($item[$i[1]]??''),$b);}return $r;},$t);$o=preg_replace_callback('/\{\{\s*\$(\w+)\s*\}\}/',fn($m)=>htmlspecialchars($data[$m[1]]??''),$o);return trim($o);}
$t="Posts by {{ \$author }}:\n@foreach(\$posts as \$post)\n  - {{ \$post->title }} ({{ \$post->views }} views)\n@endforeach";
$data=['author'=>'Alice <admin>','posts'=>[['title'=>'Laravel Basics','views'=>1250],['title'=>'Eloquent Deep Dive','views'=>890],['title'=>'Testing in Laravel','views'=>2100]]];
echo bladeRender($t,$data)."\n";
?>`,
          hints: [
            "{{ $var }} escapes HTML — Alice <admin> becomes Alice &lt;admin&gt;",
            "@foreach loops over the posts array",
            "3 posts are rendered as list items",
          ],
          test_cases: [
            { description: "Author name is XSS-escaped", expected_output: "Posts by Alice &lt;admin&gt;:" },
            { description: "First post is Laravel Basics", expected_output: "  - Laravel Basics (1250 views)" },
          ],
        },
        {
          id: "laravel-u1-l4", unit_id: "laravel-u1", track_id: "laravel",
          type: "boss", order_index: 4, xp_reward: 500, execution_engine: "judge0",
          title: "Boss: Laravel CRUD Service",
          explanation_md: `# Boss: Laravel Full CRUD with Validation

Build a complete service following Laravel's patterns:

\`\`\`php
// Form Request Validation
class StorePostRequest extends FormRequest {
    public function rules(): array {
        return [
            'title'    => 'required|string|max:255|unique:posts',
            'body'     => 'required|string|min:50',
            'category' => 'required|in:news,tutorial,review',
            'tags'     => 'array|max:5',
            'tags.*'   => 'string|max:30',
        ];
    }
}

// Service class (keeps controllers thin)
class PostService {
    public function createPost(array $data, User $author): Post {
        return DB::transaction(function() use ($data, $author) {
            $post = Post::create([...$data, 'user_id' => $author->id]);
            $post->tags()->sync($data['tags'] ?? []);
            event(new PostCreated($post));
            return $post;
        });
    }
}
\`\`\`

## Boss Challenge
Implement a complete CRUD service with validation in PHP:`,
          starter_code: `<?php
// Laravel-style CRUD Service with Validation
class PostService {
    private array $posts = [];
    private int $nextId = 1;
    private array $validCategories = ['news', 'tutorial', 'review'];

    public function validate(array $data): array {
        $errors = [];
        if (empty($data['title'])) {
            $errors['title'] = 'Title is required';
        } elseif (strlen($data['title']) > 255) {
            $errors['title'] = 'Title must not exceed 255 characters';
        } elseif ($this->titleExists($data['title'], $data['id'] ?? null)) {
            $errors['title'] = 'Title must be unique';
        }
        if (empty($data['body']) || strlen($data['body']) < 50) {
            $errors['body'] = 'Body must be at least 50 characters';
        }
        if (empty($data['category']) || !in_array($data['category'], $this->validCategories)) {
            $errors['category'] = 'Category must be one of: ' . implode(', ', $this->validCategories);
        }
        return $errors;
    }

    private function titleExists(string $title, ?int $excludeId = null): bool {
        foreach ($this->posts as $post) {
            if ($post['title'] === $title && $post['id'] !== $excludeId) return true;
        }
        return false;
    }

    public function create(array $data): array {
        $errors = $this->validate($data);
        if (!empty($errors)) return ['success' => false, 'errors' => $errors];
        $post = ['id' => $this->nextId++, 'title' => $data['title'],
                 'body' => $data['body'], 'category' => $data['category'],
                 'published' => false, 'created_at' => date('Y-m-d')];
        $this->posts[] = $post;
        return ['success' => true, 'data' => $post];
    }

    public function publish(int $id): array {
        foreach ($this->posts as &$post) {
            if ($post['id'] === $id) {
                $post['published'] = true;
                return ['success' => true, 'data' => $post];
            }
        }
        return ['success' => false, 'errors' => ['id' => 'Post not found']];
    }

    public function getPublished(): array {
        return array_values(array_filter($this->posts, fn($p) => $p['published']));
    }
}

$service = new PostService();

// Create valid post
$r1 = $service->create([
    'title'    => 'Getting Started with Laravel',
    'body'     => str_repeat('Laravel is amazing. ', 5),  // 100+ chars
    'category' => 'tutorial',
]);
echo "Create valid: " . ($r1['success'] ? "OK (id=" . $r1['data']['id'] . ")" : "FAIL") . "\n";

// Create with invalid data
$r2 = $service->create(['title' => '', 'body' => 'Too short', 'category' => 'invalid']);
echo "Create invalid: " . implode(', ', $r2['errors']) . "\n";

// Duplicate title
$service->create(['title' => 'Duplicate Post', 'body' => str_repeat('content ', 10), 'category' => 'news']);
$r3 = $service->create(['title' => 'Duplicate Post', 'body' => str_repeat('content ', 10), 'category' => 'news']);
echo "Duplicate: " . ($r3['errors']['title'] ?? 'no error') . "\n";

// Publish
$service->publish(1);
$published = $service->getPublished();
echo "Published count: " . count($published) . "\n";
?>`,
          reference_solution: `<?php
class PostService{private array $posts=[];private int $nextId=1;private array $vc=['news','tutorial','review'];
public function validate(array $d):array{$e=[];
if(empty($d['title']))$e['title']='Title is required';
elseif(strlen($d['title'])>255)$e['title']='Title must not exceed 255 characters';
elseif($this->te($d['title'],$d['id']??null))$e['title']='Title must be unique';
if(empty($d['body'])||strlen($d['body'])<50)$e['body']='Body must be at least 50 characters';
if(empty($d['category'])||!in_array($d['category'],$this->vc))$e['category']='Category must be one of: '.implode(', ',$this->vc);
return $e;}
private function te(string $t,?int $x=null):bool{foreach($this->posts as $p)if($p['title']===$t&&$p['id']!==$x)return true;return false;}
public function create(array $d):array{$e=$this->validate($d);if(!empty($e))return['success'=>false,'errors'=>$e];$p=['id'=>$this->nextId++,'title'=>$d['title'],'body'=>$d['body'],'category'=>$d['category'],'published'=>false,'created_at'=>date('Y-m-d')];$this->posts[]=$p;return['success'=>true,'data'=>$p];}
public function publish(int $id):array{foreach($this->posts as &$p)if($p['id']===$id){$p['published']=true;return['success'=>true,'data'=>$p];}return['success'=>false,'errors'=>['id'=>'Post not found']];}
public function getPublished():array{return array_values(array_filter($this->posts,fn($p)=>$p['published']));}}
$s=new PostService();
$r1=$s->create(['title'=>'Getting Started with Laravel','body'=>str_repeat('Laravel is amazing. ',5),'category'=>'tutorial']);
echo "Create valid: ".($r1['success']?"OK (id=".$r1['data']['id'].")":"FAIL")."\n";
$r2=$s->create(['title'=>'','body'=>'Too short','category'=>'invalid']);
echo "Create invalid: ".implode(', ',$r2['errors'])."\n";
$s->create(['title'=>'Duplicate Post','body'=>str_repeat('content ',10),'category'=>'news']);
$r3=$s->create(['title'=>'Duplicate Post','body'=>str_repeat('content ',10),'category'=>'news']);
echo "Duplicate: ".($r3['errors']['title']??'no error')."\n";
$s->publish(1);
$pub=$s->getPublished();
echo "Published count: ".count($pub)."\n";
?>`,
          hints: [
            "Valid create returns success with id=1",
            "Empty title, short body, invalid category all fail validation",
            "Duplicate title produces 'Title must be unique' error",
            "After publishing post 1, getPublished() returns 1 item",
          ],
          test_cases: [
            { description: "Valid create succeeds with id=1", expected_output: "Create valid: OK (id=1)" },
            { description: "Invalid create returns errors", expected_output: "Create invalid: Title is required, Body must be at least 50 characters, Category must be one of: news, tutorial, review" },
            { description: "Duplicate title is rejected", expected_output: "Duplicate: Title must be unique" },
            { description: "One post published", expected_output: "Published count: 1" },
          ],
        },
      ],
    },
  ],
};
