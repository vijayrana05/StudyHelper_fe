const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://studyhelper-be-1.onrender.com'
  : 'http://localhost:5000';


export async function askAi(prompt: string): Promise<string> {
  try {
    const res = await fetch(`${API_URL}/api/askAiRoutes/ask-ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.answer;
  } catch (error) {
    console.error("Frontend error calling backend:", error);
    return "Error fetching AI response.";
  }
}
