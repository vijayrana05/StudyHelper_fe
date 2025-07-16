import { useState } from "react";
import { searchAi } from "../../features/queryNotes";

interface queryNotesModalProps {
  isOpenQueryNotes: boolean;
  onCloseQueryNotes: () => void;
  noteId:string
}

export default function QueryNotesModal({ onCloseQueryNotes, isOpenQueryNotes,noteId }: queryNotesModalProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpenQueryNotes) return null;

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(""); // clear previous response
    try {
      const result = await searchAi(noteId,query);
      setResponse(result);
    } catch (error) {
      setResponse("An error occurred while asking AI.");
    } finally {
      setLoading(false);
    }
  };

  // Function to convert markdown to HTML
  const renderMarkdown = (text: string) => {
    if (!text) return "";
    
    let html = text
      // Remove multiple consecutive line breaks first
      .replace(/\n\s*\n/g, '\n')
      // Convert headers (## becomes h2, ### becomes h3, etc.)
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-2 mb-1">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-2 mb-1">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-2 mb-1">$1</h1>')
      // Convert bold text (**text** becomes <strong>) - do this before list processing
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Convert sub-list items (*** item becomes nested <li>)
      .replace(/^ +\*\*\*(.*$)/gm, '<li class="ml-8 list-disc list-inside">$1</li>')
      // Convert main list items (* item becomes <li>)
      .replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc list-inside">$1</li>')
      // Convert numbered lists (1. item becomes <li>)
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal list-inside">$1</li>')
      // Clean up any remaining standalone asterisks that might be formatting artifacts
      .replace(/\*+/g, '')
      // Convert single line breaks to <br> but remove extra spaces
      .replace(/\n/g, '<br>')
      // Clean up multiple <br> tags
      .replace(/(<br>\s*){2,}/g, '<br>');
    
    return html;
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Ask AI</h2>

        {/* Output Box */}
        <div className="h-60 bg-gray-100 border rounded-lg p-4 overflow-y-auto text-sm">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : response ? (
            <div 
              className="prose prose-sm max-w-none leading-tight"
              style={{ lineHeight: '1.4' }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(response) }}
            />
          ) : (
            <div className="text-gray-500">AI response will appear here...</div>
          )}
        </div>

        {/* Input Box */}
        <textarea
          className="w-full h-20 border rounded-md p-3 resize-none focus:outline-none"
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={handleAsk}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>
          <button
            onClick={onCloseQueryNotes}
            className="text-gray-500 hover:text-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}