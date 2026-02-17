import React from 'react';
import { useState, useEffect } from 'react';
import { INote, Note } from './notes/note';
import NotesList from './notes/notesList';
import NoteDetails from './notes/noteDetails';
import { API_SERVER } from '../settings';


export default function Notes(){
    const [notes, setNotes] = useState<INote[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote>();

    const refreshNotes = () => {
        fetch(`${API_SERVER}/api/notes`)
        .then(response => response.json())
        .then(data => setNotes(data));
    };

    useEffect(refreshNotes, []);

    const handleNoteClick = (note: INote) => {
        // setSelectedNote(note);
    };

    return (
        <>
            <div className="notes">
                <NotesList notes={notes} handleNoteClick={handleNoteClick} onNoteSaved={refreshNotes}/>
                {selectedNote && <NoteDetails note={selectedNote} />}
            </div>
        </>
    );
}