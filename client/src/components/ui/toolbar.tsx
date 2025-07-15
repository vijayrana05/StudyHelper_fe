import { FaBold } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaParagraph } from "react-icons/fa";
import { FaListUl } from "react-icons/fa"; // icon for unordered list
import { FaListOl } from "react-icons/fa"; // icon for ordered list
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { RiAiGenerate2 } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";


import { FaRegSave } from "react-icons/fa";
import { type Editor } from "@tiptap/react";



function Toolbar({ editor, setModalOpen,setAskAiModalOpen,setQueryNotesModalOpen }: { editor: Editor; setModalOpen: any; setAskAiModalOpen:any; setQueryNotesModalOpen:any }) {
    return (
        <div className=" w-full flex justify-center flex-wrap  border-3 rounded-lg p-3 gap-3 ">


            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('bold')
                        ? 'bg-gray-300' // active (selected) state
                        : ' hover:bg-gray-300'
                    }
    disabled:opacity-50`}
            >
                <FaBold />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('italic')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaItalic />

            </button>

            <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('underline')
                    ? 'bg-gray-300 '
                    : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaUnderline />

            </button>

            <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('strike')
                    ? 'bg-gray-300 '
                    : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaStrikethrough />

            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('paragraph')
                        ? ''
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaParagraph />
            </button>




            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('code')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaCode />
            </button>



            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 1 })
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <LuHeading1 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 2 })
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <LuHeading2 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 3 })
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <LuHeading3 />
            </button>


            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('bulletList')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
            >
                <FaListUl />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('orderedList')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            >
                <FaListOl />
            </button>
            <button className="w-10 h-10 text-xl flex items-center justify-center rounded transition  hover:bg-gray-300" onClick={() => {
                setModalOpen(true)
            }}>
                <FaRegSave />
            </button>
            <button className="w-10 h-10 text-xl flex items-center justify-center rounded transition  hover:bg-gray-300" onClick={() => {
                setAskAiModalOpen(true)
            }}>
                <RiAiGenerate2 />
            </button>
            <button className="w-10 h-10 text-xl flex items-center justify-center rounded transition  hover:bg-gray-300" onClick={() => {
                setQueryNotesModalOpen(true)
            }}>
                <AiOutlineFileSearch />
            </button>
        </div>
    );
}


export default Toolbar;