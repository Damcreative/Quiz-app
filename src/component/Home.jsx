import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState(""); // NEW
  const [numQuestions, setNumQuestions] = useState(10); // NEW
  const navigate = useNavigate();

  // Category IDs from the Open Trivia Database
  const categories = [
    { name: "General Knowledge", id: 9 },
    { name: "Science", id: 17 },
    { name: "Entertainment", id: 11 },
    { name: "Sports", id: 21 },
  ];

  const handleStartQuiz = () => {
    if (!category || !difficulty || !numQuestions) {
      alert("Please select all options before starting the quiz!");
      return;
    }

    // Pass all selected values to quiz route
    navigate(`/quiz?category=${category}&difficulty=${difficulty}&amount=${numQuestions}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-center flex-grow px-6 pt-28 pb-16">
        <div className="max-w-xl w-full text-center lg:text-left space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Test your knowledge in minutes!
          </h2>
          <p className="text-gray-600 text-lg">
            Pick a topic and start your quiz journey today.
          </p>

          {/* Category Select */}
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Difficulty Select — NEW */}
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Number of Questions Select — NEW */}
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          >
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>

          {/* Start Quiz Button */}
          <button
            onClick={handleStartQuiz}
            className="w-full lg:w-56 h-12 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 mr-4"
          >
            Start Quiz
          </button>

          <button
            onClick={() => navigate("/history")}
            className="w-full lg:w-56 h-12 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 mr-4"
          >
            View Quiz History
          </button>
        </div>

        {/* Right Illustration */}
        <div className="mt-10 lg:mt-0 lg:ml-16">
          <div className="w-80 h-80 bg-green-100 rounded-2xl flex items-center justify-center text-green-400 font-bold text-xl">
            📘 Illustration
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
