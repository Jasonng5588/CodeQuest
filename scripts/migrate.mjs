// Run migration SQL through Supabase's REST API using exec_sql RPC
// or via the supabase-js client's rpc call

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://fzjdywdjbcxcjmjzhlty.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6amR5d2RqYmN4Y2ptanpobHR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ4NDU3MSwiZXhwIjoyMTAxMDYwNTcxfQ.wFMa9OWPaPbVvSVWuf2gU39X3rI9fsylJ_Tm7mVE_no';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

// Split SQL into individual statements
function splitSQL(sql) {
  // Remove single-line comments
  const noComments = sql
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');
  
  // Split on semicolons, keeping track of $$ dollar-quoted blocks
  const statements = [];
  let current = '';
  let inDollarQuote = false;
  let dollarTag = '';
  
  const lines = noComments.split('\n');
  for (const line of lines) {
    // Check for dollar-quote start/end
    const dollarMatch = line.match(/\$\$|\$[a-zA-Z_]+\$/g);
    if (dollarMatch) {
      for (const match of dollarMatch) {
        if (!inDollarQuote) {
          inDollarQuote = true;
          dollarTag = match;
        } else if (match === dollarTag) {
          inDollarQuote = false;
          dollarTag = '';
        }
      }
    }
    
    current += line + '\n';
    
    if (!inDollarQuote && line.trim().endsWith(';')) {
      const stmt = current.trim();
      if (stmt && stmt !== ';') {
        statements.push(stmt);
      }
      current = '';
    }
  }
  
  if (current.trim()) {
    statements.push(current.trim());
  }
  
  return statements.filter(s => s.length > 1);
}

async function runSQL(sql) {
  // Use Supabase's built-in SQL execution via service role
  // The service role can bypass RLS, and we can use fetch directly
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({ sql_string: sql }),
  });
  return { status: response.status, body: await response.text() };
}

async function main() {
  const sqlFile = join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql');
  const fullSQL = readFileSync(sqlFile, 'utf-8');
  
  const statements = splitSQL(fullSQL);
  console.log(`Found ${statements.length} SQL statements to execute`);
  
  let success = 0;
  let errors = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const preview = stmt.replace(/\s+/g, ' ').substring(0, 80);
    
    try {
      // Try using supabase-js rpc (needs exec_sql function to exist)
      // Instead, use the Postgres REST API directly
      // For CREATE TABLE etc., we need to POST to /rest/v1/ but that won't work for DDL
      // The right approach: use Supabase's pg connection string
      
      // Let's try the /sql endpoint that some Supabase versions expose
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'apikey': SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ query: stmt }),
      });
      
      const body = await response.text();
      if (response.status === 200 || response.status === 204) {
        console.log(`✅ [${i+1}/${statements.length}] ${preview}...`);
        success++;
      } else {
        console.log(`⚠️  [${i+1}/${statements.length}] HTTP ${response.status}: ${body.substring(0, 100)}`);
        console.log(`   SQL: ${preview}`);
        errors++;
      }
    } catch (err) {
      console.error(`❌ [${i+1}] Error: ${err.message}`);
      errors++;
    }
  }
  
  console.log(`\nDone: ${success} succeeded, ${errors} errored/skipped`);
}

main().catch(console.error);
