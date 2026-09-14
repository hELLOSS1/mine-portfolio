import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { initDb } from './db.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Setup file upload handling in persistent disk storage
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve uploads directory
app.use('/uploads', express.static(UPLOAD_DIR));
// Keep legacy local uploads that were committed to git
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Helper to get data from SQLite
const getPortfolioData = async () => {
  try {
    const db = await initDb();
    const res = await db.get('SELECT data FROM portfolio_data WHERE id = 1');
    if (res) return JSON.parse(res.data);
    return {};
  } catch (err) {
    console.error("Error reading from SQLite:", err);
    throw err;
  }
};

// Helper to save data to SQLite
const savePortfolioData = async (data) => {
  try {
    const db = await initDb();
    const res = await db.run('UPDATE portfolio_data SET data = ? WHERE id = 1', [JSON.stringify(data)]);
    return res.changes;
  } catch (err) {
    console.error("Error writing to SQLite:", err);
    throw err;
  }
};

// Root endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Portfolio API is running successfully on SQLite!');
});

// GET all data
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST to an array section (Add)
app.post('/api/portfolio/:section', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an item in an array section (Edit)
app.put('/api/portfolio/:section/:id', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// DELETE an item from an array section (Delete)
app.delete('/api/portfolio/:section/:id', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// PUT to update root-level data (e.g. hero, visibility)
app.put('/api/portfolio/root', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// PUT to update all data at once
app.put('/api/portfolio/all', async (req, res) => {
  try {
    const newData = req.body;
    await savePortfolioData(newData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST file upload (Store in filesystem instead of PostgreSQL)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const backendUrl = process.env.VITE_API_URL || ''; 
    const fileUrl = `${backendUrl}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({ error: "Failed to process image." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
