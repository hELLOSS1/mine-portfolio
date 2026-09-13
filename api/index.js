import express from 'express';
import cors from 'cors';
import multer from 'multer';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Setup file upload handling in memory for Vercel Blob
const upload = multer({ storage: multer.memoryStorage() });

// Helper to get data from PostgreSQL
const getPortfolioData = async () => {
  if (!(process.env.POSTGRES_URL || process.env.DATABASE_URL)) return {};
  try {
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
    const res = await db.query('UPDATE portfolio_data SET data = $1 WHERE id = 1', [JSON.stringify(data)]);
    return res.rowCount;
  } catch (err) {
    console.error("Error writing to PostgreSQL:", err);
    throw err;
  }
};

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

// POST file upload (Base64 encoding)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Convert the image buffer directly into a Base64 string
    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    
    // Create a Data URI that browsers can use directly in <img src="..." />
    const dataUri = `data:${mimeType};base64,${base64Image}`;
    
    // Return the Data URI to be saved in the database
    res.json({ url: dataUri });
  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({ error: "Failed to process image." });
  }
});

// Serve legacy local uploads that were committed to git
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel Serverless Functions
export default app;
