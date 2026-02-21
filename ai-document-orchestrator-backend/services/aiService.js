/**
 * AI Service (Gemini 2.5 Flash - FINAL STABLE)
 */

const axios = require("axios");

const extractStructuredData = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
        },
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error(
      "Gemini Extraction Error:",
      error.response?.data || error.message
    );
    throw new Error("AI extraction failed");
  }
};

module.exports = {
  extractStructuredData,
};
