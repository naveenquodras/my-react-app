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

-- Example: Insert some sample data (optional)
-- INSERT INTO notes (title, details) VALUES
-- ('Sample Note 1', 'This is the first sample note'),
-- ('Sample Note 2', 'This is the second sample note');
