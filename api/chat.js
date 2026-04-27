export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres el asistente del portfolio de Victoria. Respondes corto, claro y profesional.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}
