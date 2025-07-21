import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

interface SideBarProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
}

function SideBar({ setIsSidebarOpen }: SideBarProps = {}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        // Also update parent sidebar state if on mobile
        if (setIsSidebarOpen) {
            setIsSidebarOpen(!isMenuOpen);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        // Close sidebar on mobile after navigation
        if (setIsSidebarOpen) {
            setIsSidebarOpen(false);
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="flex justify-center min-h-screen relative pt-10">
            {/* Floating Action Button */}
            <motion.div
                className="flex items-center justify-center bg-black rounded-full lg:w-14 lg:h-14 md:w-13 md:h-13 h-10 w-10 cursor-pointer z-10"
                animate={{ rotate: isMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleMenuToggle}
            >
                <FiPlus className="text-3xl text-white " />
            </motion.div>

            {/* New Note Option */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="absolute top-10 w-12 h-12  flex items-center justify-center bg-[rgb(254,201,113)] rounded-full shadow-md"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 90, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="text-2xl flex items-center justify-center">
                            <MdNoteAdd onClick={() => handleNavigation("/editor")} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Home Option */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="absolute top-10 w-12 h-12 flex items-center justify-center bg-[rgb(221,232,140)] rounded-full shadow-md"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 160, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button className="text-2xl flex items-center justify-center">
                            <IoHome onClick={() => handleNavigation('/home')} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Favorites Option */}
            <AnimatePresence>
                {isMenuOpen && (
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