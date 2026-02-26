import React from "react";
import { useState } from "react";
import NoteEditor from "./noteEditor/noteEditor";

export interface INote {
    id: number;
    title: string;
    details : string
}
interface NoteProps {
    note : INote
    handleNoteClick : (note: INote) => void
    onNoteSaved : () => void
}
export function Note({ note, handleNoteClick, onNoteSaved }:  NoteProps ) {
    const [isEditorOpen, setEditorOpen] = useState(false);

    const onEditNote = ()=> {
        setEditorOpen(true);
    };

    const handleEditorClose = ()=> {
        setEditorOpen(false);
    };
   
    return (
        <>
        <div className="note" onClick={()=> handleNoteClick(note)}>
            <h5> {note.id}. {note.title}</h5>
            <div>{note.details}</div>
        </div>
        <button onClick={onEditNote}>Edit</button>
        <NoteEditor mode="edit"
                    open={isEditorOpen} 
                    onClose={handleEditorClose}
                    onNoteSaved={onNoteSaved} />
        </>
    );
}
