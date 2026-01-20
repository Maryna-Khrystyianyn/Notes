import { Note } from "../types/note";

interface Props {
  note: Note;
  onClick: (note: Note) => void;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onClick, onDelete }: Props) {
  return (
    <div
      className="p-4 bg-purple-800 rounded-lg cursor-pointer hover:bg-purple-700 transition flex flex-col justify-between"
      onClick={() => onClick(note)}
    >
      <div>
        <h2 className="font-semibold text-2xl uppercase">{note.title}</h2>

        <p className="text-sm opacity-80">{note.content.slice(0, 80)}...</p>
      </div>

      <div className="flex justify-between items-end">
        <button
          className="text-red-400 hover:text-red-600 mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
        >
          Delete
        </button>
        <p> {note.created_at.slice(0, 10)} </p>
      </div>
    </div>
  );
}
