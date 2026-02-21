/**
 * n8n Service
 * -----------
 * Sends POST request to n8n webhook
 */

const axios = require("axios");

/**
 * Trigger n8n Cloud Workflow
 */
const triggerN8nWorkflow = async (payload) => {
  try {
    const response = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("n8n Cloud Error:", error.response?.data || error);
    throw new Error("n8n automation failed");
  }
};

module.exports = { triggerN8nWorkflow };