import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";


import '../App.css'
const extensions = [
    StarterKit,
    Underline
    // ✅ this fixes your issue
];

let content = "fjjjr"
export function EditorPageTesting() {
    
    console.log("rendered")
    

    const editor = useEditor({
        extensions,
        content
    })
    if (!editor) {
        return null;
    }


    return (<div>
        <div className="flex">
            <div className=" border-r-2 border-gray-200  min-h-screen   hidden min-w-25 lg:block">
            </div>
            <div className="bg-[rgb(247,247,247)] hidden lg:block min-h-screen min-w-78 ">
                <div className="p-5 px-7 pt-14 space-y-6">
                   
                </div>
            </div>
            <div className=" max-w-5xl w-full p-2 rounded-lg shadow-md">
                
                <div className=" rounded-lg   mt-6 ">
                    <EditorContent editor={editor} className="tiptap min-h-130 pl-10  pt-3 cursor-white  overflow-y-scroll " />
                </div>

            </div>
        </div>

    </div>)
}


export default EditorPageTesting