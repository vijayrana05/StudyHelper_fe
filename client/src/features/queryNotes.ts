const API_URL = "https://studyhelper-be-1.onrender.com";


export async function searchAi(noteId: string, query: string): Promise<string> {
  try {
    const res = await fetch(`${API_URL}/api/queryNotesRoutes/searchNote`, {
      method: "POST", // ✅ Changed to POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId, query }), // ✅ Now valid
    });

    const data = await res.json();
    return data.answer;
  } catch (error) {
    console.error("Frontend error calling backend:", error);
    return "Error fetching AI response.";
  }
}
