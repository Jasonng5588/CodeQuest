import type { StaticTrack } from "./lesson-content";

export const ANGULAR_TRACK: StaticTrack = {
  id: "angular",
  title: "Angular",
  description: `Enterprise Angular: components, services, RxJS, and reactive forms.`,
  color: "#dd0031",
  difficulty_curve: "advanced",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "angular-u1",
      track_id: "angular",
      title: "Angular Unit 1",
      description: `Angular concepts`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "angular-u1-l1",
          unit_id: "angular-u1",
          track_id: "angular",
          type: "concept",
          title: "Components & Templates",
          explanation_md: `## Angular Components

\`\`\`typescript
@Component({
  selector: 'app-hero',
  template: \`<h1>{{hero.name}}</h1>\`
})
export class HeroComponent {
  hero = { name: 'Superman', power: 'Flight' };
}
\`\`\`
### Challenge
Write \`createComponent(selector, data)\` returning \`{selector, render()}\` where render returns \`data.name\`.`,
          starter_code: `function createComponent(selector,data){return{selector,render(){return data.name;}}}
console.log(createComponent('app-hero',{name:'Superman'}).render());`,
          reference_solution: `function createComponent(s,d){return{selector:s,render(){return d.name;}};}
console.log(createComponent('app-hero',{name:'Superman'}).render());`,
          hints: ['Return an object with selector and render'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `renders name`, expected_output: `Superman` },
          ],
        },
        {
          id: "angular-u1-l2",
          unit_id: "angular-u1",
          track_id: "angular",
          type: "concept",
          title: "Services & DI",
          explanation_md: `## Angular Services

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private items: string[] = [];
  add(item: string) { this.items.push(item); }
  getAll() { return [...this.items]; }
}
\`\`\`
### Challenge
Write \`createService()\` with \`add(item)\` and \`getAll()\` (returns copy).`,
          starter_code: `function createService(){const items=[];return{add(x){items.push(x);},getAll(){return[...items];}};}
const svc=createService();svc.add('A');svc.add('B');
console.log(svc.getAll().join(','));`,
          reference_solution: `function createService(){const i=[];return{add(x){i.push(x);},getAll(){return[...i];}};}
const svc=createService();svc.add('A');svc.add('B');
console.log(svc.getAll().join(','));`,
          hints: ['Return copy with spread to prevent mutation'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `getAll returns A,B`, expected_output: `A,B` },
          ],
        },
        {
          id: "angular-u1-l3",
          unit_id: "angular-u1",
          track_id: "angular",
          type: "concept",
          title: "RxJS Observables",
          explanation_md: `## RxJS: Reactive Programming

\`\`\`typescript
import { Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const numbers$ = from([1,2,3,4,5]);
numbers$
  .pipe(
    filter(n => n % 2 === 0),
    map(n => n * 10)
  )
  .subscribe(n => console.log(n)); // 20, 40
\`\`\`
### Challenge
Write \`rxFilter(items, predicate)\` + \`rxMap(items, fn)\` + chain them.`,
          starter_code: `const rxFilter=(items,pred)=>items.filter(pred);
const rxMap=(items,fn)=>items.map(fn);
const result=rxMap(rxFilter([1,2,3,4,5],n=>n%2===0),n=>n*10);
console.log(result.join(','));`,
          reference_solution: `const rxFilter=(items,pred)=>items.filter(pred);
const rxMap=(items,fn)=>items.map(fn);
const result=rxMap(rxFilter([1,2,3,4,5],n=>n%2===0),n=>n*10);
console.log(result.join(','));`,
          hints: ['filter then map'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `20,40`, expected_output: `20,40` },
          ],
        },
        {
          id: "angular-u1-l4",
          unit_id: "angular-u1",
          track_id: "angular",
          type: "challenge",
          title: "Angular Boss: Reactive Form Validator",
          explanation_md: `## Boss: Form Validation

\`\`\`typescript
const form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  age: new FormControl(0, [Validators.min(0), Validators.max(120)]),
});
\`\`\`
### Boss
Write \`validateForm(fields, rules)\` — each rule is \`{field, validator, message}\`. Returns array of error messages.`,
          starter_code: `function validateForm(fields,rules){
  return rules.reduce((errs,r)=>{
    if(!r.validator(fields[r.field])) errs.push(r.field+": "+r.message);
    return errs;
  },[]);
}
const errors=validateForm(
  {email:'bad',age:200},
  [{field:'email',validator:v=>v.includes('@'),message:'invalid email'},{field:'age',validator:v=>v<=120,message:'max 120'}]
);
errors.forEach(e=>console.log(e));`,
          reference_solution: `function validateForm(f,rules){return rules.filter(r=>!r.validator(f[r.field])).map(r=>r.field+": "+r.message);}
const errors=validateForm({email:'bad',age:200},[{field:'email',validator:v=>v.includes('@'),message:'invalid email'},{field:'age',validator:v=>v<=120,message:'max 120'}]);
errors.forEach(e=>console.log(e));`,
          hints: ['Filter rules where validator fails'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `email error`, expected_output: `email: invalid email` },
            { description: `age error`, expected_output: `age: max 120` },
          ],
        },
      ],
    },
    {
      id: "angular-u2",
      track_id: "angular",
      title: "Angular Unit 2",
      description: `Angular concepts`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "angular-u2-l1",
          unit_id: "angular-u2",
          track_id: "angular",
          type: "concept",
          title: "HTTP Client",
          explanation_md: `## Angular HttpClient

\`\`\`typescript
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      catchError(err => of([]))
    );
  }
}
\`\`\`
### Challenge
Write \`createApiClient(baseUrl)\` with \`get(path)\` returning \`baseUrl+path\`.`,
          starter_code: `function createApiClient(base){return{get(path){return base+path;},post(path,body){return{url:base+path,body};}}}
const api=createApiClient('https://api.example.com');
console.log(api.get('/users'));
console.log(api.get('/products'));`,
          reference_solution: `function createApiClient(base){return{get(p){return base+p;},post(p,b){return{url:base+p,body:b};}};}
const api=createApiClient('https://api.example.com');
console.log(api.get('/users'));
console.log(api.get('/products'));`,
          hints: ['Concatenate base + path'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `/users`, expected_output: `https://api.example.com/users` },
            { description: `/products`, expected_output: `https://api.example.com/products` },
          ],
        },
        {
          id: "angular-u2-l2",
          unit_id: "angular-u2",
          track_id: "angular",
          type: "concept",
          title: "Routing",
          explanation_md: `## Angular Router

\`\`\`typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '**', component: NotFoundComponent },
];
\`\`\`
### Challenge
Write \`matchRoute(routes, url)\` returning the matching component name or '404'.`,
          starter_code: `function matchRoute(routes,url){
  for(const r of routes){
    if(r.path==='**') return r.component;
    if(r.path===url) return r.component;
    if(r.path.includes(':')){
      const pat=new RegExp('^'+r.path.replace(/:[^/]+/g,'[^/]+')+'$');
      if(pat.test(url)) return r.component;
    }
  }
  return '404';
}
const routes=[{path:'',component:'Home'},{path:'users',component:'Users'},{path:'user/:id',component:'UserDetail'},{path:'**',component:'NotFound'}];
console.log(matchRoute(routes,''));
console.log(matchRoute(routes,'user/42'));
console.log(matchRoute(routes,'unknown'));`,
          reference_solution: `function matchRoute(routes,url){for(const r of routes){if(r.path==='**')return r.component;if(r.path===url)return r.component;if(r.path.includes(':')){const p=new RegExp('^'+r.path.replace(/:[^/]+/g,'[^/]+')+' $');if(p.test(url))return r.component;}}return'404';}
const routes=[{path:'',component:'Home'},{path:'users',component:'Users'},{path:'user/:id',component:'UserDetail'},{path:'**',component:'NotFound'}];
console.log(matchRoute(routes,''));
console.log(matchRoute(routes,'user/42'));
console.log(matchRoute(routes,'unknown'));`,
          hints: ['Check path params with regex'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `root -> Home`, expected_output: `Home` },
            { description: `user/42 -> UserDetail`, expected_output: `UserDetail` },
            { description: `wildcard -> NotFound`, expected_output: `NotFound` },
          ],
        },
        {
          id: "angular-u2-l3",
          unit_id: "angular-u2",
          track_id: "angular",
          type: "concept",
          title: "Pipes & Filters",
          explanation_md: `## Angular Pipes

\`\`\`html
{{ name | uppercase }}
{{ price | currency:'USD' }}
{{ date | date:'short' }}
{{ items | slice:0:5 }}
\`\`\`

\`\`\`typescript
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.slice(0,limit)+'...' : value;
  }
}
\`\`\`
### Challenge
Write \`truncate(str, limit, suffix='...')\` that truncates at limit chars.`,
          starter_code: `function truncate(str,limit,suffix='...'){
  return str.length>limit ? str.slice(0,limit)+suffix : str;
}
console.log(truncate('Hello, World!',5));
console.log(truncate('Short',20));`,
          reference_solution: `function truncate(str,limit,suffix='...'){return str.length>limit?str.slice(0,limit)+suffix:str;}
console.log(truncate('Hello, World!',5));
console.log(truncate('Short',20));`,
          hints: ['Check length then slice if needed'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Truncated`, expected_output: `Hello...` },
            { description: `Not truncated`, expected_output: `Short` },
          ],
        },
        {
          id: "angular-u2-l4",
          unit_id: "angular-u2",
          track_id: "angular",
          type: "challenge",
          title: "Angular Boss: State Management",
          explanation_md: `## Boss: NgRx-style Store

\`\`\`typescript
interface Action { type: string; payload?: any; }
type Reducer<S> = (state: S, action: Action) => S;
\`\`\`

Build \`createStore(reducer, initialState)\` with \`dispatch(action)\`, \`getState()\`, \`select(fn)\`, \`subscribe(fn)\`.`,
          starter_code: `function createStore(reducer,initial){let state=initial;const listeners=[];return{dispatch(action){state=reducer(state,action);listeners.forEach(l=>l(state));},getState(){return state;},select(fn){return fn(state);},subscribe(fn){listeners.push(fn);}};}
const counterReducer=(state={count:0},action)=>action.type==='INC'?{count:state.count+1}:state;
const store=createStore(counterReducer,{count:0});
store.subscribe(s=>console.log(s.count));
store.dispatch({type:'INC'});
store.dispatch({type:'INC'});
console.log(store.select(s=>s.count));`,
          reference_solution: `function createStore(reducer,initial){let state=initial;const ls=[];return{dispatch(a){state=reducer(state,a);ls.forEach(l=>l(state));},getState(){return state;},select(fn){return fn(state);},subscribe(fn){ls.push(fn);}};}
const counterReducer=(s={count:0},a)=>a.type==='INC'?{count:s.count+1}:s;
const store=createStore(counterReducer,{count:0});
store.subscribe(s=>console.log(s.count));
store.dispatch({type:'INC'});
store.dispatch({type:'INC'});
console.log(store.select(s=>s.count));`,
          hints: ['Call all listeners after state update'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `First dispatch -> 1`, expected_output: `1` },
            { description: `Second dispatch -> 2`, expected_output: `2` },
            { description: `select returns 2`, expected_output: `2` },
          ],
        },
      ],
    },
  ],
};
