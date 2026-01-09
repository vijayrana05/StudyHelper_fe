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

    
    if (!res.ok) {
      
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    
    return data?.answer ?? "No answer found in response.";
  } catch (error) {
  
    console.error("Frontend error calling backend:", error);
    return "AI service is temporarily unavailable. Please try again later.";
  }
}
