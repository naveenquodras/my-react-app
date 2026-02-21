import * as React from "react";

export interface INote {
    id: number;
    title: string;
    details : string
}
interface NoteProps {
    note : INote
    handleNoteClick : (note: INote) => void
}
export function Note({ note, handleNoteClick }:  NoteProps ) {
    const handleClick = () => {
        handleNoteClick(note);
    }
    return (
        <div className="note" onClick={handleClick}>
            <h5> {note.id}. {note.title}</h5>
            <div>{note.details}</div>
        </div>
    );
}
