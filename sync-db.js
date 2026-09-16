import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function sync() {
  try {
    const dataPath = path.resolve('src/data/portfolio.json');
    const localData = fs.readFileSync(dataPath, 'utf8');
    
    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        data TEXT NOT NULL
      )
    `);
    
    // Upsert local data into Postgres
    await pool.query(`
      INSERT INTO portfolio_data (id, data) 
      VALUES (1, $1) 
      ON CONFLICT (id) 
      DO UPDATE SET data = $1
    `, [localData]);
    
    console.log("Successfully synchronized local portfolio.json to Supabase PostgreSQL!");
  } catch (e) {
    console.error("Error syncing:", e);
  } finally {
    await pool.end();
  }
}

sync();
