export async function askAi(prompt: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:5000/api/askAiRoutes/ask-ai", {
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
