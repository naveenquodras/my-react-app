import type { INote } from './note'
import { Note } from './note'

interface NotesListProps {
    notes : INote[]
    handleNoteClick : (note: INote) => void
    onNoteSaved : () => void
}

export default function NotesList({ notes, handleNoteClick, onNoteSaved }: NotesListProps) {
    return (
        <>
        <section className="list">
            <ul>
                {notes.map((note: INote) => (
                    <li key={note.id}>
                        <Note note={note} handleNoteClick={() => handleNoteClick(note)} onNoteSaved={onNoteSaved} />
                    </li>
                ))}
            </ul>
        </section>
        </>
    );
}
