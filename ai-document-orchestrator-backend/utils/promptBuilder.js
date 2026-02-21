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
  1. Identify 5 to 8 highly relevant key-value pairs directly related to the user's question.
2. Extract only factual information explicitly present in the document.
3. Do NOT infer, assume, or hallucinate missing information.
4. If information is not available, omit it.
5. Keys must be concise, professional, and business-relevant.
6. Values must be precise and directly copied or clearly derived from the document.
7. Return ONLY valid JSON.
8. Do NOT include explanations, markdown formatting, or extra text.
  
  Example format:
  {
    "Key 1": "Value",
    "Key 2": "Value"
  }
  `;
  };
  
  module.exports = { buildExtractionPrompt };
  
