// src/store/notesStore.ts
import { create } from "zustand";
import { type JSONContent } from "@tiptap/react";
import axios from "axios";

type Note = {
  _id: string;
  title: string;
  content: JSONContent;
  subject: string;
  color: string;
  plainText: string;
  fav: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type NewNote = {
  title: string;
  content: JSONContent;
  subject: string;
  color: string;
  plainText: string
};

type NotesState = {
  notes: Note[];
  fetchNotes: () => Promise<void>;
  addNote: (note: NewNote) => Promise<void>;
  updateNote: (note: Note) => Promise<void>; // 👈 Add this
  subject: string;
  title: string;
  setSubject: (subject: string) => void;
  setTitle: (title: string) => void;
  deleteNote: (id: string) => Promise<void>; // ✅ added
  loading: boolean;


};

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  subject: "",
  loading: false,
  title: "",
  setTitle: (title: string) => set({ title }),
  setSubject: (subject: string) => set({ subject }),
  fetchNotes: async () => {
    set({ loading: true }); // start loading
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/notesRoutes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ notes: response.data }); // set notes if successful
    } catch (err) {
      console.error("Error fetching notes", err); // log the error
    } finally {
      set({ loading: false }); // stop loading no matter what
    }
  },

  addNote: async ({ title, content, subject, color, plainText }: NewNote) => {
    // console.log("add note render")
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5000/api/notesRoutes/",
        { title, content, subject, color, plainText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        notes: [response.data, ...state.notes],
      }));

      alert("Saved to DB!");
    } catch (err) {
      console.error("Error saving note", err);
    }
  },
  updateNote: async (note: Note) => {
    // console.log("update note render")
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `http://localhost:5000/api/notesRoutes/${note._id}`,
        {
          title: note.title,
          content: note.content,
          subject: note.subject,
          color: note.color,
          plainText: note.plainText
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Replace the updated note in the store
      set((state) => ({
        notes: state.notes.map((n) =>
          n._id === note._id ? response.data : n
        ),
      }));

      alert("Note updated!");
    } catch (err) {
      console.error("Error updating note", err);
    }
  },
  deleteNote: async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(`http://localhost:5000/api/notesRoutes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted note from the store
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id),
      }));

      alert("Note deleted!");
    } catch (err) {
      console.error("Error deleting note", err);
    }
  },

}));
