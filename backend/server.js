const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/getYogaSuggestions', async (req, res) => {
  try {
    const { userData } = req.body;

    const promptParts = userData.map(q => `${q.question}: ${q.answer}`).join(', ');
    const prompt = `Based on the following information: ${promptParts}, suggest 3 suitable yoga poses for the user. Return result as JSON format with the fields: name, description, difficulty level, and benefits.`;


    // Example Gemini API call (replace with your actual API call details)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // res.json("hello world")

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Gemini AI response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
