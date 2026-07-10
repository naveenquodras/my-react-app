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
        <div className="header">
            <span>Notes </span>
            <a target="blank" href="" className="btn add" onClick={onNewNote}>+</a>
            <NoteEditor open={isEditorOpen} context="createNote" onClose={onClose} onNoteSaved={onNoteSaved} />
        </div>
    );
}