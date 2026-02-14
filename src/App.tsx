import React, { useState, useEffect } from 'react'
import './App.css'
import NotesList from './modules/notes/notesList'
import NoteDetails from './modules/notes/noteDetails' 
import { INote } from './modules/notes/note'
import Menu from './modules/app/menu'




function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<INote | undefined>(undefined); 
  const handleNoteClick = (note: INote) => {
    setSelectedNote(note);
  }

  function refreshNotes() {
    fetch('http://localhost:3001/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  }

  useEffect(() => {
    refreshNotes();
  }, []);

  return (
    <>
    <div className="main-app">
      <Menu />
      <div id="notes-container" className="notes-container">
          <div id="notes-list" className="h-30-rem brd-gray-1 brd-rds-1 bg-gray-1 ">
              <div className='h-80 oflw-y-auto'>
                  <NotesList notes={notes} handleNoteClick={handleNoteClick} onNoteSaved={refreshNotes} />
              </div> 
          </div>
          <div id="note-details" className="note-details">
            {selectedNote && <NoteDetails note={selectedNote} />}
          </div>
      </div>
    </div>

    </>
  );
}

export default App;
