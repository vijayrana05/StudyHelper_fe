import { create } from 'zustand';
import axios from 'axios';

interface PdfStore {
    // title: String | null
    summary: string | null;
    loading: boolean;
    error: string | null;
    uploadPdf: (file: File) => Promise<void>;
}

export const usePdfStore = create<PdfStore>((set) => ({
    // title: null,
    summary: null,
    loading: false,
    error: null,

    uploadPdf: async (file: File) => {
        set({ loading: true, error: null });

        try {
            const formData = new FormData();
            formData.append('file', file);
            const token = localStorage.getItem("authToken");

            const res = await axios.post(
                'http://localhost:5000/api/uploadRoutes/upload', // adjust based on your backend route
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`// if using auth
                    },
                }
            );

            set({ summary: res.data.summary, loading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.error || 'Upload failed', loading: false });
        }
    },
}));
