import React, { useState } from "react";
import NoteEditor from "./noteEditor/noteEditor";

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
            <button onClick={onNewNote}>New Note</button>
            <NoteEditor open={isEditorOpen} mode="new" onClose={onClose} onNoteSaved={onNoteSaved} />
        </>
    );
}