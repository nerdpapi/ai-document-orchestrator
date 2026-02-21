/**
 * Upload Middleware
 * -----------------
 * Handles file upload using multer.
 * Accepts only PDF and TXT files.
 */

const multer = require("multer");
const path = require("path");

// Configure storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files inside uploads folder
  },
  filename: function (req, file, cb) {
    // Add timestamp to avoid file name conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only PDF and TXT files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".txt"];

  const fileExt = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and TXT files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
