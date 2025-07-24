import { useState } from "react";
import { askAi } from "../../features/askAi"; // adjust path as needed

interface AskAiModalProps {
  isOpenAskAi: boolean;
  onCloseAskAi: () => void;
}

export default function AskAiModal({ onCloseAskAi, isOpenAskAi }: AskAiModalProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  if (!isOpenAskAi) return null;

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(""); // clear previous response
    setShowResponse(false); // hide response
    setAnimateIn(false); // reset animation
    try {
      const result = await askAi(prompt);
      setResponse(result);
      setLoading(false);
      // Small delay before showing response for smooth transition
      setTimeout(() => {
        setShowResponse(true);
        // Start animation slightly after showing
        setTimeout(() => setAnimateIn(true), 10);
      }, 300);
    } catch (error) {
      const errorMsg = "An error occurred while asking AI.";
      setResponse(errorMsg);
      setLoading(false);
      setTimeout(() => {
        setShowResponse(true);
        // Start animation slightly after showing
        setTimeout(() => setAnimateIn(true), 10);
      }, 300);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Ask me anything</p>
            </div>
          </div>
          <button
            onClick={onCloseAskAi}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Input Section */}
          <div className="space-y-3 flex flex-col">
            <div className="relative  ">
              <textarea
                className="w-full h-20  border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
                placeholder="Eg - Generate a note on Opearting System"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute bottom-3  right-3">

              </div>
            </div>
            <div className="flex justify-end pr-4">
              <button
                onClick={handleAsk}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-3">
            <div className="relative">
              <div className="min-h-[280px] max-h-[350px] bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-sm text-gray-600">Generating Result...</p>
                    </div>
                  </div>
                ) : (response && showResponse) ? (
                  <div className={`space-y-3 transition-all duration-500 ease-out transform ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">AI Response</span>
                    </div>
                    <div
                      className="prose prose-sm max-w-none leading-relaxed text-gray-800"
                      style={{ lineHeight: '1.6' }}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(response) }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm font-medium">Ready to help!</p>
                      <p className="text-gray-400 text-xs mt-1">Type your question above and hit send</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tip: Use Ctrl/Cmd + Enter for quick send</span>
          </div>
          <span className="text-gray-400">Powered by AI</span>
        </div> */}
      </div>
    </div>
  );
}