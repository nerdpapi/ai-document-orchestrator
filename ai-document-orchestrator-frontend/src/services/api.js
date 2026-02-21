/**
 * API Service Layer
 * -----------------
 * Handles communication with backend
 */

export const uploadDocument = async (file, question) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);
  
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/documents/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to process document");
    }
  
    return response.json(); 
  };
  
  export const triggerAutomation = async (payload) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/documents/trigger-automation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
  
    if (!response.ok) {
      throw new Error("Automation failed");
    }
  
    return response.json();
  };