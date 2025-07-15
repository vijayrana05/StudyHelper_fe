import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

import { IoHome } from "react-icons/io5";


function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="flex justify-center  min-h-screen relative pt-10">
            {/* Floating Action Button */}
            <motion.div
                className="flex items-center justify-center bg-black rounded-full w-14 h-14 cursor-pointer z-10"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FiPlus className="text-3xl text-white" />
            </motion.div>

            {/* New Note Option */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-10 w-12 h-12 flex items-center justify-center bg-[rgb(254,201,113)] rounded-full shadow-md"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 90, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="text-2xl flex items-center justify-center">
                            <MdNoteAdd onClick={() => {
                                navigate("/editor")
                            }} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-10 w-12 h-12 flex items-center justify-center bg-[rgb(221,232,140)] rounded-full shadow-md"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 160, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button className="text-2xl flex items-center justify-center">
                            <IoHome onClick={() => {
                                navigate('/home')
                            }} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-10 w-12 h-12 flex items-center justify-center bg-[rgb(254,228,105)] rounded-full shadow-md"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 230, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.7 }}
                    >
                        <button className="text-2xl flex items-center justify-center">
                            <FaRegStar />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SideBar;
