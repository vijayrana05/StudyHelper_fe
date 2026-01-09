import { useEditor, EditorContent, type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import SideBar from "../components/ui/sideBar";
import { useEffect } from "react";
import Toolbar from "../components/ui/toolbar";
import { useState } from "react";
import { useNotesStore } from "../store/notesStore";
import Modal from "../components/ui/Modal";
import SideCard from "../components/ui/sidecard";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import AskAiModal from "../components/ui/askAiModal";
import QueryNotesModal from "../components/ui/queryModal";

import '../App.css'
const extensions = [
    StarterKit,
    Underline
];


export function EditorPage() {
    const location = useLocation();
    const { _id, content, subject, title } = location.state || { content: { type: "doc", content: [] } };
    let hasInitializedContent = useRef(false);
    const sideCardSelected = location.state;
    if (sideCardSelected) {
        hasInitializedContent.current = false
    }
    const setTitle = useNotesStore((state) => state.setTitle);
    const setSubject = useNotesStore((state) => state.setSubject);
    useEffect(() => {
        if (subject) {
            setSubject(subject); 
        }
    }, [subject]);
    useEffect(() => {
        if (title) {
            setTitle(title); 
        }
    }, [title]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isAskAiModalOpen, setAskAiModalOpen] = useState(false)
    const [isQueryNotesModalOpen, setQueryNotesModalOpen] = useState(false)

    const addNote = useNotesStore((state) => state.addNote); // ✅ get addNote from store
    const updateNote = useNotesStore((state) => state.updateNote)
    const notes = useNotesStore((state) => state.notes);
    
    const fetchNotes = useNotesStore((state) => state.fetchNotes)

    useEffect(() => {
            fetchNotes();
    }, [notes.length, fetchNotes]);

    const editor = useEditor({
        extensions,
        content: content,
    })

    if (!editor) {
        return null;
    }

    useEffect(() => {
        if (editor && content && !hasInitializedContent.current) {
            editor.commands.setContent(content);
            hasInitializedContent.current = true;
           
        }
    }, [editor, content]);

    return (<div>
        <div className="flex">
            <div className=" border-r-2 border-gray-200  min-h-screen   hidden min-w-25 lg:block">
                <SideBar />
            </div>
            <div className="bg-[rgb(247,247,247)] hidden lg:block min-h-screen min-w-78 ">
                <div className="p-5 px-7 pt-14 space-y-6">
                    {notes.map((card: any) => (
                        <SideCard key={card._id} noteId={card._id} title={card.title} content={card.content} subject={card.subject} color={card.color} fav={card.fav} createdAt={card.createdAt} updatedAt={card.updatedAt} />
                    ))}
                </div>
            </div>
            <div className=" max-w-5xl w-full p-2 rounded-lg shadow-md">
                {/* <div>hello</div> */}


                <Toolbar editor={editor} setModalOpen={setModalOpen} setAskAiModalOpen={(setAskAiModalOpen)} setQueryNotesModalOpen={(setQueryNotesModalOpen)} />

                <div className=" rounded-lg ml-2  mt-6 ">
                    <EditorContent editor={editor} className="tiptap min-h-130 sm:pl-5 md:8  pt-3 cursor-white  overflow-y-scroll " />
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={(subject, color, title) => {
                        const fullJson = editor.getJSON();


                        const bodyJson: JSONContent = {
                            type: "doc",
                            content: fullJson.content || [],
                        };
                        if (_id) {
                            updateNote({
                                _id,
                                title,
                                plainText: editor.getText(),
                                content: bodyJson,
                                subject,
                                color,
                                fav: false
                            });
                        }
                        else {
                            addNote({
                                plainText: editor.getText(),
                                title,
                                content: bodyJson,
                                subject,
                                color,
                            });
                        }
                    }}
                    id={_id}

                />
                <AskAiModal
                    isOpenAskAi={isAskAiModalOpen}
                    onCloseAskAi={() => setAskAiModalOpen(false)}
                />
                <QueryNotesModal
                    isOpenQueryNotes={isQueryNotesModalOpen}
                    onCloseQueryNotes={() => setQueryNotesModalOpen(false)}
                    noteId={_id}
                />
            </div>
        </div>

    </div>)
}




export default EditorPage