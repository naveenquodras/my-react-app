import { useState } from "react";
import NoteEditor from "./noteEditor";
import {RoundButton} from "../../components/Buttons/RoundButton";

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
            <RoundButton onClick={onNewNote} />
            <NoteEditor open={isEditorOpen} context="createNote" onClose={onClose} onNoteSaved={onNoteSaved} />
        </div>
    );
}