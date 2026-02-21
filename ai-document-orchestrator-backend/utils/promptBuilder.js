/**
 * Prompt Builder Utility (Enhanced Version)
 * ------------------------------------------
 * Builds a structured extraction prompt with:
 * - Context awareness
 * - Strict JSON enforcement
 * - Hallucination prevention
 * - Business-focused key-value extraction
 */

const buildExtractionPrompt = (documentText, userQuestion) => {
  return `
You are a senior business document intelligence system.

OBJECTIVE:
Analyze the document and extract structured information strictly relevant to the user's question.

USER QUESTION:
"${userQuestion}"

DOCUMENT CONTENT:
"""
${documentText}
"""

INSTRUCTIONS:

1. Identify 5 to 8 highly relevant key-value pairs directly related to the user's question.
2. Extract only factual information explicitly present in the document.
3. Do NOT infer, assume, or hallucinate missing information.
4. If information is not available, omit it.
5. Keys must be concise, professional, and business-relevant.
6. Values must be precise and directly copied or clearly derived from the document.
7. Return ONLY valid JSON.
8. Do NOT include explanations, markdown formatting, or extra text.

STRICT OUTPUT FORMAT:
{
  "Relevant Key 1": "Exact Value",
  "Relevant Key 2": "Exact Value"
}

IMPORTANT:
- Output must be parseable JSON.
- Do not include trailing commas.
- Do not wrap JSON in markdown.
`;
};

module.exports = { buildExtractionPrompt };