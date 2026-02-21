import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultsDisplay from "./components/ResultsDisplay";
import AutomationSection from "./components/AutomationSection";

/**
 * Main App Component
 * ------------------
 * Controls:
 * - Structured data
 * - Document text
 * - Question
 * - Automation section visibility
 */

function App() {
  const [structuredData, setStructuredData] = useState(null);
  const [documentText, setDocumentText] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI-Powered Document Orchestrator
        </h1>

        {/* Upload Section */}
        <UploadForm
          setResults={setStructuredData}
          setDocumentText={setDocumentText}
          setQuestion={setQuestion}
        />

        {/* Show only after extraction */}
        {structuredData && (
          <>
            <ResultsDisplay data={structuredData} />

            <AutomationSection
              documentText={documentText}
              structuredData={structuredData}
              question={question}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;