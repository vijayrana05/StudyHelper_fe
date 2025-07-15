export async function searchAi(noteId: string, query: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:5000/api/queryNotesRoutes/searchNote", {
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
