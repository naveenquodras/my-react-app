import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import NoteEditor from "./noteEditor";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import attachIcon from "../../assets/attach.svg";
import './note.css';
import { API_SERVER } from "../../settings";

export interface INote {
    id: number;
    title: string;
    details : string
}

interface NoteUpload {
    id: number;
    note_id: number;
    file_name: string;
    mime_type: string;
    created_at: string;
}

interface NoteProps {
    note : INote
    handleNoteClick : (note: INote) => void
    onNoteSaved : () => void
}
export function Note({ note, handleNoteClick, onNoteSaved }:  NoteProps ) {
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [attachments, setAttachments] = useState<NoteUpload[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadAttachments = () => {
        fetch(`${API_SERVER}/api/notes/${note.id}/uploads`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch attachments');
                }
                return response.json();
            })
            .then((data: NoteUpload[]) => setAttachments(data))
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(loadAttachments, [note.id]);

    const handleClick = () => {
        handleNoteClick(note);
    };
    const editNote = (e: MouseEvent) => {
        e.stopPropagation();
        setIsEditingNote(true);
    };
    const deleteNote = (e: MouseEvent) => {
        e.stopPropagation();
        fetch(`${API_SERVER}/api/notes/${note.id}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to delete note');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            onNoteSaved();
        })
        .catch(error => {
            console.error(error);   
        });
    };
    const openFilePicker = (e: MouseEvent) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };
    const openAttachment = (e: MouseEvent, uploadId: number) => {
        e.stopPropagation();
        window.open(`${API_SERVER}/api/notes/${note.id}/uploads/${uploadId}`, '_blank', 'noopener,noreferrer');
    };
    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file || isUploading) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setIsUploading(true);

        fetch(`${API_SERVER}/api/notes/${note.id}/uploads`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            return response.json();
        })
        .then(() => {
            loadAttachments();
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setIsUploading(false);
        });
    };

    return (
        <>
        <div className="note" onClick={handleClick}>
            <section className="header">
                <h5>{note.title}</h5>
                <span className="action-buttons">
                    <img src={editIcon} className="icon--edit" onClick={editNote} alt="Edit"/>
                    <img src={attachIcon} className="icon--upload" onClick={openFilePicker} alt="Attach"/>
                    <img src={deleteIcon} className="icon--delete" onClick={deleteNote} alt="Delete"/>
                    <span className="tooltip-edit">Edit</span>
                    <span className="tooltip-upload">{isUploading ? 'Attaching…' : 'Attach'}</span>
                    <span className="tooltip-delete">Delete</span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="file-input"
                        onChange={uploadFile}
                        onClick={(e) => e.stopPropagation()}
                    />
                </span>
            </section>
            <section className="details">
                <p>{note.details}</p>
            </section>
            {attachments.length > 0 && (
                <section className="attachments">
                    {attachments.map((attachment) => (
                        <img
                            key={attachment.id}
                            src={attachIcon}
                            className="attachment-icon"
                            alt={attachment.file_name}
                            title={attachment.file_name}
                            onClick={(e) => openAttachment(e, attachment.id)}
                        />
                    ))}
                </section>
            )}
        </div>
        {isEditingNote && (
            <NoteEditor
                note={note}
                context="editNote"
                open={isEditingNote}
                onClose={() => setIsEditingNote(false)}
                onNoteSaved={onNoteSaved}
            />
        )}
        </>
        
    );
}
