import React from 'react';
import { useState, useEffect } from 'react';
import { INote } from './notes/note';
import NotesList from './notes/notesList';
import { API_SERVER } from '../settings';


export default function Notes(){
    const [notes, setNotes] = useState<INote[]>([]);

    const refreshNotes = () => {
        fetch(`${API_SERVER}/api/notes`)
        .then(response => response.json())
        .then(data => setNotes(data));
    };

    useEffect(refreshNotes,[]);

    return (
        <>
            <div className="notes">
                <NotesList notes={notes} />
            </div>
        </>
    );
}