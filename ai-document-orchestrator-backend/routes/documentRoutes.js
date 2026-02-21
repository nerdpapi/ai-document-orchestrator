/**
 * Document Routes
 * ---------------
 * Defines API endpoints for:
 * - Document upload + AI extraction
 * - Triggering n8n automation
 */

const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");

// ✅ Import BOTH controller functions
const {
  handleDocumentUpload,
  triggerAutomation,
} = require("../controllers/documentController");

/**
 * POST /api/documents/upload
 * Handles:
 * - File upload
 * - AI structured extraction
 */
router.post("/upload", upload.single("file"), handleDocumentUpload);

/**
 * POST /api/documents/trigger-automation
 * Handles:
 * - Sending extracted data to n8n
 * - Receiving automation response
 */
router.post("/trigger-automation", triggerAutomation);

module.exports = router;