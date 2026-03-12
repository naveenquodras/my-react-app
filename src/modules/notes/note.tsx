/// <reference path="../../svg.d.ts" />
import React from "react";
import { useState } from "react";
import NoteEditor from "./noteEditor/noteEditor";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import './note.css';
import { API_SERVER } from "../../settings";

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
    const deleteNote = () => {
        fetch(`${API_SERVER}/api/notes/${note.id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            onNoteSaved();
        })
        .catch(error => {
            console.error(error);   
        });
    }
    return (
        <>
        <div className="note" onClick={handleClick}>
            <div className="note-header">
                <h5>{note.title}</h5>
                <span className="note-header-icons">
                    <img src={editIcon} className="icon--edit-note" onClick={editNote}/>
                    <img src={deleteIcon} className="icon--delete-note" onClick={deleteNote}/>
                </span>
            </div>
            
            <p>{note.details}</p>
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
 