import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState(""); // new state
  const navigate = useNavigate();

  // Category IDs from the Open Trivia Database
  const categories = [
    { name: "General Knowledge", id: 9 },
    { name: "Science", id: 17 },
    { name: "Entertainment", id: 11 },
    { name: "Sports", id: 21 },
  ];

  const handleStartQuiz = () => {
    if (!category) {
      alert("Please select a category before starting the quiz!");
      return;
    }
    navigate(`/quiz?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">QuizMaster</h1>

          <nav className="space-x-6 text-sm hidden md:block">
            <a href="#" className="hover:text-gray-200 transition">About</a>
            <a href="#" className="hover:text-gray-200 transition">Browse</a>
            <a href="#" className="hover:text-gray-200 transition">Login</a>
          </nav>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-green-700 px-6 py-3 space-y-2 text-sm">
            <a href="#" className="block hover:text-gray-200 transition">About</a>
            <a href="#" className="block hover:text-gray-200 transition">Browse</a>
            <a href="#" className="block hover:text-gray-200 transition">Login</a>
          </div>
        )}
      </header>

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

          {/* Start Quiz Button */}
          <button
            onClick={handleStartQuiz}
            className="w-full lg:w-56 h-12 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Start Quiz
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
