import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { convertMarkdownToTiptapJson } from "../../features/markdown";
import { usePdfStore } from "../../store/pdfStore";
import { FaFilePdf } from "react-icons/fa";


function PdfUpload() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploadPdf } = usePdfStore();
    
    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            try {
                await uploadPdf(selectedFile);

                // Get the summary directly from the store after upload
                const { summary } = usePdfStore.getState();

                if (summary) {
                    const content = convertMarkdownToTiptapJson(summary);

                    // Navigate immediately like NoteCard does
                    navigate('/editor', {
                        state: {
                            _id: null,
                            title: "Nothing",
                            subject: "Imported PDF",
                            content: content,
                        },
                    });
                }
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    return (
        <div className="sm:w-45 sm:h-45 w-30 h-30 border-4 text-right flex justify-center items-center rounded-3xl border-dashed">
            {/* Hidden file input */}
            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Icon that triggers file input */}
            <FaFilePdf
                className="sm:text-8xl text-6xl cursor-pointer"
                onClick={handleIconClick}
            />
        </div>
    );
}

export default PdfUpload;