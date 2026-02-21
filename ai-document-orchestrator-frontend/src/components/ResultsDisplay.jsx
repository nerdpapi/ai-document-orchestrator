/**
 * ResultsDisplay Component
 * ------------------------
 * Displays structured JSON in table format
 */

const ResultsDisplay = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Structured Data Extracted
        </h2>
  
        <table className="w-full border-collapse">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="border-b">
                <td className="py-2 font-medium w-1/3">{key}</td>
                <td className="py-2 text-gray-700">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ResultsDisplay;
  