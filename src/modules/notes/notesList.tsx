import React from 'react'
import { INote, Note } from './note'

interface NotesListProps {
    notes : INote[]
    handleNoteClick : (note: INote) => void
    onNoteSaved?: () => void
    onNewNote?: () => void
}

export default function NotesList({ notes, handleNoteClick, onNoteSaved, onNewNote }: NotesListProps) {
    return (
        <>
            {onNewNote && (
                <button type="button" onClick={onNewNote}>New Note</button>
            )}
            <ul>
                {notes.map((note: INote) => (
                    <li key={note.id}>
                        <Note note={note} handleNoteClick={() => handleNoteClick(note)} />
                    </li>
                ))}
            </ul>
        </>
    );
}
