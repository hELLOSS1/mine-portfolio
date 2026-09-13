import sqlite3Pkg from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const sqlite3 = sqlite3Pkg.verbose();
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../portfolio.sqlite');
const sqliteDb = new sqlite3.Database(dbPath);

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('vercel-storage') 
       ? { rejectUnauthorized: false } 
       : false,
});

const runMigration = async () => {
  console.log("Starting migration from SQLite to PostgreSQL...");
  
  if (!process.env.DATABASE_URL) {
    console.error("ERROR: DATABASE_URL environment variable is missing.");
    process.exit(1);
  }

  sqliteDb.get(`SELECT data FROM portfolio_data WHERE id = 1`, async (err, row) => {
    if (err) {
      console.error("Error reading SQLite database:", err);
      process.exit(1);
    }
    
    if (!row) {
      console.log("SQLite database is empty. Nothing to migrate.");
      process.exit(0);
    }
    
    try {
      console.log("SQLite data found. Ensuring PostgreSQL table exists...");
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS portfolio_data (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          data TEXT NOT NULL
        )
      `);
      
      console.log("Migrating data to PostgreSQL...");
      
      // Check if data already exists in Postgres
      const pgCheck = await pgPool.query('SELECT * FROM portfolio_data WHERE id = 1');
      if (pgCheck.rows.length > 0) {
        console.log("PostgreSQL already has data. Updating with SQLite data...");
        await pgPool.query('UPDATE portfolio_data SET data = $1 WHERE id = 1', [row.data]);
      } else {
        console.log("PostgreSQL is empty. Inserting SQLite data...");
        await pgPool.query('INSERT INTO portfolio_data (id, data) VALUES (1, $1)', [row.data]);
      }
      
      console.log("Migration successful!");
      process.exit(0);
    } catch (pgError) {
      console.error("Error during PostgreSQL migration:", pgError);
      process.exit(1);
    }
  });
};

runMigration();
