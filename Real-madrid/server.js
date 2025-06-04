import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const uri = 'mongodb://localhost:27017';
const dbName = 'Real-Madrid';
const collectionName = 'Users';

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Serve static assets from dist/assets (for Vite production build)
app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')));

// Optionally, also serve from src/assets for development
app.use('/src/assets', express.static(path.join(__dirname, 'src', 'assets')));

app.use(bodyParser.json());

// Move API routes BEFORE the SPA fallback!
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  // Prevent admin login from being checked in DB
  if (email === 'admin@realmadrid.com' && password === 'admin123') {
    return res.json({ success: true, admin: true });
  }

  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection(collectionName);
    // Find user with matching email and password
    const user = await users.findOne({ email, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to get all news
app.get('/api/news', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const news = db.collection('News');
    const newsList = await news.find({}).toArray();
    res.json(newsList);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// Serve admin dashboard route for React SPA
app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Fallback for SPA: serve index.html for any unknown route (except API)
app.get(/^\/(?!api).*/, (req, res, next) => {
  // If the request is for an API route, skip to next middleware
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
