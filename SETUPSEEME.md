# 🚀 CodeQuest — Local Setup Guide

> Read this **top to bottom** before asking questions. Everything you need is here.

---

## 📋 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Clone the Repo](#2-clone-the-repo)
3. [Install Dependencies](#3-install-dependencies)
4. [Set Up Supabase](#4-set-up-supabase)
5. [Configure Environment Variables](#5-configure-environment-variables)
6. [Run Database Migrations](#6-run-database-migrations)
7. [Start the Dev Server](#7-start-the-dev-server)
8. [Project Structure](#8-project-structure)
9. [Tech Stack](#9-tech-stack)
10. [Admin Panel](#10-admin-panel)
11. [Common Errors & Fixes](#11-common-errors--fixes)

---

## 1. Prerequisites

Make sure the following are installed on your machine **before** you begin:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18+ (v20 recommended) | https://nodejs.org |
| **npm** | v9+ (comes with Node) | — |
| **Git** | Latest | https://git-scm.com |

Verify your versions:

```bash
node -v     # should print v18.x.x or higher
npm -v      # should print 9.x.x or higher
git --version
```

---

## 2. Clone the Repo

```bash
git clone https://github.com/Jasonng5588/CodeQuest.git
cd CodeQuest
```

---

## 3. Install Dependencies

```bash
npm install
```

> This installs everything in `package.json` including Next.js 16, Supabase client, Framer Motion, Monaco Editor, Zustand, etc. It may take 1–2 minutes.

---

## 4. Set Up Supabase

CodeQuest uses **Supabase** as the backend (database + auth). You have **two options**:

### Option A — Use the Shared Project (Recommended for Dev)

The `.env.local` file in this repo already contains working credentials for the shared development Supabase project. **Skip to Step 5.**

### Option B — Create Your Own Supabase Project

Use this if you want an isolated database or the shared credentials have been rotated.

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"**, give it a name (e.g. `codequest-dev`), set a strong DB password, choose a region close to you
3. Wait ~2 minutes for provisioning
4. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (click reveal)
5. Paste these into your `.env.local` (see Step 5)
6. Run the migrations (see Step 6)

---

## 5. Configure Environment Variables

Create a file called **`.env.local`** in the project root:

```bash
# Create from scratch if it doesn't exist
touch .env.local   # Mac/Linux
# OR on Windows PowerShell:
New-Item .env.local
```

Paste in the following (replace values if using your own Supabase project):

```env
# ──────────────────────────────────────────────
# Supabase
# ──────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# ──────────────────────────────────────────────
# App
# ──────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ──────────────────────────────────────────────
# Judge0 (Phase 5 — leave commented out for now)
# ──────────────────────────────────────────────
# JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
# JUDGE0_API_KEY=your_key_here
```

> ⚠️ **Never commit `.env.local` to a public repo** — it contains secret keys.

---

## 6. Run Database Migrations

> **Skip this step** if you are using the shared Supabase project — it is already migrated.

If you created your **own** Supabase project (Option B above):

1. Open your Supabase project dashboard
2. Go to **SQL Editor → New Query**
3. Open and run these files **in order**:

### Migration 1 — Initial Schema

Copy the full contents of `supabase/migrations/001_initial_schema.sql` and run it in the SQL Editor.

This creates all tables:
- `user_profiles` — extended user data, XP, streaks, level
- `tracks` — learning tracks (JavaScript, Python, etc.)
- `units` — chapters within a track
- `lessons` — individual challenges/concepts
- `user_progress` — per-user lesson completion
- `xp_events` — XP history log
- `daily_activity` — streak tracking
- `achievements` / `user_achievements` — badge system

It also sets up:
- Row Level Security (RLS) policies
- Auth trigger (`handle_new_user`) to auto-create a profile on signup
- Default achievements seed data

### Migration 2 — Auth Trigger Fix

Copy the full contents of `supabase/migrations/002_fix_auth_trigger.sql` and run it.

This replaces the auth trigger with a bulletproof version that **never blocks signups**, even if profile creation fails.

---

## 7. Start the Dev Server

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:3000
```

You should see the CodeQuest landing page. 🎉

---

## 8. Project Structure

```
CodeQuest/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Login & Register pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/            # Main app (protected routes)
│   │   │   ├── page.tsx            # Home / dashboard
│   │   │   ├── tracks/             # Track listing & lesson player
│   │   │   ├── leaderboard/        # XP leaderboard
│   │   │   ├── profile/            # User profile
│   │   │   └── certificate/        # Certificate view
│   │   ├── loyalty/en/             # Admin panel (internal)
│   │   │   ├── dashboard/          # Admin stats overview
│   │   │   ├── users/              # User management
│   │   │   ├── content/            # Track/lesson management
│   │   │   ├── achievements/       # Achievement management
│   │   │   ├── certificates/       # Certificate management
│   │   │   ├── ranks/              # Rank/level management
│   │   │   └── analytics/          # Analytics
│   │   └── api/                    # API route handlers
│   │       ├── auth/               # Auth callbacks
│   │       ├── admin/              # Admin CRUD endpoints
│   │       ├── seed/               # Data seeding endpoint
│   │       └── migrate/            # Migration helper
│   ├── components/
│   │   ├── dashboard/              # Dashboard UI components
│   │   ├── lesson/                 # Monaco code editor & lesson UI
│   │   ├── tracks/                 # Track cards & path map
│   │   ├── certificate/            # Certificate component
│   │   ├── admin/                  # Admin panel UI components
│   │   └── layout/                 # Navbar, layout wrappers
│   ├── lib/
│   │   ├── supabase/               # Supabase client (browser, server, admin)
│   │   ├── data/                   # Static track/lesson seed data (TypeScript)
│   │   └── utils.ts                # Utility helpers
│   ├── store/
│   │   └── gameStore.ts            # Zustand global state
│   ├── hooks/
│   │   └── useUser.ts              # Auth user hook
│   └── types/
│       └── index.ts                # All TypeScript types
├── supabase/
│   └── migrations/                 # SQL migration files (run these in Supabase SQL Editor)
├── scripts/                        # Helper migration scripts
├── public/                         # Static assets
├── .env.local                      # Secret keys — do NOT share publicly
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 9. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Auth & Database** | Supabase (PostgreSQL + Auth) |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query (React Query v5) |
| **Code Editor** | Monaco Editor |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |

---

## 10. Admin Panel

The admin panel lives at:

```
http://localhost:3000/loyalty/en/dashboard
```

It is **not protected by a login page** in the current dev setup — just navigate to it directly.

Available admin sections:

| URL | Purpose |
|-----|---------|
| `/loyalty/en/dashboard` | Overview stats |
| `/loyalty/en/users` | Browse & manage users |
| `/loyalty/en/content` | Manage tracks, units, lessons |
| `/loyalty/en/achievements` | Manage achievement badges |
| `/loyalty/en/certificates` | View issued certificates |
| `/loyalty/en/ranks` | Configure XP rank thresholds |
| `/loyalty/en/analytics` | Usage analytics |

---

## 11. Common Errors & Fixes

### ❌ `Error: supabase URL is not configured`

Your `.env.local` is missing or the variable names are wrong. Double-check Step 5.

---

### ❌ `relation "user_profiles" does not exist`

You haven't run the database migrations yet. Follow Step 6.

---

### ❌ `Invalid API key`

The `SUPABASE_SERVICE_ROLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is incorrect or has been rotated. Get fresh keys from your Supabase project dashboard under **Settings → API**.

---

### ❌ Signup succeeds but no profile is created

Run Migration 2 (`002_fix_auth_trigger.sql`) in the Supabase SQL Editor. This replaces the auth trigger with a more robust version.

---

### ❌ `Module not found` / missing packages

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Port 3000 already in use

```bash
# Kill whatever is using port 3000
npx kill-port 3000
# Then restart
npm run dev
```

---

## 💬 Questions?

Contact **Jason** or check the commit history for context on recent changes.
