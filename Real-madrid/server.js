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

  let client;
  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection(collectionName);
    await users.insertOne({ email, password });
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err); // Add this line for debugging
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
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
