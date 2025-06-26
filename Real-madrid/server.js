import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
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

// Increase payload size limit for large images
app.use(bodyParser.json({ limit: '50mb' }));

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

// API endpoint to get all squad players
app.get('/api/squad', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const squad = db.collection('Squad');
    const squadList = await squad.find({}).toArray();
    res.json(squadList);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to get all fixtures
app.get('/api/fixtures', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const fixtures = db.collection('Fixtures');
    const fixturesList = await fixtures.find({}).toArray();
    res.json(fixturesList);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to get achievements
app.get('/api/achievements', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const achievement = db.collection('Achievement');
    // Assuming only one document with all trophies, or use .find({}) for an array
    const data = await achievement.findOne({});
    res.json(data);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to update a news card by id
app.put('/api/news/:id', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const news = db.collection('News');
    const { id } = req.params;
    // Only set fields that are provided in the request body
    const updateFields = {};
    if ('title' in req.body) updateFields.title = req.body.title;
    if ('text' in req.body) updateFields.text = req.body.text;
    if ('img' in req.body) updateFields.img = req.body.img;
    if ('role' in req.body) updateFields.role = req.body.role;
    const result = await news.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to delete a news card by id
app.delete('/api/news/:id', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const news = db.collection('News');
    const { id } = req.params;
    const result = await news.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to create a new news card
app.post('/api/news', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const news = db.collection('News');
    const { title, text, img } = req.body;
    const result = await news.insertOne({ title, text, img });
    res.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to update a squad player by id
app.put('/api/squad/:id', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const squad = db.collection('Squad');
    const { id } = req.params;
    const update = { ...req.body };
    delete update._id;
    const result = await squad.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to delete a squad player by id
app.delete('/api/squad/:id', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const squad = db.collection('Squad');
    const { id } = req.params;
    const result = await squad.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to update a fixture by id
app.put('/api/fixtures/:id', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const fixtures = db.collection('Fixtures');
    const { id } = req.params;
    const update = { ...req.body };
    delete update._id;
    const result = await fixtures.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Fixture not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to delete a fixture by id
app.delete('/api/fixtures/:id', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const fixtures = db.collection('Fixtures');
    const { id } = req.params;
    const result = await fixtures.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Fixture not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to create a new fixture
app.post('/api/fixtures', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const fixtures = db.collection('Fixtures');
    const doc = { ...req.body };
    const result = await fixtures.insertOne(doc);
    res.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (client) await client.close();
  }
});

// API endpoint to update achievements (PUT)
app.put('/api/achievements', async (req, res) => {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const achievement = db.collection('Achievement');
    const update = { ...req.body };
    delete update._id;
    // Update the first (and only) document
    const result = await achievement.updateOne({}, { $set: update }, { upsert: true });
    res.json({ success: true });
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
