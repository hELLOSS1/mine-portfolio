import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const dbPath = process.env.DATABASE_PATH || './data/database.sqlite';

let connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (connectionString && connectionString.includes('sslmode=')) {
  connectionString = connectionString.replace(/[?&]sslmode=[^&]+/g, '');
}

if (!connectionString) {
  console.error("Error: DATABASE_URL is not set in your environment.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  console.log("Starting migration from SQLite to PostgreSQL...");
  
  if (!fs.existsSync(dbPath)) {
    console.error(`SQLite database not found at ${dbPath}`);
    process.exit(1);
  }

  try {
    const sqliteDb = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log("Reading data from SQLite...");
    const row = await sqliteDb.get('SELECT data FROM portfolio_data WHERE id = 1');
    
    if (!row) {
      console.log("No data found in SQLite to migrate.");
      process.exit(0);
    }

    const data = row.data;

    console.log("Connecting to PostgreSQL and preparing table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        data TEXT NOT NULL
      )
    `);

    console.log("Checking if PostgreSQL already has data...");
    const pgResult = await pool.query('SELECT data FROM portfolio_data WHERE id = 1');

    if (pgResult.rows.length === 0) {
      console.log("Inserting migrated data into PostgreSQL...");
      await pool.query('INSERT INTO portfolio_data (id, data) VALUES (1, $1)', [data]);
    } else {
      console.log("Updating existing PostgreSQL record with migrated data...");
      await pool.query('UPDATE portfolio_data SET data = $1 WHERE id = 1', [data]);
    }

    console.log("Migration completed successfully!");
    
    await sqliteDb.close();
    await pool.end();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
