import type { StaticTrack } from "./lesson-content";

export const GIT_TRACK: StaticTrack = {
  id: "git",
  title: "Git",
  description: `Master version control: branching, merging, rebasing, and collaboration workflows.`,
  color: "#f05032",
  difficulty_curve: "beginner",
  execution_engine: "browser",
  category: "general",
  order_index: 99,
  is_published: true,
  estimated_hours: 15,
  learner_count: 5000,
  units: [
    {
      id: "git-u1",
      track_id: "git",
      title: "Git Part 1",
      description: `Core concepts of Git`,
      icon: "📚",
      order_index: 1,
      lessons: [
        {
          id: "git-u1-l1",
          unit_id: "git-u1",
          track_id: "git",
          type: "concept",
          title: "Git Basics",
          explanation_md: `## Git: Version Control

\`\`\`bash
git init              # Create repo
git add .             # Stage all changes
git commit -m "msg"   # Commit staged changes
git status            # Show working tree status
git log --oneline     # Compact history
\`\`\`
### Challenge
Simulate commit history: write \`createRepo()\` with \`commit(msg)\`, \`log()\` methods.`,
          starter_code: `function createRepo() {
  const commits = [];
  let id = 1;
  return {
    commit(msg) { commits.push({ id: id++, msg, time: new Date().toISOString() }); },
    log() { return commits.map(c => \`#\${c.id}: \${c.msg}\`).join("\\n"); },
  };
}
const repo = createRepo();
repo.commit("Initial commit");
repo.commit("Add feature");
repo.commit("Fix bug");
console.log(repo.log());`,
          reference_solution: `function createRepo() {
  const commits=[]; let id=1;
  return { commit(msg){commits.push({id:id++,msg});}, log(){return commits.map(c=>\`#\${c.id}: \${c.msg}\`).join("\\n");} };
}
const repo=createRepo();
repo.commit("Initial commit");
repo.commit("Add feature");
repo.commit("Fix bug");
console.log(repo.log());`,
          hints: ['Push objects to an array', 'Format each as #ID: message'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `First commit`, expected_output: `#1: Initial commit` },
            { description: `Second commit`, expected_output: `#2: Add feature` },
            { description: `Third commit`, expected_output: `#3: Fix bug` },
          ],
        },
        {
          id: "git-u1-l2",
          unit_id: "git-u1",
          track_id: "git",
          type: "concept",
          title: "Branching",
          explanation_md: `## Git Branches

\`\`\`bash
git branch feature-x     # Create branch
git checkout feature-x   # Switch to branch
git checkout -b fix/bug  # Create and switch
git merge feature-x      # Merge into current
git branch -d feature-x  # Delete branch
\`\`\`
### Challenge
Write \`createBranchManager()\` with \`branch(name)\`, \`checkout(name)\`, \`current()\`, \`list()\`.`,
          starter_code: `function createBranchManager() {
  const branches = ["main"];
  let current = "main";
  return {
    branch(name) { if (!branches.includes(name)) branches.push(name); },
    checkout(name) { if (branches.includes(name)) current = name; },
    current() { return current; },
    list() { return branches.sort(); },
  };
}
const bm = createBranchManager();
bm.branch("feature-x");
bm.checkout("feature-x");
console.log(bm.current());
console.log(bm.list().join(", "));`,
          reference_solution: `function createBranchManager() {
  const branches=["main"]; let current="main";
  return { branch(n){if(!branches.includes(n))branches.push(n);}, checkout(n){if(branches.includes(n))current=n;}, current(){return current;}, list(){return branches.sort();} };
}
const bm=createBranchManager();
bm.branch("feature-x"); bm.checkout("feature-x");
console.log(bm.current());
console.log(bm.list().join(", "));`,
          hints: ['Store branches in array', 'Track current branch as a string'],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `current is feature-x`, expected_output: `feature-x` },
            { description: `list sorted`, expected_output: `feature-x, main` },
          ],
        },
        {
          id: "git-u1-l3",
          unit_id: "git-u1",
          track_id: "git",
          type: "concept",
          title: "Merging & Conflicts",
          explanation_md: `## Merge Strategies

\`\`\`bash
git merge feature     # Merge (fast-forward or merge commit)
git merge --no-ff     # Force merge commit
git rebase main       # Rebase onto main
git cherry-pick abc12 # Apply single commit

# Conflict markers:
<<<<<<< HEAD
your change
=======
their change
>>>>>>> feature
\`\`\`
### Challenge
Write \`mergeChanges(base, theirs)\` — merges two objects, with \`theirs\` taking priority.`,
          starter_code: `function mergeChanges(base, theirs) {
  return { ...base, ...theirs };
}
console.log(JSON.stringify(mergeChanges({a:1,b:2,c:3},{b:20,d:4})));`,
          reference_solution: `function mergeChanges(base,theirs){return {...base,...theirs};}
console.log(JSON.stringify(mergeChanges({a:1,b:2,c:3},{b:20,d:4})));`,
          hints: ['Use spread operator — later values override earlier'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Merged object`, expected_output: `{"a":1,"b":20,"c":3,"d":4}` },
          ],
        },
        {
          id: "git-u1-l4",
          unit_id: "git-u1",
          track_id: "git",
          type: "challenge",
          title: "Git Boss: Commit Graph",
          explanation_md: `## Boss: Commit Graph

Build \`createCommitGraph()\` with:
- \`commit(msg, parent?)\` — creates commit, optionally with parent
- \`getHistory(commitId)\` — returns commit chain as array (newest first)
`,
          starter_code: `function createCommitGraph() {
  const commits = {};
  let counter = 1;
  return {
    commit(msg, parentId = null) {
      const id = "c" + (counter++);
      commits[id] = { id, msg, parentId };
      return id;
    },
    getHistory(id) {
      const history = [];
      let current = id;
      while (current) {
        history.push(commits[current].msg);
        current = commits[current].parentId;
      }
      return history;
    },
  };
}
const g = createCommitGraph();
const c1 = g.commit("Initial");
const c2 = g.commit("Feature A", c1);
const c3 = g.commit("Fix bug", c2);
console.log(g.getHistory(c3).join(" -> "));`,
          reference_solution: `function createCommitGraph() {
  const commits={}; let n=1;
  return {
    commit(msg,pid=null){const id="c"+n++;commits[id]={id,msg,parentId:pid};return id;},
    getHistory(id){const h=[];let c=id;while(c){h.push(commits[c].msg);c=commits[c].parentId;}return h;},
  };
}
const g=createCommitGraph();
const c1=g.commit("Initial");
const c2=g.commit("Feature A",c1);
const c3=g.commit("Fix bug",c2);
console.log(g.getHistory(c3).join(" -> "));`,
          hints: ['Store parentId in each commit', 'Walk up the chain using parentId'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `History chain`, expected_output: `Fix bug -> Feature A -> Initial` },
          ],
        },
      ],
    },
    {
      id: "git-u2",
      track_id: "git",
      title: "Git Part 2",
      description: `Core concepts of Git`,
      icon: "📚",
      order_index: 2,
      lessons: [
        {
          id: "git-u2-l1",
          unit_id: "git-u2",
          track_id: "git",
          type: "concept",
          title: "Remote & Collaboration",
          explanation_md: `## Working with Remotes

\`\`\`bash
git remote add origin https://github.com/user/repo.git
git push origin main        # push to remote
git pull origin main        # pull from remote
git fetch origin            # download without merge
git clone https://...       # clone a repo

# Pull Request workflow:
git checkout -b feature/new-button
# ... make changes ...
git push origin feature/new-button
# Open PR on GitHub
\`\`\`
### Challenge
Write \`createRemote(url)\` with \`push(branch, commits)\` and \`pull(branch)\` methods.`,
          starter_code: `function createRemote(url) {
  const storage = {};
  return {
    push(branch, commits) { storage[branch] = [...(storage[branch]||[]), ...commits]; return \`Pushed \${commits.length} commits to \${url}/\${branch}\`; },
    pull(branch) { return storage[branch] || []; },
    url,
  };
}
const remote = createRemote("https://github.com/user/repo");
console.log(remote.push("main", ["c1","c2"]));
console.log(remote.pull("main").join(","));`,
          reference_solution: `function createRemote(url) {
  const s={};
  return { push(b,c){s[b]=[...(s[b]||[]),...c];return \`Pushed \${c.length} commits to \${url}/\${b}\`;}, pull(b){return s[b]||[];}, url };
}
const r=createRemote("https://github.com/user/repo");
console.log(r.push("main",["c1","c2"]));
console.log(r.pull("main").join(","));`,
          hints: ['Store per-branch commits in an object'],
          xp_reward: 70,
          order_index: 1,
          execution_engine: "browser",
          test_cases: [
            { description: `Push message`, expected_output: `Pushed 2 commits to https://github.com/user/repo/main` },
            { description: `Pull commits`, expected_output: `c1,c2` },
          ],
        },
        {
          id: "git-u2-l2",
          unit_id: "git-u2",
          track_id: "git",
          type: "concept",
          title: "Git Rebase & History",
          explanation_md: `## Rebase: Rewriting History

\`\`\`bash
git rebase main           # Replay commits on top of main
git rebase -i HEAD~3      # Interactive rebase (squash, edit)
git commit --amend        # Edit last commit
git reset --hard HEAD~1   # Undo last commit (dangerous!)
git reflog                # See all HEAD movements
\`\`\`
### Challenge
Write \`squashCommits(commits, n)\` — squashes the last n commits into one with the combined messages.`,
          starter_code: `function squashCommits(commits, n) {
  if (n >= commits.length) {
    return [{ msg: commits.map(c=>c.msg).join(" + ") }];
  }
  const keep = commits.slice(0, commits.length - n);
  const squashed = { msg: commits.slice(-n).map(c=>c.msg).join(" + ") };
  return [...keep, squashed];
}
const commits = [{msg:"A"},{msg:"B"},{msg:"C"},{msg:"D"}];
const result = squashCommits(commits, 2);
console.log(result.length);
console.log(result[result.length-1].msg);`,
          reference_solution: `function squashCommits(commits,n) {
  const keep=commits.slice(0,-n); const sq={msg:commits.slice(-n).map(c=>c.msg).join(" + ")};
  return [...keep,sq];
}
const commits=[{msg:"A"},{msg:"B"},{msg:"C"},{msg:"D"}];
const result=squashCommits(commits,2);
console.log(result.length);
console.log(result[result.length-1].msg);`,
          hints: ['slice(-n) gets last n items', 'Join their messages with ' + ''],
          xp_reward: 70,
          order_index: 2,
          execution_engine: "browser",
          test_cases: [
            { description: `3 commits after squash`, expected_output: `3` },
            { description: `Squashed message`, expected_output: `C + D` },
          ],
        },
        {
          id: "git-u2-l3",
          unit_id: "git-u2",
          track_id: "git",
          type: "concept",
          title: "Git Hooks",
          explanation_md: `## Git Hooks: Automation

Git hooks are scripts that run at certain points:

\`\`\`bash
# .git/hooks/pre-commit
#!/bin/bash
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed! Commit aborted."
    exit 1
fi

# Common hooks:
# pre-commit  — before commit (lint, test)
# commit-msg  — validate commit message
# pre-push    — before push to remote
# post-merge  — after merge
\`\`\`
### Challenge
Write \`createHookSystem()\` with \`on(event, fn)\` and \`trigger(event, data)\`. Return false if any hook returns false.`,
          starter_code: `function createHookSystem() {
  const hooks = {};
  return {
    on(event, fn) { if (!hooks[event]) hooks[event] = []; hooks[event].push(fn); },
    trigger(event, data) {
      for (const fn of (hooks[event] || [])) {
        if (fn(data) === false) return false;
      }
      return true;
    },
  };
}
const hs = createHookSystem();
hs.on("pre-commit", msg => { console.log("Checking: " + msg); return true; });
hs.on("pre-commit", msg => msg.length > 5);
console.log(hs.trigger("pre-commit", "fix bug"));
console.log(hs.trigger("pre-commit", "wip"));`,
          reference_solution: `function createHookSystem() {
  const hooks={};
  return { on(e,fn){if(!hooks[e])hooks[e]=[];hooks[e].push(fn);}, trigger(e,d){for(const fn of(hooks[e]||[])){if(fn(d)===false)return false;}return true;} };
}
const hs=createHookSystem();
hs.on("pre-commit",msg=>{console.log("Checking: "+msg);return true;});
hs.on("pre-commit",msg=>msg.length>5);
console.log(hs.trigger("pre-commit","fix bug"));
console.log(hs.trigger("pre-commit","wip"));`,
          hints: ['Stop if any hook returns false', 'Return true if all hooks pass'],
          xp_reward: 70,
          order_index: 3,
          execution_engine: "browser",
          test_cases: [
            { description: `Checking message logged`, expected_output: `Checking: fix bug` },
            { description: `Long message passes`, expected_output: `true` },
            { description: `Short message fails`, expected_output: `false` },
          ],
        },
        {
          id: "git-u2-l4",
          unit_id: "git-u2",
          track_id: "git",
          type: "challenge",
          title: "Git Boss: Diff Engine",
          explanation_md: `## Boss: Build a Diff Engine

Implement \`diffLines(oldLines, newLines)\` that produces a unified diff:
- Lines only in old: prefix with \`- \`
- Lines only in new: prefix with \`+ \`
- Lines in both: prefix with \`  \` (space)
`,
          starter_code: `function diffLines(oldLines, newLines) {
  const result = [];
  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);
  
  for (const line of oldLines) {
    if (!newSet.has(line)) result.push("- " + line);
    else result.push("  " + line);
  }
  for (const line of newLines) {
    if (!oldSet.has(line)) result.push("+ " + line);
  }
  return result.join("\\n");
}

const old = ["apple", "banana", "cherry"];
const updated = ["apple", "cherry", "date"];
console.log(diffLines(old, updated));`,
          reference_solution: `function diffLines(old,newL) {
  const oSet=new Set(old),nSet=new Set(newL),res=[];
  for(const l of old) res.push((nSet.has(l)?"  ":"- ")+l);
  for(const l of newL) if(!oSet.has(l)) res.push("+ "+l);
  return res.join("\\n");
}
const old=["apple","banana","cherry"];
const updated=["apple","cherry","date"];
console.log(diffLines(old,updated));`,
          hints: ['Use Sets to check membership', 'Loop old lines first, then new-only lines'],
          xp_reward: 100,
          order_index: 4,
          execution_engine: "browser",
          test_cases: [
            { description: `Unchanged line`, expected_output: `  apple` },
            { description: `Removed line`, expected_output: `- banana` },
            { description: `Added line`, expected_output: `+ date` },
          ],
        },
      ],
    },
  ],
};
