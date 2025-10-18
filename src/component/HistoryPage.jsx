import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(saved);
  }, []);

  if (history.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No Quiz History Yet</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Quiz History</h2>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <ul className="divide-y divide-gray-200">
          {history.map((item, index) => (
            <li key={index} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">
                    {item.category || "General"} - {item.difficulty || "Any"}
                  </p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <p className="text-green-600 font-bold">
                  {item.score}/{item.total}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default HistoryPage;
