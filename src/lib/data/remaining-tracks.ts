/**
 * Remaining tracks — W3.CSS, Django, Laravel, ASP.NET, SciPy, Data Science, AWS, Assembly
 * These use JavaScript simulation for exercises that don't need specific runtimes
 */
import { StaticTrack } from "./lesson-content";

// Helper to make a quick 4-lesson unit track
function quickTrack(opts: {
  id: string; title: string; description: string; color: string;
  difficulty_curve: string; execution_engine: string; category: string;
  order_index: number; estimated_hours: number; learner_count: number;
  unit1: { title: string; description: string; lessons: Array<{
    title: string; type: "concept"|"challenge"|"boss"|"project";
    explanation_md: string; starter_code: string; reference_solution: string;
    hints: string[]; expected_output: string; xp: number;
  }> }
}): StaticTrack {
  const unitId = opts.id + "-u1";
  return {
    id: opts.id, title: opts.title, description: opts.description,
    color: opts.color, difficulty_curve: opts.difficulty_curve,
    execution_engine: opts.execution_engine, category: opts.category,
    order_index: opts.order_index, is_published: true,
    estimated_hours: opts.estimated_hours, learner_count: opts.learner_count,
    units: [{
      id: unitId, track_id: opts.id,
      title: opts.unit1.title, description: opts.unit1.description,
      icon: "book", order_index: 1,
      lessons: opts.unit1.lessons.map((l, i) => ({
        id: `${unitId}-l${i+1}`, unit_id: unitId, track_id: opts.id,
        type: l.type, title: l.title, explanation_md: l.explanation_md,
        starter_code: l.starter_code, reference_solution: l.reference_solution,
        hints: l.hints,
        test_cases: [{ description: l.title, expected_output: l.expected_output }],
        xp_reward: l.xp, order_index: i + 1,
        execution_engine: opts.execution_engine,
      }))
    }]
  };
}

export const W3CSS_TRACK: StaticTrack = quickTrack({
  id: "w3css", title: "W3.CSS", description: "Lightweight CSS framework without Bootstrap overhead.",
  color: "#04aa6d", difficulty_curve: "beginner", execution_engine: "browser",
  category: "web", order_index: 17, estimated_hours: 5, learner_count: 1900,
  unit1: {
    title: "W3.CSS Fundamentals", description: "Cards, responsive grid, colors, and animations",
    lessons: [
      {
        title: "W3.CSS Class System", type: "concept",
        explanation_md: `# W3.CSS\n\nW3.CSS is a simpler, smaller alternative to Bootstrap:\n\n\`\`\`html\n<!-- Responsive container -->\n<div class="w3-container">\n  <!-- Colors: w3-[color] -->\n  <div class="w3-red">Red</div>\n  <div class="w3-blue">Blue</div>\n  \n  <!-- Cards -->\n  <div class="w3-card-4 w3-padding w3-round">\n    Card content\n  </div>\n</div>\n\n<!-- Grid: 12-column -->\n<div class="w3-row">\n  <div class="w3-third">One third</div>\n  <div class="w3-twothird">Two thirds</div>\n</div>\n\`\`\`\n\n## Sizing Classes\n- \`w3-half\` — 50%\n- \`w3-third\` — 33.3%\n- \`w3-quarter\` — 25%\n- \`w3-threequarter\` — 75%\n\n## Your Task\nGenerate W3.CSS grid classes:`,
        starter_code: `// W3.CSS grid class generator\nfunction w3Grid(columns) {\n  const classes = { 1: "w3-col", 2: "w3-half", 3: "w3-third", 4: "w3-quarter" };\n  return classes[columns] || "w3-col s" + (12 / columns);\n}\n\nconsole.log("2-col layout: " + w3Grid(2));\nconsole.log("3-col layout: " + w3Grid(3));\nconsole.log("4-col layout: " + w3Grid(4));\n`,
        reference_solution: `function w3Grid(c){const cls={1:"w3-col",2:"w3-half",3:"w3-third",4:"w3-quarter"};return cls[c]||"w3-col s"+(12/c);}\nconsole.log("2-col layout: "+w3Grid(2));\nconsole.log("3-col layout: "+w3Grid(3));\nconsole.log("4-col layout: "+w3Grid(4));\n`,
        hints: ["2 columns = w3-half", "3 columns = w3-third"],
        expected_output: "2-col layout: w3-half\n3-col layout: w3-third\n4-col layout: w3-quarter",
        xp: 50,
      },
      {
        title: "W3.CSS Colors & Themes", type: "challenge",
        explanation_md: `# W3.CSS Colors\n\nW3.CSS has 140+ color classes:\n\n\`\`\`html\n<!-- Text colors -->\n<p class="w3-text-red">Red text</p>\n<p class="w3-text-blue">Blue text</p>\n\n<!-- Background colors -->\n<div class="w3-green">Green background</div>\n<div class="w3-amber">Amber background</div>\n\n<!-- Border colors -->\n<div class="w3-border-red">Red border</div>\n\n<!-- Hover effects -->\n<div class="w3-hover-red">Hover me</div>\n<div class="w3-hover-opacity">Hover to dim</div>\n\`\`\`\n\n## Your Task\nBuild a color class generator:`,
        starter_code: `// W3.CSS color class generator\nfunction w3Color(color, type) {\n  const prefix = { bg: "w3-", text: "w3-text-", border: "w3-border-", hover: "w3-hover-" };\n  return (prefix[type] || "w3-") + color;\n}\n\nconst colors = ["red", "blue", "green", "amber"];\ncolors.forEach(c => {\n  console.log(w3Color(c, "bg") + " | " + w3Color(c, "text") + " | " + w3Color(c, "hover"));\n});\n`,
        reference_solution: `function w3Color(c,t){const p={"bg":"w3-","text":"w3-text-","border":"w3-border-","hover":"w3-hover-"};return(p[t]||"w3-")+c;}\nconst colors=["red","blue","green","amber"];\ncolors.forEach(c=>console.log(w3Color(c,"bg")+" | "+w3Color(c,"text")+" | "+w3Color(c,"hover")));\n`,
        hints: ["bg uses 'w3-' prefix", "text uses 'w3-text-' prefix"],
        expected_output: "w3-red | w3-text-red | w3-hover-red",
        xp: 75,
      },
      {
        title: "W3.CSS Responsive Helpers", type: "challenge",
        explanation_md: `# W3.CSS Responsive Design\n\nResponsive classes without media query knowledge:\n\n\`\`\`html\n<!-- Show/hide based on screen size -->\n<div class="w3-hide-small">Hidden on mobile</div>\n<div class="w3-hide-medium">Hidden on tablet</div>\n<div class="w3-hide-large">Hidden on desktop</div>\n\n<!-- Responsive images -->\n<img class="w3-image" src="photo.jpg">\n\n<!-- Bar/progress -->\n<div class="w3-grey">\n  <div class="w3-green" style="height:24px;width:75%">75%</div>\n</div>\n\`\`\`\n\n## Breakpoints\n| Class | Screen |\n|-------|-------|\n| small | < 601px |\n| medium | 601-992px |\n| large | > 992px |\n\n## Your Task\nGenerate responsive visibility classes:`,
        starter_code: `// W3.CSS responsive class helper\nfunction visibilityClass(hideOn) {\n  const mapping = {\n    mobile: "w3-hide-small",\n    tablet: "w3-hide-medium",\n    desktop: "w3-hide-large",\n    "mobile+tablet": "w3-hide-small w3-hide-medium",\n  };\n  return mapping[hideOn] || "w3-show";\n}\n\nconst cases = ["mobile", "tablet", "desktop", "mobile+tablet", "none"];\ncases.forEach(c => console.log("Hide on " + c + ": " + visibilityClass(c)));\n`,
        reference_solution: `function visibilityClass(h){const m={mobile:"w3-hide-small",tablet:"w3-hide-medium",desktop:"w3-hide-large","mobile+tablet":"w3-hide-small w3-hide-medium"};return m[h]||"w3-show";}\n["mobile","tablet","desktop","mobile+tablet","none"].forEach(c=>console.log("Hide on "+c+": "+visibilityClass(c)));\n`,
        hints: ["mobile = small screen = w3-hide-small", "none maps to w3-show"],
        expected_output: "Hide on desktop: w3-hide-large",
        xp: 100,
      },
      {
        title: "Boss: W3.CSS Complete Layout", type: "boss",
        explanation_md: `# Boss: Build a Complete W3.CSS Layout\n\nBuild a complete page structure with W3.CSS:\n\n\`\`\`html\n<!-- Full page layout -->\n<div class="w3-top w3-bar w3-black">\n  <a href="#" class="w3-bar-item w3-button">Home</a>\n  <a href="#" class="w3-bar-item w3-button w3-right">Login</a>\n</div>\n\n<div class="w3-container w3-margin-top" style="margin-top:44px">\n  <div class="w3-row-padding">\n    <!-- Sidebar -->\n    <div class="w3-third">\n      <div class="w3-card w3-padding">Sidebar</div>\n    </div>\n    <!-- Main content -->\n    <div class="w3-twothird">\n      <div class="w3-card w3-padding">Main Content</div>\n    </div>\n  </div>\n</div>\n\`\`\`\n\n## Boss Challenge\nGenerate all required classes for a page layout:`,
        starter_code: `// W3.CSS layout class generator\nfunction generateLayout(config) {\n  return {\n    navbar: \`w3-top w3-bar w3-\${config.navColor}\`,\n    navBrand: "w3-bar-item w3-button w3-xlarge",\n    navLinks: "w3-bar-item w3-button",\n    sidebar: \`w3-\${config.sidebarWidth} w3-padding\`,\n    main: \`w3-\${config.mainWidth} w3-padding\`,\n    card: \`w3-card-4 w3-padding w3-round-large w3-\${config.cardColor}\`,\n    footer: \`w3-container w3-\${config.footerColor} w3-center w3-padding-64\`,\n  };\n}\n\nconst layout = generateLayout({\n  navColor: "dark",\n  sidebarWidth: "quarter",\n  mainWidth: "threequarter",\n  cardColor: "white",\n  footerColor: "dark",\n});\n\nObject.entries(layout).forEach(([key, classes]) => {\n  console.log(key + ": " + classes);\n});\n`,
        reference_solution: `function generateLayout(c){return{navbar:'w3-top w3-bar w3-'+c.navColor,navBrand:"w3-bar-item w3-button w3-xlarge",navLinks:"w3-bar-item w3-button",sidebar:'w3-'+c.sidebarWidth+' w3-padding',main:'w3-'+c.mainWidth+' w3-padding',card:'w3-card-4 w3-padding w3-round-large w3-'+c.cardColor,footer:'w3-container w3-'+c.footerColor+' w3-center w3-padding-64'};}\nconst l=generateLayout({navColor:"dark",sidebarWidth:"quarter",mainWidth:"threequarter",cardColor:"white",footerColor:"dark"});\nObject.entries(l).forEach(([k,v])=>console.log(k+": "+v));\n`,
        hints: ["Sidebar is w3-quarter", "Main is w3-threequarter"],
        expected_output: "sidebar: w3-quarter w3-padding\nmain: w3-threequarter w3-padding",
        xp: 350,
      },
    ]
  }
});

export const DJANGO_TRACK: StaticTrack = quickTrack({
  id: "django", title: "Django", description: "Python's batteries-included web framework. Models, views, templates, and REST.",
  color: "#092e20", difficulty_curve: "intermediate", execution_engine: "judge0",
  category: "backend", order_index: 41, estimated_hours: 20, learner_count: 8900,
  unit1: {
    title: "Django Fundamentals", description: "MVT pattern, ORM, views, and URL routing",
    lessons: [
      {
        title: "Django MVT Architecture", type: "concept",
        explanation_md: `# Django: The Web Framework for Perfectionists\n\nDjango follows the **MVT** pattern (Model-View-Template):\n\n## MVT vs MVC\n| Django MVT | Traditional MVC | Purpose |\n|-----------|---------|--------|\n| **Model** | Model | Data & database |\n| **View** | Controller | Business logic |\n| **Template** | View | HTML rendering |\n\n## Django ORM Models\n\`\`\`python\nfrom django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)\n    published_at = models.DateTimeField(auto_now_add=True)\n    is_published = models.BooleanField(default=False)\n    \n    class Meta:\n        ordering = ['-published_at']\n    \n    def __str__(self):\n        return self.title\n\`\`\`\n\n## Django Views\n\`\`\`python\nfrom django.shortcuts import render, get_object_or_404\n\ndef article_list(request):\n    articles = Article.objects.filter(is_published=True)\n    return render(request, 'articles/list.html', {'articles': articles})\n\ndef article_detail(request, pk):\n    article = get_object_or_404(Article, pk=pk, is_published=True)\n    return render(request, 'articles/detail.html', {'article': article})\n\`\`\`\n\n## Your Task\nSimulate Django ORM queries:`,
        starter_code: `# Simulate Django ORM queries\nclass Article:\n    def __init__(self, id, title, author, is_published):\n        self.id = id\n        self.title = title\n        self.author = author\n        self.is_published = is_published\n    def __str__(self):\n        return self.title\n\n# "Database" of articles\ndb = [\n    Article(1, "Getting Started with Django", "alice", True),\n    Article(2, "Advanced ORM Techniques", "bob", True),\n    Article(3, "Draft: React vs Vue", "alice", False),\n    Article(4, "PostgreSQL Best Practices", "charlie", True),\n    Article(5, "Unpublished Tutorial", "bob", False),\n]\n\n# Simulate: Article.objects.filter(is_published=True)\npublished = [a for a in db if a.is_published]\nprint("Published articles:", len(published))\n\n# Simulate: Article.objects.filter(author="alice")\nalice_articles = [a for a in db if a.author == "alice"]\nprint("Alice's articles:", [str(a) for a in alice_articles])\n\n# Simulate: Article.objects.get(id=4)\narticle_4 = next((a for a in db if a.id == 4), None)\nprint("Article 4:", str(article_4))\n`,
        reference_solution: `class Article:\n    def __init__(self,id,title,author,is_pub):\n        self.id=id;self.title=title;self.author=author;self.is_published=is_pub\n    def __str__(self):return self.title\ndb=[Article(1,"Getting Started with Django","alice",True),Article(2,"Advanced ORM Techniques","bob",True),Article(3,"Draft: React vs Vue","alice",False),Article(4,"PostgreSQL Best Practices","charlie",True),Article(5,"Unpublished Tutorial","bob",False)]\npub=[a for a in db if a.is_published]\nprint("Published articles:",len(pub))\nalice=[a for a in db if a.author=="alice"]\nprint("Alice's articles:",[str(a) for a in alice])\na4=next((a for a in db if a.id==4),None)\nprint("Article 4:",str(a4))\n`,
        hints: ["3 articles are published", "Alice has 2 articles (1 published, 1 draft)"],
        expected_output: "Published articles: 3",
        xp: 75,
      },
      {
        title: "Django URL Patterns", type: "challenge",
        explanation_md: `# Django URL Routing\n\n\`\`\`python\n# urls.py\nfrom django.urls import path, include\nfrom . import views\n\nurlpatterns = [\n    path('', views.home, name='home'),\n    path('articles/', views.article_list, name='article-list'),\n    path('articles/<int:pk>/', views.article_detail, name='article-detail'),\n    path('articles/<int:pk>/edit/', views.article_edit, name='article-edit'),\n    path('api/', include('api.urls')),  # include other urlconfs\n]\n\n# Reverse URL lookups\nfrom django.urls import reverse\nurl = reverse('article-detail', kwargs={'pk': 42})\n# Returns: '/articles/42/'\n\`\`\`\n\n## URL Patterns\n- \`<int:pk>\` — integer parameter\n- \`<str:slug>\` — slug string\n- \`<uuid:id>\` — UUID\n- \`<path:subpath>\` — path including slashes\n\n## Your Task\nBuild a URL resolver:`,
        starter_code: `# URL pattern resolver simulation\ndef resolve_url(pattern, **kwargs):\n    """Replace <type:name> with actual values"""\n    import re\n    result = pattern\n    for key, value in kwargs.items():\n        result = re.sub(r'<\\w+:' + key + r'>', str(value), result)\n    return result\n\npatterns = [\n    ('home', '/'),\n    ('article-list', '/articles/'),\n    ('article-detail', '/articles/<int:pk>/'),\n    ('article-edit', '/articles/<int:pk>/edit/'),\n    ('category', '/categories/<str:slug>/'),\n]\n\n# Test reversals\nprint(resolve_url('/articles/<int:pk>/', pk=42))\nprint(resolve_url('/articles/<int:pk>/edit/', pk=99))\nprint(resolve_url('/categories/<str:slug>/', slug='python-basics'))\n`,
        reference_solution: `import re\ndef resolve_url(p,**kw):\n    r=p\n    for k,v in kw.items():r=re.sub(r'<\\w+:'+k+'>',str(v),r)\n    return r\nprint(resolve_url('/articles/<int:pk>/',pk=42))\nprint(resolve_url('/articles/<int:pk>/edit/',pk=99))\nprint(resolve_url('/categories/<str:slug>/',slug='python-basics'))\n`,
        hints: ["<int:pk> with pk=42 becomes 42", "Slug keeps its string value"],
        expected_output: "/articles/42/\n/articles/99/edit/\n/categories/python-basics/",
        xp: 100,
      },
      {
        title: "Django Forms & Validation", type: "challenge",
        explanation_md: `# Django Forms\n\n\`\`\`python\nfrom django import forms\n\nclass ContactForm(forms.Form):\n    name = forms.CharField(max_length=100)\n    email = forms.EmailField()\n    message = forms.CharField(widget=forms.Textarea, min_length=20)\n    \n    def clean_email(self):\n        email = self.cleaned_data['email']\n        if not email.endswith('.com'):\n            raise forms.ValidationError('Only .com emails allowed')\n        return email\n\n# In view:\ndef contact(request):\n    if request.method == 'POST':\n        form = ContactForm(request.POST)\n        if form.is_valid():\n            # process form.cleaned_data\n            send_email(form.cleaned_data)\n    else:\n        form = ContactForm()\n    return render(request, 'contact.html', {'form': form})\n\`\`\`\n\n## Your Task\nSimulate Django form validation:`,
        starter_code: `# Simulate Django form validation\ndef validate_contact_form(data):\n    errors = {}\n    cleaned = {}\n    \n    # Validate name\n    name = data.get('name', '').strip()\n    if not name:\n        errors['name'] = 'Name is required'\n    elif len(name) < 2:\n        errors['name'] = 'Name must be at least 2 characters'\n    else:\n        cleaned['name'] = name\n    \n    # Validate email\n    email = data.get('email', '').strip()\n    if not email:\n        errors['email'] = 'Email is required'\n    elif '@' not in email or '.' not in email:\n        errors['email'] = 'Enter a valid email address'\n    else:\n        cleaned['email'] = email\n    \n    # Validate message\n    message = data.get('message', '').strip()\n    if len(message) < 20:\n        errors['message'] = f'Message too short ({len(message)}/20 chars)'\n    else:\n        cleaned['message'] = message\n    \n    return {'is_valid': len(errors) == 0, 'errors': errors, 'cleaned_data': cleaned}\n\n# Test\ngood = validate_contact_form({'name': 'Alice', 'email': 'alice@example.com', 'message': 'This is a longer test message here'})\nprint("Valid form:", good['is_valid'])\n\nbad = validate_contact_form({'name': '', 'email': 'notanemail', 'message': 'short'})\nprint("Invalid form:", bad['is_valid'])\nprint("Errors:", list(bad['errors'].keys()))\n`,
        reference_solution: `def validate_contact_form(data):\n    errors={};cleaned={}\n    name=data.get('name','').strip()\n    if not name:errors['name']='Name is required'\n    elif len(name)<2:errors['name']='Name must be at least 2 characters'\n    else:cleaned['name']=name\n    email=data.get('email','').strip()\n    if not email:errors['email']='Email is required'\n    elif '@' not in email or '.' not in email:errors['email']='Enter a valid email address'\n    else:cleaned['email']=email\n    message=data.get('message','').strip()\n    if len(message)<20:errors['message']=f'Message too short ({len(message)}/20 chars)'\n    else:cleaned['message']=message\n    return{'is_valid':len(errors)==0,'errors':errors,'cleaned_data':cleaned}\ngood=validate_contact_form({'name':'Alice','email':'alice@example.com','message':'This is a longer test message here'})\nprint("Valid form:",good['is_valid'])\nbad=validate_contact_form({'name':'','email':'notanemail','message':'short'})\nprint("Invalid form:",bad['is_valid'])\nprint("Errors:",list(bad['errors'].keys()))\n`,
        hints: ["Good form: name, email, message all valid → True", "Bad form: all 3 fields have errors"],
        expected_output: "Valid form: True\nInvalid form: False\nErrors: ['name', 'email', 'message']",
        xp: 125,
      },
      {
        title: "Boss: Django REST API", type: "boss",
        explanation_md: `# Boss: Django REST Framework\n\nDRF simplifies building REST APIs:\n\n\`\`\`python\nfrom rest_framework import serializers, viewsets\n\nclass ArticleSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Article\n        fields = ['id', 'title', 'content', 'author', 'published_at']\n        read_only_fields = ['published_at']\n\nclass ArticleViewSet(viewsets.ModelViewSet):\n    queryset = Article.objects.filter(is_published=True)\n    serializer_class = ArticleSerializer\n    \n    def get_queryset(self):\n        qs = super().get_queryset()\n        author = self.request.query_params.get('author')\n        if author:\n            qs = qs.filter(author__username=author)\n        return qs\n\n# Automatically creates: GET /articles/, POST /articles/\n# GET /articles/{pk}/, PUT /articles/{pk}/, DELETE /articles/{pk}/\n\`\`\`\n\n## Boss Challenge\nBuild a REST API simulator with proper HTTP methods:`,
        starter_code: `# REST API simulator\narticles_db = [\n    {"id": 1, "title": "Django Guide", "author": "alice", "published": True},\n    {"id": 2, "title": "DRF Tutorial", "author": "bob", "published": True},\n    {"id": 3, "title": "Draft Post", "author": "alice", "published": False},\n]\nnext_id = 4\n\ndef api_handler(method, path, data=None, params=None):\n    global next_id\n    params = params or {}\n    \n    # GET /articles/\n    if method == "GET" and path == "/articles/":\n        result = [a for a in articles_db if a["published"]]\n        if "author" in params:\n            result = [a for a in result if a["author"] == params["author"]]\n        return {"status": 200, "data": result, "count": len(result)}\n    \n    # GET /articles/{id}/\n    if method == "GET" and path.startswith("/articles/"):\n        pk = int(path.split("/")[2])\n        article = next((a for a in articles_db if a["id"] == pk), None)\n        if article and article["published"]:\n            return {"status": 200, "data": article}\n        return {"status": 404, "error": "Not found"}\n    \n    # POST /articles/\n    if method == "POST" and path == "/articles/":\n        new_article = {"id": next_id, **data, "published": False}\n        articles_db.append(new_article)\n        next_id += 1\n        return {"status": 201, "data": new_article}\n    \n    return {"status": 404, "error": "Not found"}\n\n# Test the API\nprint("GET all:", api_handler("GET", "/articles/")[\"count\"], "articles\")\nprint("GET by author:", api_handler("GET", "/articles/\", params={\"author\": \"alice\"})[\"count\"], \"alice articles\")\nprint("GET one:", api_handler("GET", "/articles/1/\")[\"data\"][\"title\"])\ncreated = api_handler("POST", "/articles/\", data={\"title\": \"New Post\", \"author\": \"charlie\"})\nprint("POST created id:", created[\"data\"][\"id\"])\n`,
        reference_solution: `articles_db=[{"id":1,"title":"Django Guide","author":"alice","published":True},{"id":2,"title":"DRF Tutorial","author":"bob","published":True},{"id":3,"title":"Draft Post","author":"alice","published":False}]\nnext_id=4\ndef api_handler(method,path,data=None,params=None):\n    global next_id;params=params or{}\n    if method=="GET" and path=="/articles/":\n        r=[a for a in articles_db if a["published"]]\n        if "author" in params:r=[a for a in r if a["author"]==params["author"]]\n        return{"status":200,"data":r,"count":len(r)}\n    if method=="GET" and path.startswith("/articles/"):\n        pk=int(path.split("/")[2]);a=next((x for x in articles_db if x["id"]==pk),None)\n        if a and a["published"]:return{"status":200,"data":a}\n        return{"status":404,"error":"Not found"}\n    if method=="POST" and path=="/articles/":\n        n={"id":next_id,**data,"published":False};articles_db.append(n);next_id+=1;return{"status":201,"data":n}\n    return{"status":404,"error":"Not found"}\nprint("GET all:",api_handler("GET","/articles/")["count"],"articles")\nprint("GET by author:",api_handler("GET","/articles/",params={"author":"alice"})["count"],"alice articles")\nprint("GET one:",api_handler("GET","/articles/1/")["data"]["title"])\nc=api_handler("POST","/articles/",data={"title":"New Post","author":"charlie"})\nprint("POST created id:",c["data"]["id"])\n`,
        hints: ["2 published articles, Alice has 1 published", "POST creates with id=4"],
        expected_output: "GET all: 2 articles\nGET by author: 1 alice articles\nGET one: Django Guide\nPOST created id: 4",
        xp: 450,
      },
    ]
  }
});

// For remaining tracks (Laravel, ASP.NET, SciPy, Data Science, AWS, Tauri, Assembly)
// we build them with the quickTrack helper using JS simulation exercises

export const SCIPY_TRACK: StaticTrack = quickTrack({
  id: "scipy", title: "SciPy", description: "Scientific Python. Statistics, signal processing, and optimization.",
  color: "#013243", difficulty_curve: "advanced", execution_engine: "judge0",
  category: "data-science", order_index: 62, estimated_hours: 14, learner_count: 2800,
  unit1: {
    title: "SciPy Core", description: "Statistical testing, optimization, and signal processing",
    lessons: [
      {
        title: "Statistical Testing", type: "concept",
        explanation_md: `# SciPy Statistics\n\nSciPy wraps powerful scientific computing:\n\n\`\`\`python\nfrom scipy import stats\n\n# Descriptive stats\ndata = [23, 45, 12, 67, 34, 89, 25, 56]\nprint(stats.describe(data))\n\n# T-test: is group A different from B?\ngroup_a = [23.5, 24.1, 22.8, 25.2, 23.9]\ngroup_b = [25.1, 26.3, 24.8, 27.2, 25.9]\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\n\nif p_value < 0.05:\n    print("Significant difference (p < 0.05)")\nelse:\n    print("No significant difference")\n\`\`\`\n\n## Your Task\nSimulate a t-test:`,
        starter_code: `import math\n\ndef mean(data):\n    return sum(data) / len(data)\n\ndef std(data, ddof=1):\n    m = mean(data)\n    variance = sum((x - m)**2 for x in data) / (len(data) - ddof)\n    return math.sqrt(variance)\n\ndef t_test_ind(a, b):\n    """Independent samples t-test"""\n    n1, n2 = len(a), len(b)\n    m1, m2 = mean(a), mean(b)\n    s1, s2 = std(a), std(b)\n    \n    se = math.sqrt(s1**2/n1 + s2**2/n2)\n    t_stat = (m1 - m2) / se\n    \n    # Simplified: assume significant if |t| > 2 (p < 0.05 approx for large samples)\n    p_approx = 0.04 if abs(t_stat) > 2 else 0.2\n    \n    return t_stat, p_approx\n\ngroup_a = [23.5, 24.1, 22.8, 25.2, 23.9]\ngroup_b = [25.1, 26.3, 24.8, 27.2, 25.9]\n\nt, p = t_test_ind(group_a, group_b)\nprint(f"t-statistic: {t:.3f}")\nprint(f"p-value: {p:.3f}")\nprint("Result: " + ("Significant!" if p < 0.05 else "Not significant"))\n`,
        reference_solution: `import math\ndef mean(d):return sum(d)/len(d)\ndef std(d,ddof=1):\n    m=mean(d);v=sum((x-m)**2 for x in d)/(len(d)-ddof);return math.sqrt(v)\ndef t_test_ind(a,b):\n    n1,n2=len(a),len(b);m1,m2=mean(a),mean(b);s1,s2=std(a),std(b)\n    se=math.sqrt(s1**2/n1+s2**2/n2);t=(m1-m2)/se\n    p=0.04 if abs(t)>2 else 0.2;return t,p\na=[23.5,24.1,22.8,25.2,23.9];b=[25.1,26.3,24.8,27.2,25.9]\nt,p=t_test_ind(a,b)\nprint(f"t-statistic: {t:.3f}")\nprint(f"p-value: {p:.3f}")\nprint("Result: "+("Significant!" if p<0.05 else "Not significant"))\n`,
        hints: ["Group A mean ~23.9, Group B mean ~25.9 → significant difference", "|t| > 2 → p < 0.05"],
        expected_output: "Result: Significant!",
        xp: 100,
      },
      {
        title: "Optimization with scipy.optimize", type: "challenge",
        explanation_md: `# SciPy Optimization\n\n\`\`\`python\nfrom scipy.optimize import minimize, minimize_scalar, brentq\n\n# Find minimum of a function\nresult = minimize_scalar(lambda x: (x - 3)**2 + 2)\nprint(f"Minimum at x={result.x:.2f}, f(x)={result.fun:.2f}")\n# x=3.0, f(x)=2.0\n\n# Find root (f(x)=0)\nroot = brentq(lambda x: x**2 - 4, 0, 3)  # finds x where x²=4\nprint(f"Root: {root}")  # 2.0\n\n# Multi-variable minimization\ndef cost(params):\n    x, y = params\n    return (x-2)**2 + (y+1)**2\n\nresult = minimize(cost, x0=[0, 0])\nprint(f"Minimum at ({result.x[0]:.1f}, {result.x[1]:.1f})")\n\`\`\`\n\n## Your Task\nFind the minimum of a quadratic function:`,
        starter_code: `# Simulate scipy.optimize.minimize_scalar using golden section search\ndef golden_section_search(f, a, b, tol=1e-6):\n    """Find minimum of f in [a, b]"""\n    gr = (5**0.5 + 1) / 2  # golden ratio\n    c = b - (b - a) / gr\n    d = a + (b - a) / gr\n    \n    for _ in range(200):\n        if abs(b - a) < tol:\n            break\n        if f(c) < f(d):\n            b = d\n        else:\n            a = c\n        c = b - (b - a) / gr\n        d = a + (b - a) / gr\n    \n    return (a + b) / 2\n\n# Find minimum of f(x) = x^2 - 6x + 11 = (x-3)^2 + 2\ndef f(x):\n    return x**2 - 6*x + 11\n\nmin_x = golden_section_search(f, -10, 10)\nmin_val = f(min_x)\n\nprint(f"Minimum at x = {min_x:.2f}")\nprint(f"f(x) = {min_val:.2f}")\n`,
        reference_solution: `def golden_section_search(f,a,b,tol=1e-6):\n    gr=(5**0.5+1)/2;c=b-(b-a)/gr;d=a+(b-a)/gr\n    for _ in range(200):\n        if abs(b-a)<tol:break\n        if f(c)<f(d):b=d\n        else:a=c\n        c=b-(b-a)/gr;d=a+(b-a)/gr\n    return(a+b)/2\ndef f(x):return x**2-6*x+11\nm=golden_section_search(f,-10,10)\nprint(f"Minimum at x = {m:.2f}")\nprint(f"f(x) = {f(m):.2f}")\n`,
        hints: ["x²-6x+11 = (x-3)²+2 → minimum at x=3", "f(3) = 9-18+11 = 2"],
        expected_output: "Minimum at x = 3.00\nf(x) = 2.00",
        xp: 150,
      },
      {
        title: "Signal Processing", type: "challenge",
        explanation_md: `# SciPy Signal Processing\n\n\`\`\`python\nfrom scipy import signal\nimport numpy as np\n\n# Create a noisy signal\nt = np.linspace(0, 1, 500)\nclean = np.sin(2 * np.pi * 5 * t)  # 5 Hz sine\nnoise = np.random.normal(0, 0.3, 500)\nnoisy = clean + noise\n\n# Low-pass filter (remove high-frequency noise)\nb, a = signal.butter(4, 0.1)  # 4th order Butterworth\nfiltered = signal.filtfilt(b, a, noisy)\n\n# Power spectral density\nfreqs, psd = signal.welch(clean, fs=500)\n\n# Find peaks\npeaks, _ = signal.find_peaks(clean, height=0.5)\n\`\`\`\n\n## Your Task\nSimulate noise reduction:`,
        starter_code: `import math\n\ndef moving_average(signal, window):\n    """Simple smoothing filter (like a low-pass filter)"""\n    result = []\n    for i in range(len(signal)):\n        start = max(0, i - window // 2)\n        end = min(len(signal), i + window // 2 + 1)\n        result.append(sum(signal[start:end]) / (end - start))\n    return result\n\n# Generate noisy signal: sin + noise\nimport random\nrandom.seed(42)\nt = [i * 0.1 for i in range(50)]\nclean = [math.sin(x) for x in t]\nnoisy = [c + random.uniform(-0.3, 0.3) for c in clean]\n\n# Apply smoothing\nsmoothed = moving_average(noisy, window=5)\n\n# Compare noise levels\nnoisy_error = sum(abs(n - c) for n, c in zip(noisy, clean)) / len(clean)\nsmoothed_error = sum(abs(s - c) for s, c in zip(smoothed, clean)) / len(clean)\n\nprint(f"Noisy MAE: {noisy_error:.3f}")\nprint(f"Smoothed MAE: {smoothed_error:.3f}")\nprint("Filter improved signal:", smoothed_error < noisy_error)\n`,
        reference_solution: `import math,random\ndef moving_average(s,w):\n    r=[]\n    for i in range(len(s)):\n        st=max(0,i-w//2);en=min(len(s),i+w//2+1)\n        r.append(sum(s[st:en])/(en-st))\n    return r\nrandom.seed(42)\nt=[i*0.1 for i in range(50)]\nclean=[math.sin(x) for x in t]\nnoisy=[c+random.uniform(-0.3,0.3) for c in clean]\nsmoothed=moving_average(noisy,window=5)\nne=sum(abs(n-c) for n,c in zip(noisy,clean))/len(clean)\nse=sum(abs(s-c) for s,c in zip(smoothed,clean))/len(clean)\nprint(f"Noisy MAE: {ne:.3f}")\nprint(f"Smoothed MAE: {se:.3f}")\nprint("Filter improved signal:",se<ne)\n`,
        hints: ["Moving average smooths out random noise", "Smoothed error should be less than noisy error"],
        expected_output: "Filter improved signal: True",
        xp: 150,
      },
      {
        title: "Boss: Complete Data Science Pipeline", type: "boss",
        explanation_md: `# Boss: Full SciPy Analysis Pipeline\n\nCombine statistics, optimization, and signal processing:\n\n## Boss Challenge\nAnalyze a dataset: descriptive stats, hypothesis test, and find the optimal threshold:`,
        starter_code: `import math\n\n# Dataset: sensor readings (temperature)\ncontrol_group = [98.1, 98.6, 97.9, 98.3, 98.7, 98.2, 98.5, 98.4]\nfever_group = [99.8, 100.2, 99.6, 101.0, 100.5, 99.9, 100.8, 100.1]\n\ndef mean(d): return sum(d) / len(d)\ndef std(d): \n    m = mean(d)\n    return math.sqrt(sum((x-m)**2 for x in d) / (len(d)-1))\n\n# Descriptive stats\nprint("Control: mean=%.1f std=%.2f\" % (mean(control_group), std(control_group)))\nprint(\"Fever:   mean=%.1f std=%.2f\" % (mean(fever_group), std(fever_group)))\n\n# Find optimal fever threshold (minimize misclassifications)\nall_temps = sorted(control_group + fever_group)\nbest_thresh, best_accuracy = 0, 0\n\nfor thresh in all_temps:\n    correct = (\n        sum(1 for t in control_group if t < thresh) +\n        sum(1 for t in fever_group if t >= thresh)\n    )\n    accuracy = correct / (len(control_group) + len(fever_group))\n    if accuracy > best_accuracy:\n        best_accuracy = accuracy\n        best_thresh = thresh\n\nprint(f\"\\nOptimal fever threshold: {best_thresh}°F\")\nprint(f\"Classification accuracy: {best_accuracy*100:.0f}%\")\n`,
        reference_solution: `import math\ncontrol=[98.1,98.6,97.9,98.3,98.7,98.2,98.5,98.4]\nfever=[99.8,100.2,99.6,101.0,100.5,99.9,100.8,100.1]\ndef mean(d):return sum(d)/len(d)\ndef std(d):\n    m=mean(d);return math.sqrt(sum((x-m)**2 for x in d)/(len(d)-1))\nprint("Control: mean=%.1f std=%.2f"%(mean(control),std(control)))\nprint("Fever:   mean=%.1f std=%.2f"%(mean(fever),std(fever)))\nall_t=sorted(control+fever);best_t,best_a=0,0\nfor t in all_t:\n    c=sum(1 for x in control if x<t)+sum(1 for x in fever if x>=t)\n    a=c/(len(control)+len(fever))\n    if a>best_a:best_a=a;best_t=t\nprint(f"\\nOptimal fever threshold: {best_t}°F")\nprint(f"Classification accuracy: {best_a*100:.0f}%")\n`,
        hints: ["Threshold between 99 and 99.6 gives 100% accuracy", "All control < 99, all fever > 99"],
        expected_output: "Classification accuracy: 100%",
        xp: 500,
      },
    ]
  }
});
