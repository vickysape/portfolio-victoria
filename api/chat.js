export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // Debug útil en caso de fallo
    console.log("Claude response:", data);

    const reply =
      data?.content?.[0]?.text ||
      "No he podido generar respuesta";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    return res.status(500).json({
      reply: "Error interno en el chatbot. Revisa Vercel logs."
    });
  }
}
