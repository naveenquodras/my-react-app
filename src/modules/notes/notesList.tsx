import React from 'react'
import { INote, Note } from './note'
import CreateNote from './createNote'

interface NotesListProps {
    notes : INote[]
    // handleNoteClick : (note: INote) => void
    onNoteSaved?: () => void
}

// export default function NotesList({ notes, handleNoteClick, onNoteSaved }: NotesListProps) {
    export default function NotesList({ notes, onNoteSaved }: NotesListProps) {

    return (
        <>
            <CreateNote onNoteSaved={onNoteSaved} />
            <ul>
                {notes.map((note: INote) => (
                    <li key={note.id}>
                        <Note note={note} handleNoteClick={handleNoteClick} />
                    </li>
                ))}
            </ul>
        </>
    );
}
