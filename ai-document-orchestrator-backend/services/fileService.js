/**
 * File Service
 * ------------
 * Responsible for extracting raw text from:
 * - PDF files
 * - TXT files
 */

const fs = require("fs");
const pdfParse = require("pdf-parse");

/**
 * Extract text from uploaded file
 * @param {string} filePath
 * @param {string} fileType
 */
const extractTextFromFile = async (filePath, fileType) => {
  try {
    if (fileType === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    }

    if (fileType === ".txt") {
      return fs.readFileSync(filePath, "utf-8");
    }

    throw new Error("Unsupported file type");
  } catch (error) {
    console.error("Error extracting text:", error);
    throw error;
  }
};

/**
 * IMPORTANT: Proper export
 */
module.exports = {
  extractTextFromFile,
};
