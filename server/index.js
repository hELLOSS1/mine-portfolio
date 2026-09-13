import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import db from './db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Setup file upload handling
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Expose uploads statically
app.use('/uploads', express.static(uploadDir));

// Helper to get data
const getPortfolioData = () => {
  return new Promise((resolve, reject) => {
    db.get('SELECT data FROM portfolio_data WHERE id = 1', (err, row) => {
      if (err) return reject(err);
      if (row) return resolve(JSON.parse(row.data));
      resolve({});
    });
  });
};

// Helper to save data
const savePortfolioData = (data) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('UPDATE portfolio_data SET data = ? WHERE id = 1');
    stmt.run(JSON.stringify(data), function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
    stmt.finalize();
  });
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

// POST file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return the URL path to the uploaded file
  const fileUrl = `/api/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Because the frontend might request the image directly via proxy, we route /api/uploads to /uploads statically
app.use('/api/uploads', express.static(uploadDir));

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
