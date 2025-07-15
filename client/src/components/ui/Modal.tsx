import { useState, useEffect } from "react";
import { useNotesStore } from "../../store/notesStore";
interface ModalProps {
    isOpen: boolean;
    // subject: string
    onClose: () => void;
    onSave: (subject: string, color: string, title: string) => void;
    id: string | undefined
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, id }) => {
    // if (!id) {
    //     subject = "Preview notes here"
    // }
    // console.log("modal renders")
    const allowedColors = [
        "rgb(254, 201, 113)",  // yellowish
        "rgb(254, 155, 114)",  // brownish
        "rgb(221, 232, 140)",  // greenish
        "rgb(182, 147, 253)",  // purple
        "rgb(0, 212, 254)",    // blue
    ];
    const [noteColor, setNoteColor] = useState("#3b82f6");
    // const [noteSubject, setNoteSubject] = useState(subject);
    const subject = useNotesStore((state) => state.subject);
    const setSubject = useNotesStore((state) => state.setSubject);
    const title = useNotesStore((state) => state.title)
    const setTitle = useNotesStore((state) => state.setTitle)

    // useEffect(() => {
    //     if (isOpen) {
    //         setNoteSubject(id ? subject : "Preview notes here");
    //     }
    // }, [isOpen, subject, id]);

    // if (!isOpen) return null;
    useEffect(() => {
        if (isOpen) {
            if (!id) {
                setSubject("Enter subject here");
                setTitle("Enter title here")
            }
        }
    }, [isOpen, id, setSubject, setTitle]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="p-6 rounded-lg shadow-lg bg-white w-96 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-gray-900 text-xl font-bold">Create Note</h2>
                    <button
                        onClick={() => {
                            // ✅ Optionally reset on close
                            onClose();
                        }}
                        className="text-gray-600 text-2xl font-bold"
                    >
                        &times;
                    </button>                </div>

                
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter subject"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter subject"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Color</label>
                    <div className="flex gap-3">
                        {allowedColors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setNoteColor(color)}
                                className={`w-10 h-10 rounded-full border-2 ${noteColor === color ? "ring-2 ring-black" : "border-gray-300"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
                <button
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => {
                        onSave(subject, noteColor, title); // ✅ send data to parent
                        onClose();
                    }}
                >
                    Add Note
                </button>
            </div>
        </div>
    );
};

export default Modal