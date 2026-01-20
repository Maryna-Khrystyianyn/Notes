"use client";
import { useState, useEffect } from "react";
import { Note } from "./types/note";
import NotesList from "./components/NotesList";
import NoteModal from "./components/notemodal";
import RollingTitle from "./components/Title";
import { AnimatePresence } from "framer-motion";
import { API_URL } from "./config";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // завантаження нотаток
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    })();
  }, []);

  const deleteNote = async (id: number) => {
    await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  // викликається з NoteModal
  const saveNote = async (note: {
    id?: number;
    title: string;
    content: string;
  }) => {
    if (note.id) {
      // редагування
      const res = await fetch(`${API_URL}/notes/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      const updated: Note = await res.json();
      setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      setSelected(updated);
    } else {
      // створення нової
      const res = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      const newNote: Note = await res.json();
      setNotes((prev) => [newNote, ...prev]);
      setSelected(newNote);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-10">
      <div className="flex justify-between items-center mb-6">
        <RollingTitle />
        <button
          className="px-4 py-2 bg-purple-700 rounded hover:bg-purple-600"
          onClick={() => setIsCreating(true)}
        >
          + Add Note
        </button>
      </div>

      <NotesList notes={notes} onSelect={setSelected} onDelete={deleteNote} />

      {/* Редагування */}
      <AnimatePresence>
        {selected && (
          <NoteModal
            note={selected}
            onClose={() => setSelected(null)}
            onSave={async (updatedNote) => {
              await saveNote(updatedNote);
              setSelected(null); // <- закриваємо модалку після редагування
            }}
          />
        )}
      </AnimatePresence>

      {/* Створення */}
      <AnimatePresence>
        {isCreating && (
          <NoteModal
            note={{
              id: 0,
              title: "",
              content: "",
              created_at: new Date().toISOString(),
            }}
            onClose={() => setIsCreating(false)}
            onSave={async (newNote) => {
              await saveNote(newNote);
              setIsCreating(false); // модалка закривається після save
              setSelected(null);
            }}
          />
        )}{" "}
      </AnimatePresence>
    </div>
  );
}
