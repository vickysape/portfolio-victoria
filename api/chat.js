export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
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

        max_tokens: 500,

        temperature: 0.7,

        system: `
Eres un asistente integrado en el portfolio de Victoria Sapelli.
Tu función es ayudar a los usuarios que visitan su web.

Reglas:
- Responde de forma clara, profesional y breve.
- Puedes hablar de su experiencia, proyectos y habilidades.
- Si preguntan por CV, experiencia o contacto, guía al usuario.
- Mantén un tono moderno, tech y profesional.
`,

        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API error:", data);
      return res.status(500).json({
        reply: "Error en la respuesta del modelo IA."
      });
    }

    const reply =
      data?.content?.[0]?.text ||
      "No he podido generar respuesta.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      reply: "Error interno del servidor."
    });
  }
}
