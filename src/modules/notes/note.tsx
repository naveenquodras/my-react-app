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


/*
 <div class="notes-container">
    <div class="notes-list-container">
        <ul class="notes-list">
            <li class="note">
                <div>title</div>
                <div>details</div>
            </li>
            <li class="note">
                <div>title</div>
                <div>details</div>
            </li>
            <li class="note">
                <div>title</div>
                <div>details</div>
            </li>
        </ul>
    </div>
    <div class="notes-details-container"></div>
    
 </div>
   
*/
 