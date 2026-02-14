import React from 'react'
import { INote } from './note'

interface NoteDetailsProps {
    note : INote
}

export default function NoteDetails({ note }: NoteDetailsProps) {
    return (
        <>
            <h3> {note.title}</h3>
            <p>{note.details}</p>
        </>
    );
}