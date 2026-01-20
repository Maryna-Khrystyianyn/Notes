"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Note } from "../types/note";

interface Props {
  note: Note | null;
  onClose: () => void;
  onSave: (updated: { id?: number; title: string; content: string }) => void;
}

export default function NoteModal({ note, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    onSave({
      id: note?.id,
      title,
      content,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}   // ← затемнення фону при закритті
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-purple-900 p-6 rounded-lg w-96 max-w-full shadow-xl"
        initial={{
          scale: 0.2,
          rotate: -60,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          rotate: 0,
          opacity: 1,
        }}
        exit={{
          scale: 0.2,
          rotate: -15,
          opacity: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >
        <input
          type="text"
          className="w-full p-2 rounded bg-purple-800 text-white mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="w-full p-2 rounded bg-purple-800 text-white mb-4"
          value={content}
          rows={7}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-purple-700 rounded hover:bg-purple-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
