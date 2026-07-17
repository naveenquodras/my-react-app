import type { INote } from './note'

interface NoteDetailsProps {
    note : INote
}

export default function NoteDetails({ note }: NoteDetailsProps) {
    return (
        <>
            <section className="details">
                <h3> {note.title}</h3>
                <p>{note.details}</p>
            </section>
        </>
    );
}