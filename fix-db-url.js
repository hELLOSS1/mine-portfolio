import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  try {
    const result = await pool.query('SELECT data FROM portfolio_data WHERE id=1');
    let d = JSON.parse(result.rows[0].data);
    if (d.hero.avatarImg && d.hero.avatarImg.includes('localhost:3001')) {
      d.hero.avatarImg = d.hero.avatarImg.replace('http://localhost:3001', '');
      await pool.query('UPDATE portfolio_data SET data = $1 WHERE id=1', [JSON.stringify(d)]);
      console.log('Fixed DB avatar URL to:', d.hero.avatarImg);
    } else {
      console.log('No fix needed, current avatar URL:', d.hero.avatarImg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
run();
