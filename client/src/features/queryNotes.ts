const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://studyhelper-be-1.onrender.com'
  : 'http://localhost:5000';

export async function searchAi(noteId: string, query: string): Promise<string> {
  try {
    const res = await fetch(`${API_URL}/api/queryNotesRoutes/searchNote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId, query }),
    });

    // Optionally check for successful HTTP status
    if (!res.ok) {
      // You can specifically handle 503, 500, etc here if needed
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    // Defensive: Check the structure of the response before access
    return data?.answer ?? "No answer found in response.";
  } catch (error) {
    // Optionally you can log error.message or error.stack here
    console.error("Frontend error calling backend:", error);
    return "AI service is temporarily unavailable. Please try again later.";
  }
}
