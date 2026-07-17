import { useRef, useEffect } from "react";
import type { INote } from "./note";
import './noteEditor.css';


const SERVER_URL = 'http://localhost:3001';

interface NoteEditorProps {
    note?: INote
    context : "createNote" | "editNote"
    /** When true, the dialog is shown; when false, it is closed. */
    open?: boolean;
    /** Called when the dialog should close (Close button or after save). */
    onClose?: () => void;
    onNoteSaved?: () => void;
}

export default function NoteEditor({note, open = false, onClose, onNoteSaved, context = "createNote" }: NoteEditorProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const detailsRef = useRef<HTMLTextAreaElement>(null);
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
    const isEditingNote = ()=>{
        return context ==="editNote";
    };
    useEffect(() => {
        if (open) {
            isEditingNote() ? setFields() : resetFields();
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
            if (isEditingNote() && note) {
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
        <dialog ref={dialogRef} className="note-editor" onClose={handleClose}>
                <div className="header"> <b> Add Note </b> </div>
                <div className="main form-fields">    
                    <div className="form-field-group">
                        <label htmlFor="title"> Title:</label>
                        <textarea ref={titleRef} id="title" placeholder="Enter title here" />
                    </div>
                    <div className="form-field-group">
                        <label htmlFor="details">Details:</label> 
                        <textarea  ref={detailsRef} id="details" placeholder="Enter details here"/>
                    </div>
                </div>     
                <div className="footer"> 
                    <button onClick={onSave}>Save</button>
                    <button onClick={handleClose}>Close</button>
                </div>
        </dialog>
        </>
    );
}