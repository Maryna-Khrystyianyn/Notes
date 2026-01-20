import { Note } from "../types/note";
import NoteCard from "./NoteCard";

interface Props {
  notes: Note[];
  onSelect: (note: Note) => void;
  onDelete: (id: number) => void;
}

export default function NotesList({ notes, onSelect, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onClick={onSelect} onDelete={onDelete} />
      ))}
    </div>
  );
}
