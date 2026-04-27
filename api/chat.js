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
              "Eres el asistente del portfolio de Victoria. Respondes claro, breve y profesional.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        error: "OpenAI no devolvió respuesta válida",
        debug: data,
      });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error en servidor",
    });
  }
}
