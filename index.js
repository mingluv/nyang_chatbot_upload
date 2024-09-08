import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const ROLE_PROMPT = process.env.ROLE_PROMPT;

app.post('/bot/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log('Requested message:', userMessage);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: { text: ROLE_PROMPT } },
      contents: { parts: [{ text: userMessage }] }
    }),
  };

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, requestOptions);
    const data = await response.json();
    console.log('Gemini API Response:', data.candidates[0].content);
    if (!response.ok) throw new Error(data.error.message);
    res.json({ response: data.candidates[0].content.parts[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
