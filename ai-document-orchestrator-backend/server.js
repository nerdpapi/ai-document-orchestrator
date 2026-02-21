/**
 * Main Entry Point of the Backend Server
 * ---------------------------------------
 * Responsibilities:
 * - Initialize Express app
 * - Configure middleware
 * - Register routes
 * - Start server
 */

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

/**
 * Middleware Configuration
 */
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse incoming JSON payloads

/**
 * Routes
 */
app.use("/api/documents", documentRoutes);

/**
 * Health Check Route
 */
app.get("/", (req, res) => {
  res.send("AI Document Orchestrator Backend is running...");
});

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
