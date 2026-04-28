import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, system } = req.body;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620", // El modelo más potente
      max_tokens: 1024,
      system: system || "Eres un asistente amable.", // Usa el perfil que enviamos
      messages: [
        ...history, // Incluye el historial anterior
        { role: "user", content: message } // El mensaje nuevo
      ],
    });

    res.status(200).json({ reply: response.content[0].text });
  } catch (error) {
    console.error('Error de Claude:', error);
    res.status(500).json({ reply: 'Lo siento, ha habido un error interno.' });
  }
}
