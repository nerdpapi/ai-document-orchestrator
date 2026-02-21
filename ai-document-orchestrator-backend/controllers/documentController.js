/**
 * Document Controller
 * -------------------
 * Handles:
 * - File upload
 * - Text extraction
 * - AI structured extraction
 * - Triggering n8n automation
 */

const path = require("path");
const fs = require("fs");

const { extractTextFromFile } = require("../services/fileService");
const { buildExtractionPrompt } = require("../utils/promptBuilder");
const { extractStructuredData } = require("../services/aiService");
const { triggerN8nWorkflow } = require("../services/n8nService");

/**
 * Upload + AI Extraction
 */
const handleDocumentUpload = async (req, res) => {
  try {
    const file = req.file;
    const { question } = req.body;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const filePath = file.path;
    const fileExt = path.extname(file.originalname).toLowerCase();

    /**
     * Step 1: Extract raw text from PDF or TXT
     */
    const documentText = await extractTextFromFile(filePath, fileExt);

    /**
     * Step 2: Build AI structured extraction prompt
     */
    const prompt = buildExtractionPrompt(documentText, question);

    /**
     * Step 3: Call AI API for structured JSON extraction
     */
    const structuredData = await extractStructuredData(prompt);

    /**
     * Optional: Delete file after processing
     */
    fs.unlinkSync(filePath);

    /**
     * Return structured data + documentText
     * documentText is required for automation phase
     */
    return res.status(200).json({
      success: true,
      structuredData,
      documentText, //  Important for Phase 3
    });
  } catch (error) {
    console.error("Document Processing Error:", error);
    return res.status(500).json({ error: "Document processing failed" });
  }
};

/**
 * Trigger n8n Automation
 */
const triggerAutomation = async (req, res) => {
  try {
    const {
      documentText,
      structuredData,
      question,
      recipientEmail,
    } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({ error: "Recipient email is required" });
    }

    /**
     * Send payload to n8n Cloud webhook
     */
    const n8nResponse = await triggerN8nWorkflow({
      documentText,
      structuredData,
      question,
      recipientEmail,
    });

    return res.status(200).json(n8nResponse);
  } catch (error) {
    console.error("Automation Error:", error);
    return res.status(500).json({ error: "Automation failed" });
  }
};

module.exports = {
  handleDocumentUpload,
  triggerAutomation,
};