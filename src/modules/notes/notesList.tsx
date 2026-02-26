import React from 'react'
import { INote, Note } from './note'

interface NotesListProps {
    notes : INote[]
    handleNoteClick : (note: INote) => void
    onNoteSaved : () => void
}

export default function NotesList({ notes, handleNoteClick, onNoteSaved }: NotesListProps) {
    return (
        <>
            <ul>
                {notes.map((note: INote) => (
                    <li key={note.id}>
                        <Note note={note} handleNoteClick={() => handleNoteClick(note)} onNoteSaved={onNoteSaved} />
                    </li>
                ))}
            </ul>
        </>
    );
}
