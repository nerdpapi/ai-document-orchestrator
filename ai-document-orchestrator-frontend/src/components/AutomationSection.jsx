import { useState } from "react";
import { triggerAutomation } from "../services/api";

const AutomationSection = ({ documentText, structuredData, question }) => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAutomation = async () => {
    if (!email) return alert("Enter recipient email");

    try {
      setLoading(true);

      const data = await triggerAutomation({
        documentText,
        structuredData,
        question,
        recipientEmail: email,
      });

      setResult(data);
    } catch (error) {
      alert("Automation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Trigger Email Automation
      </h2>

      <div className="flex gap-3">
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border rounded-xl p-3"
        />

        <button
          onClick={handleAutomation}
          className="px-6 py-3 bg-green-600 text-white rounded-xl"
        >
          {loading ? "Sending..." : "Send Alert Mail"}
        </button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-semibold">Final Analytical Answer</h3>
            <p className="text-gray-700">{result.answer}</p>
          </div>

          <div>
            <h3 className="font-semibold">Email Status</h3>
            <p className="text-gray-700">{result.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationSection;