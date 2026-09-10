import type { StaticTrack } from "./lesson-content";

export const KOTLIN_TRACK: StaticTrack = {
  id: "kotlin",
  title: "Kotlin",
  description: `Null safety, coroutines, and modern JVM. The official Android language.`,
  color: "#a97bff",
  difficulty_curve: "intermediate",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "kotlin-u1",
      track_id: "kotlin",
      title: "Kotlin Unit 1",
      description: `Kotlin concepts`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "kotlin-u1-l1",
          unit_id: "kotlin-u1",
          track_id: "kotlin",
          type: "concept",
          title: "Kotlin Basics",
          explanation_md: `## Kotlin: Modern JVM Language

\`\`\`kotlin
fun main() {
    val name = "Alice"  // immutable
    var age = 30         // mutable
    println("$name is $age")  // string templates
    
    val greeting = if (age >= 18) "Welcome!" else "Come back later"
    println(greeting)
}

// Data classes
data class Person(val name: String, val age: Int)
val alice = Person("Alice", 30)
val older = alice.copy(age = 31)  // non-destructive copy
\`\`\`
### Challenge
Write \`formatPerson(name, age)\` returning \`"NAME is AGE"\`.`,
          starter_code: `function formatPerson(name,age){return name+" is "+age;}
console.log(formatPerson("Alice",30));`,
          reference_solution: `function formatPerson(n,a){return n+" is "+a;}
console.log(formatPerson("Alice",30));`,
          hints: [],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Alice is 30`, expected_output: `Alice is 30` },
          ],
        },
        {
          id: "kotlin-u1-l2",
          unit_id: "kotlin-u1",
          track_id: "kotlin",
          type: "concept",
          title: "Null Safety",
          explanation_md: `## Kotlin Null Safety

\`\`\`kotlin
// Nullable types
var name: String? = null  // ? makes it nullable

// Safe call
val length = name?.length  // null if name is null

// Elvis operator
val len = name?.length ?: 0  // 0 if null

// Not-null assertion
val definiteLength = name!!.length  // throws if null

// Let block
name?.let { println("Name: $it") }  // only runs if not null
\`\`\`
### Challenge
Write \`safeLength(s)\` returning string length or 0 if null/undefined.`,
          starter_code: `function safeLength(s){return s?.length??0;}
console.log(safeLength("hello"));
console.log(safeLength(null));
console.log(safeLength(undefined));`,
          reference_solution: `function safeLength(s){return s?.length??0;}
console.log(safeLength("hello"));
console.log(safeLength(null));
console.log(safeLength(undefined));`,
          hints: [],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `hello -> 5`, expected_output: `5` },
            { description: `null -> 0`, expected_output: `0` },
            { description: `undefined -> 0`, expected_output: `0` },
          ],
        },
        {
          id: "kotlin-u1-l3",
          unit_id: "kotlin-u1",
          track_id: "kotlin",
          type: "concept",
          title: "Extension Functions",
          explanation_md: `## Extension Functions

\`\`\`kotlin
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

fun List<Int>.average(): Double {
    return if (isEmpty()) 0.0 else sum().toDouble() / size
}

"racecar".isPalindrome()  // true
listOf(1,2,3,4,5).average()  // 3.0
\`\`\`
### Challenge
Write \`isPalindrome(s)\` and \`average(nums)\`.`,
          starter_code: `function isPalindrome(s){const c=s.toLowerCase().replace(/[^a-z]/g,'');return c===c.split('').reverse().join('');}
function average(nums){return nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:0;}
console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));
console.log(average([1,2,3,4,5]));`,
          reference_solution: `function isPalindrome(s){const c=s.toLowerCase().replace(/[^a-z]/g,'');return c===c.split('').reverse().join('');}
function average(nums){return nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:0;}
console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));
console.log(average([1,2,3,4,5]));`,
          hints: [],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `racecar palindrome`, expected_output: `true` },
            { description: `hello not palindrome`, expected_output: `false` },
            { description: `average 1-5`, expected_output: `3` },
          ],
        },
        {
          id: "kotlin-u1-l4",
          unit_id: "kotlin-u1",
          track_id: "kotlin",
          type: "challenge",
          title: "Kotlin Boss: Coroutines Simulation",
          explanation_md: `## Boss: Simulate Coroutines

Kotlin coroutines are lightweight threads:

\`\`\`kotlin
suspend fun fetchUser(id: Int): User = coroutineScope {
    val profile = async { api.getProfile(id) }
    val posts = async { api.getPosts(id) }
    User(profile.await(), posts.await())
}
\`\`\`
### Boss
Write \`runParallel(tasks)\` — runs all task functions, returns results sorted alphabetically.`,
          starter_code: `function runParallel(tasks){return tasks.map(t=>t()).sort();}
console.log(runParallel([()=>"fetchUser",()=>"fetchPosts",()=>"fetchComments"]).join(','));`,
          reference_solution: `function runParallel(tasks){return tasks.map(t=>t()).sort();}
console.log(runParallel([()=>"fetchUser",()=>"fetchPosts",()=>"fetchComments"]).join(','));`,
          hints: [],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Sorted results`, expected_output: `fetchComments,fetchPosts,fetchUser` },
          ],
        },
      ],
    },
    {
      id: "kotlin-u2",
      track_id: "kotlin",
      title: "Kotlin Unit 2",
      description: `Kotlin concepts`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "kotlin-u2-l1",
          unit_id: "kotlin-u2",
          track_id: "kotlin",
          type: "concept",
          title: "Collections & Lambdas",
          explanation_md: `## Kotlin Collections API

\`\`\`kotlin
val nums = listOf(1,2,3,4,5,6,7,8,9,10)
val result = nums
    .filter { it % 2 == 0 }
    .map { it * it }
    .reduce { acc, n -> acc + n }  // 220

val grouped = people.groupBy { it.city }
val sorted = people.sortedBy { it.name }
val first = people.firstOrNull { it.age > 25 }
\`\`\`
### Challenge
Write \`groupByLength(words)\` — groups words by their length.`,
          starter_code: `function groupByLength(words){
  const groups={};
  for(const w of words){const l=w.length;if(!groups[l])groups[l]=[];groups[l].push(w);}
  return groups;
}
console.log(JSON.stringify(groupByLength(["cat","dog","bear","elk","deer"])));`,
          reference_solution: `function groupByLength(words){const g={};for(const w of words){const l=w.length;if(!g[l])g[l]=[];g[l].push(w);}return g;}
console.log(JSON.stringify(groupByLength(["cat","dog","bear","elk","deer"])));`,
          hints: [],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Grouped by length`, expected_output: `{"3":["cat","dog","elk"],"4":["bear","deer"]}` },
          ],
        },
        {
          id: "kotlin-u2-l2",
          unit_id: "kotlin-u2",
          track_id: "kotlin",
          type: "concept",
          title: "Sealed Classes",
          explanation_md: `## Sealed Classes: Exhaustive When

\`\`\`kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

fun handleResult(result: Result<User>) = when(result) {
    is Result.Success -> show(result.data)
    is Result.Error -> showError(result.message)
    Result.Loading -> showSpinner()
}
\`\`\`
### Challenge
Write \`handleResult(result)\` returning display string for success/error/loading.`,
          starter_code: `function handleResult(result){
  if(result.type==="success") return "Data: "+JSON.stringify(result.data);
  if(result.type==="error") return "Error: "+result.message;
  if(result.type==="loading") return "Loading...";
  return "Unknown";
}
console.log(handleResult({type:"success",data:{name:"Alice"}}));
console.log(handleResult({type:"error",message:"Not found"}));
console.log(handleResult({type:"loading"}));`,
          reference_solution: `function handleResult(r){if(r.type==="success")return"Data: "+JSON.stringify(r.data);if(r.type==="error")return"Error: "+r.message;if(r.type==="loading")return"Loading...";return"Unknown";}
console.log(handleResult({type:"success",data:{name:"Alice"}}));
console.log(handleResult({type:"error",message:"Not found"}));
console.log(handleResult({type:"loading"}));`,
          hints: [],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `success`, expected_output: `Data: {"name":"Alice"}` },
            { description: `error`, expected_output: `Error: Not found` },
            { description: `loading`, expected_output: `Loading...` },
          ],
        },
        {
          id: "kotlin-u2-l3",
          unit_id: "kotlin-u2",
          track_id: "kotlin",
          type: "concept",
          title: "Android Architecture",
          explanation_md: `## MVVM with Kotlin

\`\`\`kotlin
class UserViewModel : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users = _users.asStateFlow()
    
    fun loadUsers() {
        viewModelScope.launch {
            _users.value = repository.getUsers()
        }
    }
}

// In Fragment/Activity
viewModel.users.collect { users ->
    adapter.submitList(users)
}
\`\`\`
### Challenge
Write \`createViewModel(initialData)\` with \`getData()\`, \`setData(v)\`, \`subscribe(fn)\`.`,
          starter_code: `function createViewModel(init){let data=init;const subs=[];return{getData(){return data;},setData(v){data=v;subs.forEach(fn=>fn(data));},subscribe(fn){subs.push(fn);}};}
const vm=createViewModel([]);
vm.subscribe(d=>console.log("Updated:",d.length));
vm.setData(["Alice","Bob"]);
vm.setData(["Alice","Bob","Carol"]);`,
          reference_solution: `function createViewModel(init){let data=init;const subs=[];return{getData(){return data;},setData(v){data=v;subs.forEach(fn=>fn(data));},subscribe(fn){subs.push(fn);}};}
const vm=createViewModel([]);
vm.subscribe(d=>console.log("Updated:",d.length));
vm.setData(["Alice","Bob"]);
vm.setData(["Alice","Bob","Carol"]);`,
          hints: [],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `First update: 2 items`, expected_output: `Updated: 2` },
            { description: `Second update: 3 items`, expected_output: `Updated: 3` },
          ],
        },
        {
          id: "kotlin-u2-l4",
          unit_id: "kotlin-u2",
          track_id: "kotlin",
          type: "challenge",
          title: "Kotlin Boss: DSL Builder",
          explanation_md: `## Boss: Build a DSL

Kotlin DSLs use extension functions and lambdas-with-receiver:

\`\`\`kotlin
fun html(init: HTML.() -> Unit): HTML { val html = HTML(); html.init(); return html }
fun body(init: BODY.() -> Unit): BODY { /* */ }

val page = html {
    body {
        h1 { +"Hello" }
        p { +"World" }
    }
}
\`\`\`
### Boss
Build \`createBuilder()\` with \`set(key,val)\`, \`add(item)\`, \`build()\` returning the constructed config object.`,
          starter_code: `function createBuilder(){const config={};const items=[];return{set(k,v){config[k]=v;return this;},add(item){items.push(item);return this;},build(){return{...config,items:[...items]};}};}
const result=createBuilder().set('name','MyApp').set('version','1.0').add('feature-a').add('feature-b').build();
console.log(result.name);
console.log(result.version);
console.log(result.items.join(','));`,
          reference_solution: `function createBuilder(){const c={},i=[];return{set(k,v){c[k]=v;return this;},add(x){i.push(x);return this;},build(){return{...c,items:[...i]};}};}
const r=createBuilder().set('name','MyApp').set('version','1.0').add('feature-a').add('feature-b').build();
console.log(r.name);
console.log(r.version);
console.log(r.items.join(','));`,
          hints: [],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `name`, expected_output: `MyApp` },
            { description: `version`, expected_output: `1.0` },
            { description: `items`, expected_output: `feature-a,feature-b` },
          ],
        },
      ],
    },
  ],
};
