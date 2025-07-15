import { FaStar } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { generateHTML, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNotesStore } from "../../store/notesStore";
// import { useNotesStore } from "../../store/notesStore";

function NoteCard({ noteId, title, content, subject, color, fav, createdAt, updatedAt }: { noteId: string; title: string; content: JSONContent; subject: string; color: string; fav: boolean; createdAt: string; updatedAt: string }) {
  const [isFav, SetisFav] = useState(fav)
  const [isOpen, setIsOpen] = useState(false);

  // const notes = useNotesStore((state) => state.notes);
  // console.log("notes lenghth inside notecard is = ",notes.length)

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };
  const createdDate = createdAt.slice(0, 10)
  const updatedDate = updatedAt.slice(0, 10)
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const html = generateHTML(content, [StarterKit, Underline])
  const navigate = useNavigate();
  const toggleFav = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const newFav = !isFav;
      // Optimistic update
      SetisFav(newFav);

      await axios.patch(
        `http://localhost:5000/api/notesRoutes/${noteId}`,
        { fav: newFav },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to update favorite", err);
      // Rollback if error
      SetisFav((prev) => !prev);
    }
  };
  // console.log("color is = ", color)
  return (
    <div style={{ backgroundColor: color }} className={`relative text-black p-4 h-78 rounded-xl   w-full max-w-78 mx-auto`}>
      <p className="text-xs text-gray-600">{createdDate}</p>
      <div className="bg-[rgb(21,21,21)] rounded-full w-8 h-8 flex justify-center items-center absolute top-4 right-4">
        <FaStar className={`text-lg ${isFav ? 'text-yellow-300' : 'text-white'}`} onClick={toggleFav} />

      </div>
      <h3 className="text-xl  pt-3 font-semibold mb-2 mr-4 line-clamp-1">{title}</h3>
      <hr className="border-gray-600 my-2" />
      <p className="text-black font-sans text-sm leading-normal line-clamp-7" dangerouslySetInnerHTML={{ __html: html }} />
      <p className="text-xs absolute bottom-9 left-4 right-16 line-clamp-1 text-gray-800">
        {`Subject - ${subject}`}
      </p>
      <p className="text-xs absolute bottom-4 left-4 right-16 line-clamp-1 text-gray-800">
        Updated at - {updatedDate}
      </p>
      <div className="absolute bottom-4 right-4 flex  items-center space-x-2">
        {/* Action Buttons */}
        <div
          className={`flex  items-center space-x-2 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
            }`}
        >
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
            <MdEdit onClick={() => {
              navigate("/editor", {

                state: {
                  _id: noteId,
                  subject: subject,
                  title: title,
                  content: content
                },
              })
            }} />
          </button>
          <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
            <MdDelete onClick={() => {
              deleteNote(noteId);
            }} />
          </button>
        </div>

        {/* Main FAB Button */}
        <button
          className={`bg-[rgb(21,21,21)] text-white w-10 h-10 rounded-full flex justify-center items-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""
            }`}
          onClick={toggleOptions}
        >
          <VscEdit />
        </button>
      </div>
    </div>
  );
}
export default NoteCard;
/* <VscEdit
          className="text-white text-lg"
          onClick={() =>{
            navigate("/editor", {
            
              state: {
                _id:noteId,
                subject:subject,
                title:title,
                content: content
              },
            })
          }
          }
        /> */
