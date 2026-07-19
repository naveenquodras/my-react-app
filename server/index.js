import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import pool, { testConnection } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
testConnection();

// Example API endpoint - Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY id desc');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Example API endpoint - Get a single note by ID
app.get('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// Example API endpoint - Create a new note
app.post('/api/notes', async (req, res) => {
  try {
    const { title, details } = req.body;
    const result = await pool.query(
      'INSERT INTO notes (title, details) VALUES ($1, $2) RETURNING *',
      [title, details]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Example API endpoint - Update a note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details } = req.body;
    const result = await pool.query(
      'UPDATE notes SET title = $1, details = $2 WHERE id = $3 RETURNING *',
      [title, details, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Example API endpoint - Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully', note: result.rows[0] });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Upload a single file/image for a note
app.post('/api/notes/:id/uploads', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const noteResult = await pool.query('SELECT id FROM notes WHERE id = $1', [id]);
    if (noteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const result = await pool.query(
      `INSERT INTO "NoteUploads" (note_id, file_name, mime_type, file_data)
       VALUES ($1, $2, $3, $4)
       RETURNING id, note_id, file_name, mime_type, created_at`,
      [id, req.file.originalname, req.file.mimetype, req.file.buffer]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Get all uploads for a note (metadata only)
app.get('/api/notes/:id/uploads', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, note_id, file_name, mime_type, created_at
       FROM "NoteUploads"
       WHERE note_id = $1
       ORDER BY id`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

// Open/download a single upload for a note
app.get('/api/notes/:id/uploads/:uploadId', async (req, res) => {
  try {
    const { id, uploadId } = req.params;
    const result = await pool.query(
      `SELECT file_name, mime_type, file_data
       FROM "NoteUploads"
       WHERE note_id = $1 AND id = $2`,
      [id, uploadId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    const file = result.rows[0];
    res.setHeader('Content-Type', file.mime_type || 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${encodeURIComponent(file.file_name)}"`
    );
    res.send(file.file_data);
  } catch (error) {
    console.error('Error fetching upload:', error);
    res.status(500).json({ error: 'Failed to fetch upload' });
  }
});

//Delete a single upload for a note
app.delete('/api/notes/:id/uploads/:uploadId', async (req, res) => {
  try {
    const { id, uploadId } = req.params;
    const result = await pool.query('DELETE FROM "NoteUploads" WHERE note_id = $1 AND id = $2 RETURNING *', [id, uploadId]);
    res.json({ message: 'Upload deleted successfully', upload: result.rows[0] });
  } catch (error) {
    console.error('Error deleting upload:', error);
    res.status(500).json({ error: 'Failed to delete upload' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
