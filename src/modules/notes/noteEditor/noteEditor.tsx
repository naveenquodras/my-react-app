import { useState, useRef, useEffect } from "react";
import React from "react";
import { INote } from "../note";
import './noteEditor.css';

const SERVER_URL = 'http://localhost:3001';

interface NoteEditorProps {
    note : INote
    mode : "new" | "edit"
    /** When true, the dialog is shown; when false, it is closed. */
    open?: boolean;
    /** Called when the dialog should close (Close button or after save). */
    onClose?: () => void;
    onNoteSaved?: () => void;
}

export default function NoteEditor({note, open = false, onClose, onNoteSaved, mode = "new" }: NoteEditorProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const detailsRef = useRef<HTMLInputElement>(null);
    const resetFields = () => {
        if (titleRef.current) titleRef.current.value = "";
        if (detailsRef.current) detailsRef.current.value = "";
    };
    const setFields = () => {
        if(note && note.id > 0) {
            if(titleRef.current) titleRef.current.value = note.title;
            if(detailsRef.current) detailsRef.current.value= note.details;
        }
    };
    const handleClose = ()=> {
        dialogRef.current?.close();
        onClose?.();
    }
    const isEditMode = ()=>{
        return mode ==="edit";
    };
    useEffect(() => {
        if (open) {
             isEditMode() ? setFields() : resetFields();
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);

    async function onSave() {
        const title = titleRef.current?.value ?? '';
        const details = detailsRef.current?.value ?? '';
        try {
            let method = 'POST';
            let url = `${SERVER_URL}/api/notes`;
            if (isEditMode()) {
                method = 'PUT';
                url = `${SERVER_URL}/api/notes/${note.id}`;
            }
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, details }),
            });
            if (!res.ok) throw new Error('Failed to save note');
            dialogRef.current?.close();
            onClose?.();
            onNoteSaved?.();
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
        <dialog ref={dialogRef} className="new-note-dialog" onClose={handleClose}>
            <div className="new-note-content">
                <div className="dialog-header"> <b> New Note </b> </div>
                <div className="dialog-main">    
                        <div className="dialog-field">
                            <label htmlFor="title"> Title:</label>
                            <input ref={titleRef} type="textarea" id="title" />
                        
                        
                            <label htmlFor="details">Details:</label>
                            <input ref={detailsRef} type="textarea" id="details"/>
                        </div>

                </div>     
                <div className="dialog-footer"> 
                    <button onClick={onSave}>Save</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </dialog>
        </>
    );
}