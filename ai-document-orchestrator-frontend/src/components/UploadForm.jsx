import { useState } from "react";
import { uploadDocument } from "../services/api";

/**
 * Premium UploadForm Component
 * ----------------------------
 * Added:
 * - Remove uploaded file function
 * - File chip UI
 * - Auto reset logic
 */

const UploadForm = ({ setResults }) => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle file removal
   */
  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    setResults(null); // clear previous extracted data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !question) {
      setError("Please upload a document and enter your analytical question.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await uploadDocument(file, question);
      setResults(data.structuredData);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Document Analysis
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block font-medium mb-3 text-gray-700">
            Upload Document
          </label>

          {!file && (
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 transition bg-gray-50">
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />

              <div className="text-center">
                <p className="text-gray-500">
                  Drag & drop your file here or
                </p>
                <span className="text-blue-600 font-medium">
                  browse files
                </span>
                <p className="text-sm text-gray-400 mt-2">
                  Supported formats: PDF, TXT
                </p>
              </div>
            </label>
          )}

          {/* File Chip */}
          {file && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-2">
              <span className="text-blue-700 text-sm font-medium truncate">
                📎 {file.name}
              </span>

              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Question Input */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Analytical Question
          </label>
          <input
            type="text"
            placeholder="e.g., What is the total payable amount?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Submit Button (Right Aligned Premium Style) */}
        <div className="flex justify-center">
  <button
    type="submit"
    disabled={loading}
    className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
    }`}
  >
    {loading ? "Processing..." : "Extract Insights"}
  </button>
</div>
      </form>
    </div>
  );
};

export default UploadForm;
