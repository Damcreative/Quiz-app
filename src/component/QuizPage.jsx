import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract all query parameters from URL
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const difficulty = params.get("difficulty"); // ✅ NEW
  const amount = params.get("amount") || 5; // ✅ NEW (default 5)

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch quiz questions dynamically
  useEffect(() => {
    if (!category) return;

    setLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          correct: q.correct_answer,
        }));
        setQuestions(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, difficulty, amount]); // ✅ add all dependencies

  const handleNext = () => {
    if (selected === questions[currentIndex].correct) {
      setScore(score + 1);
    }
    setSelected("");
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading questions...</div>;
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
        <p className="text-lg mb-6">
          Your score: {score}/{questions.length}
        </p>
        <button
          onClick={handleRestart}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <p
          className="text-lg mb-6 text-gray-800"
          dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }}
        />
        <div className="space-y-3">
          {questions[currentIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(option)}
              className={`w-full border px-4 py-2 rounded-lg text-left ${
                selected === option
                  ? "bg-green-200 border-green-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className={`mt-6 w-full py-3 rounded-lg text-white font-semibold ${
            selected
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {currentIndex + 1 === questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;

