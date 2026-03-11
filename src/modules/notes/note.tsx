/// <reference path="../../svg.d.ts" />
import React from "react";
import { useState } from "react";
import NoteEditor from "./noteEditor/noteEditor";
import editDoc from "../../assets/editDoc.svg";
import './note.css';

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
    const [isEditingNote, setIsEditingNote] = useState(false);
    const handleClick = () => {
        handleNoteClick(note);
    };
    const editNote = () => {
        setIsEditingNote(true);
    };
    return (
        <>
        <div className="note" onClick={handleClick}>
            <div className="note-header">
                <img src={editDoc} className="icon--edit-note" onClick={editNote}/>
                <h5> <span> {note.title}</span></h5>
            </div>
            <div>{note.details}</div>
        </div>
        {isEditingNote && (
            <NoteEditor
                note={note}
                mode="edit"
                open={isEditingNote}
                onClose={() => setIsEditingNote(false)}
                onNoteSaved={onNoteSaved}
            />
        )}
        </>
        
    );
}
 