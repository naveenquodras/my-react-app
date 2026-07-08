import React, { useState } from "react";
import NoteEditor from "./noteEditor";

interface NotesHeaderProps {
    onNoteSaved : ()=> void
}

export default function NotesHeader({onNoteSaved} : NotesHeaderProps) {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const onNewNote = ()=> {
        setIsEditorOpen(true);
    };
    const onClose = ()=> {
        setIsEditorOpen(false);
    };

    return (
        <>
        <div className="header">
            <button onClick={onNewNote}>Add Note</button>
            <NoteEditor open={isEditorOpen} context="createNote" onClose={onClose} onNoteSaved={onNoteSaved} />
        </div>
        </>
    );
}