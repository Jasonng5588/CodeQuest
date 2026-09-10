// Test multiple connection options to Supabase
const { Client } = require('pg');

const configs = [
  {
    name: 'Direct connection (port 5432)',
    host: 'db.fzjdywdjbcxcjmjzhlty.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '040520081059Abc',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  },
  {
    name: 'Pooler connection (port 6543)',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.fzjdywdjbcxcjmjzhlty',
    password: '040520081059Abc',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  },
  {
    name: 'Pooler connection (port 5432)',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.fzjdywdjbcxcjmjzhlty',
    password: '040520081059Abc',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  },
];

async function testConfig(config) {
  const { name, ...pgConfig } = config;
  const client = new Client(pgConfig);
  try {
    console.log(`\nTesting: ${name}...`);
    await client.connect();
    const { rows } = await client.query('SELECT current_database(), version();');
    console.log(`✅ SUCCESS - DB: ${rows[0].current_database}`);
    await client.end();
    return pgConfig;
  } catch (err) {
    console.log(`❌ FAILED: ${err.message}`);
    try { await client.end(); } catch {}
    return null;
  }
}

async function main() {
  for (const config of configs) {
    const result = await testConfig(config);
    if (result) {
      console.log('\n🎉 Found working connection!');
      return result;
    }
  }
  console.log('\n💀 All connection attempts failed.');
}

main().catch(console.error);
