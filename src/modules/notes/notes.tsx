import { useState, useEffect } from 'react';
import type { INote } from './note';
import NotesList from './notesList';
import NoteDetails from './noteDetails';
import NoteEditor from "./noteEditor";
import { RoundButton } from '../../components/Buttons/RoundButton';
import { API_SERVER } from '../../settings';
import './notes.css';

export default function Notes() {
    const [notes, setNotes] = useState<INote[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const onNewNote = ()=> {
        setIsEditorOpen(true);
    };
    const onClose = ()=> {
        setIsEditorOpen(false);
    };
    const refreshNotes = () => {
        fetch(`${API_SERVER}/api/notes`)
            .then(response => response.json())
            .then(data => setNotes(data));
    };

    useEffect(refreshNotes, []);

    const handleNoteClick = (note: INote) => {
        setSelectedNote(note);
    };

    return (
        <div className="notes-container">
            <section className="sidebar">
                <span className="title">Notes</span>
                <span className="add-note-btn"> <RoundButton onClick={onNewNote}></RoundButton> </span>
                <NoteEditor open={isEditorOpen} context="createNote" onClose={onClose} onNoteSaved={refreshNotes} />

                <NotesList
                    notes={notes}
                    handleNoteClick={handleNoteClick}
                    onNoteSaved={refreshNotes}
                />
            </section>
            <section className="main">
                {selectedNote && <NoteDetails note={selectedNote} />}
            </section>
        </div>
    );
}
