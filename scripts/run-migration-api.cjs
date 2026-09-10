// Migration runner via Supabase REST API (pg-meta endpoint)
const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_REF = 'fzjdywdjbcxcjmjzhlty';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6amR5d2RqYmN4Y2ptanpobHR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ4NDU3MSwiZXhwIjoyMTAxMDYwNTcxfQ.wFMa9OWPaPbVvSVWuf2gU39X3rI9fsylJ_Tm7mVE_no';

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function runSQL(sql, description) {
  const body = JSON.stringify({ query: sql });
  const options = {
    hostname: `${PROJECT_REF}.supabase.co`,
    path: '/rest/v1/rpc/exec_sql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
      'Content-Length': Buffer.byteLength(body),
    }
  };
  
  const result = await httpsRequest(options, body);
  return result;
}

// Use Supabase Management API for running SQL
async function runSQLViaManagement(sql) {
  const body = JSON.stringify({ query: sql });
  const options = {
    hostname: 'api.supabase.com',
    path: `/v1/projects/${PROJECT_REF}/database/query`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Length': Buffer.byteLength(body),
    }
  };
  const result = await httpsRequest(options, body);
  return result;
}

async function main() {
  const sqlFile = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql');
  const fullSQL = fs.readFileSync(sqlFile, 'utf-8');
  
  // Split into individual statements (split on semicolons, skipping empty)
  // We'll send them in batches
  console.log('Testing Supabase Management API connection...');
  
  // Try a simple query first
  const testResult = await runSQLViaManagement('SELECT current_database();');
  console.log('Test response status:', testResult.statusCode);
  console.log('Test response body:', testResult.body.substring(0, 500));
}

main().catch(console.error);
