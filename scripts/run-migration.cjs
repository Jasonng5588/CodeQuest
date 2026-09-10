// Migration runner - executes 001_initial_schema.sql against Supabase PostgreSQL
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: 'db.fzjdywdjbcxcjmjzhlty.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '040520081059Abc',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
});

async function runMigration() {
  try {
    console.log('Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('Connected!');

    const sqlFile = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql');
    const sql = fs.readFileSync(sqlFile, 'utf-8');

    console.log('Running migration (001_initial_schema.sql)...');
    await client.query(sql);
    console.log('✅ Migration completed successfully!');

    // Verify tables were created
    const { rows } = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename;
    `);
    console.log('\nTables in public schema:');
    rows.forEach(r => console.log(' -', r.tablename));

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
