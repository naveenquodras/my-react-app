-- Create notes table if it doesn't exist
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on title for faster searches
CREATE INDEX IF NOT EXISTS idx_notes_title ON notes(title);

-- Files/images attached to notes (multiple uploads per note)
CREATE TABLE IF NOT EXISTS "NoteUploads" (
    id SERIAL PRIMARY KEY,
    note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_data BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_note_uploads_note_id ON "NoteUploads" (note_id);

-- Example: Insert some sample data (optional)
-- INSERT INTO notes (title, details) VALUES
-- ('Sample Note 1', 'This is the first sample note'),
-- ('Sample Note 2', 'This is the second sample note');
