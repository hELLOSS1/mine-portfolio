import express from 'express';
import cors from 'cors';
import multer from 'multer';
import db, { initDb } from './db.js';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Setup file upload handling in memory
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;
const supabaseBucket = process.env.SUPABASE_STORAGE_BUCKET || 'portfolio-images';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

// Helper to get data from PostgreSQL
const getPortfolioData = async () => {
  if (!(process.env.POSTGRES_URL || process.env.DATABASE_URL)) return {};
  try {
    await initDb();
    const res = await db.query('SELECT data FROM portfolio_data WHERE id = 1');
    if (res.rows.length > 0) return JSON.parse(res.rows[0].data);
    return {};
  } catch (err) {
    console.error("Error reading from PostgreSQL:", err);
    throw err;
  }
};

// Helper to save data to PostgreSQL
const savePortfolioData = async (data) => {
  if (!(process.env.POSTGRES_URL || process.env.DATABASE_URL)) return 0;
  try {
    await initDb();
    const res = await db.query('UPDATE portfolio_data SET data = $1 WHERE id = 1', [JSON.stringify(data)]);
    return res.rowCount;
  } catch (err) {
    console.error("Error writing to PostgreSQL:", err);
    throw err;
  }
};

// Root endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Portfolio API is running successfully on PostgreSQL!');
});

// Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// GET all data (Public)
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST to an array section (Add) - PROTECTED
app.post('/api/portfolio/:section', authMiddleware, async (req, res) => {
  try {
    const { section } = req.params;
    const newItem = req.body;
    const data = await getPortfolioData();
    
    if (!data[section] || !Array.isArray(data[section])) {
      return res.status(400).json({ error: `Section ${section} does not exist or is not an array` });
    }
    
    newItem.id = Date.now();
    data[section].push(newItem);
    
    await savePortfolioData(data);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT to update an item in an array section (Edit) - PROTECTED
app.put('/api/portfolio/:section/:id', authMiddleware, async (req, res) => {
  try {
    const { section, id } = req.params;
    const updatedItem = req.body;
    const data = await getPortfolioData();
    
    if (!data[section] || !Array.isArray(data[section])) {
      return res.status(400).json({ error: `Section ${section} does not exist or is not an array` });
    }
    
    const index = data[section].findIndex(item => item.id == id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    data[section][index] = { ...data[section][index], ...updatedItem };
    
    await savePortfolioData(data);
    res.json(data[section][index]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE an item from an array section (Delete) - PROTECTED
app.delete('/api/portfolio/:section/:id', authMiddleware, async (req, res) => {
  try {
    const { section, id } = req.params;
    const data = await getPortfolioData();
    
    if (!data[section] || !Array.isArray(data[section])) {
      return res.status(400).json({ error: `Section ${section} does not exist or is not an array` });
    }
    
    data[section] = data[section].filter(item => item.id != id);
    
    await savePortfolioData(data);
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT to update root-level data (e.g. hero, visibility) - PROTECTED
app.put('/api/portfolio/root', authMiddleware, async (req, res) => {
  try {
    const { key, value } = req.body;
    const data = await getPortfolioData();
    
    if (typeof value === 'object' && !Array.isArray(value)) {
       data[key] = { ...data[key], ...value };
    } else {
       data[key] = value;
    }
    
    await savePortfolioData(data);
    res.json({ success: true, [key]: data[key] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT to update all data at once - PROTECTED
app.put('/api/portfolio/all', authMiddleware, async (req, res) => {
  try {
    const newData = req.body;
    await savePortfolioData(newData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST file upload (Store in Supabase Storage) - PROTECTED
app.post('/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Supabase storage is not configured properly.' });
  }

  try {
    const fileExt = path.extname(req.file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ error: "Failed to upload to cloud storage." });
    }

    const { data: publicUrlData } = supabase.storage
      .from(supabaseBucket)
      .getPublicUrl(filePath);

    res.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({ error: "Failed to process image." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
