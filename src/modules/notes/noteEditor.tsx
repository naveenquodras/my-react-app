import { useState, useRef, useEffect } from "react";
import React from "react";
import { INote } from "./note";
import './notes.css';

const API_BASE = 'http://localhost:3001';

interface NoteEditorProps {
    /** When true, the dialog is shown; when false, it is closed. */
    open?: boolean;
    /** Called when the dialog should close (Close button or after save). */
    onClose?: () => void;
    onNoteSaved?: () => void;
}

export default function NoteEditor({ open = false, onClose, onNoteSaved }: NoteEditorProps) {
    const [note, setNote] = useState<INote>({id:-1, title:'', details:''});
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const detailsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setNote({ id: -1, title: '', details: '' });
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);

    function handleClose() {
        dialogRef.current?.close();
        onClose?.();
    }

    async function onSave() {
        const title = titleRef.current?.value ?? '';
        const details = detailsRef.current?.value ?? '';
        try {
            const method = note.id > 0 ? 'PUT' : 'POST';
            const url = note.id > 0 ? `${API_BASE}/api/notes/${note.id}` : `${API_BASE}/api/notes`;
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
        {/* <button onClick={onNewNote}>New Note</button> */}
        <dialog ref={dialogRef} className="new-note-dialog">
            <div className="new-note-content">
                <div className="new-note-header"> New Note </div>
                <div className="new-note-body">    
                        <label htmlFor="title"> Title:</label>
                        <input ref={titleRef} type="text" id="title" value={note.title} />
                        
                        <label htmlFor="details">Details:</label>
                        <input ref={detailsRef} type="textarea" id="details" value={note.details}/>
                </div>     
                <div className="new-note-footer">
                    <button onClick={onSave}>Save</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </dialog>
        </>
    );
}