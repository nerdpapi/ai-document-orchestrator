/**
 * Prompt Builder Utility
 * -----------------------
 * Builds a structured prompt to instruct AI
 * to extract 5–8 relevant key-value pairs
 * related to user's question.
 */

const buildExtractionPrompt = (documentText, userQuestion) => {
    return `
  You are an intelligent document analysis assistant.
  
  USER QUESTION:
  "${userQuestion}"
  
  DOCUMENT CONTENT:
  """
  ${documentText}
  """
  
  TASK:
  1. Identify the 8 to 10 most relevant key-value pairs related to the user's question.
  2. Return strictly in valid JSON format.
  3. Do NOT add explanation text.
  4. Keys must be meaningful and business-relevant.
  
  Example format:
  {
    "Key 1": "Value",
    "Key 2": "Value"
  }
  `;
  };
  
  module.exports = { buildExtractionPrompt };
  
