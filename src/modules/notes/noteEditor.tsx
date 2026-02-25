import { useState, useRef, useEffect } from "react";
import React from "react";
import { INote } from "./note";
import './notes.css';

const SERVER_URL = 'http://localhost:3001';

interface NoteEditorProps {
    /** When true, the dialog is shown; when false, it is closed. */
    open?: boolean;
    /** Called when the dialog should close (Close button or after save). */
    onClose?: () => void;
    onNoteSaved?: () => void;
}

export default function NoteEditor({ open = false, onClose, onNoteSaved }: NoteEditorProps) {
    const [note, setNote] = useState<INote>({id:-1, title:'', details:''});
    const [isEditorOpen, setIsEditorOpen] = useState(open);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const detailsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditorOpen) {
            setNote({ id: -1, title: '', details: '' });
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isEditorOpen]);

    function handleClose() {
        dialogRef.current?.close();
        setIsEditorOpen(false);
        onClose?.();
    }

    async function onSave() {
        const title = titleRef.current?.value ?? '';
        const details = detailsRef.current?.value ?? '';
        try {
            const method = note.id > 0 ? 'PUT' : 'POST';
            const url = note.id > 0 ? `${SERVER_URL}/api/notes/${note.id}` : `${SERVER_URL}/api/notes`;
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

    const resetFields = () => {
        if (titleRef.current) titleRef.current.value = "";
        if (detailsRef.current) detailsRef.current.value = "";
    };

    const onNewNote = () => {
        resetFields();
        setIsEditorOpen(true);
    };

    return (
        <>
        {!isEditorOpen && <button onClick={onNewNote}>New Note</button>}
        <dialog ref={dialogRef} className="new-note-dialog" onClose={handleClose}>
            <div className="new-note-content">
                <div className="dialog-header"> <b> New Note </b> </div>
                <div className="dialog-main">    
                        <div className="dialog-field">
                            <label htmlFor="title"> Title:</label>
                            <input ref={titleRef} type="textarea" id="title" />
                        </div>
                        <div className="dialog-field">
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