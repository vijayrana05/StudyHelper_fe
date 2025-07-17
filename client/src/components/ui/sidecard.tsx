import { type JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import React from "react";

interface SideCardProps {
    noteId: string;
    title: string;
    content: JSONContent;
    subject: string;
    color: string;
    fav: boolean;
    createdAt: string;
    updatedAt: string;
    // isSelected?: boolean;
}

function SideCard({
    noteId,
    title,
    content,
    subject,
    color,
    fav,
    createdAt,
    // updatedAt,
    // isSelected = false
}: SideCardProps) {

    const navigate = useNavigate();
    createdAt = createdAt.slice(0, 10)
    // const updatedDate = updatedAt.slice(0, 10)
    const [isSelected,setIsSelected] = useState(false)
    // Memoize HTML generation since it's expensive
    const html = useMemo(() => {
        return generateHTML(content, [StarterKit, Underline]);
    }, [content]);
    
    // Memoize the navigation state object
    const navigationState = useMemo(() => ({
        _id: noteId,
        title: title,
        subject: subject,
        sideCardSelected: true,
        content: content
    }), [noteId, subject, title, content]);

    // Memoize the click handler
    const handleClick = useCallback(() => {
        console.log("navigate memeo sidecard")
        navigate("/editor", { state: navigationState });
    }, [navigate, navigationState]);

    return (
        <div
            onClick={() => {
                setIsSelected(!isSelected)
                handleClick()
            }}
            style={{ backgroundColor: color }}
            className={`group relative text-black p-5 h-58 rounded-2xl shadow-lg max-w-64 mx-auto cursor-pointer 
                     hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out
                     backdrop-blur-sm border border-black/10`}
        >
            {/* Date - keeping original position */}
            <p className="text-xs text-gray-700 font-medium">
                {createdAt}
                {fav && <span className="ml-2 text-yellow-600">⭐</span>}
            </p>

            {/* Title - keeping original styling */}
            <h3 className="text-xl pt-1 font-bold mb-2 line-clamp-1 text-gray-900 group-hover:text-gray-800 transition-colors">
                {title}
            </h3>

            {/* Enhanced divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent my-2"></div>

            {/* Content - keeping original structure */}
            <p
                className="text-black font-sans text-sm leading-normal line-clamp-4 group-hover:text-gray-800 transition-colors"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Subject - keeping exact original position */}
            <p className="text-xs absolute bottom-6 left-4 right-16 line-clamp-2 text-gray-800 font-medium">
                Subject - {subject}
            </p>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
            
            {/* Corner accent */}
            {/* <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-bl-full rounded-tr-2xl"></div> */}
        </div>
    );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(SideCard);