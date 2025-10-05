import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  // Sample questions for now — we’ll make them dynamic later
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      correct: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Jane Austen"],
      correct: "William Shakespeare",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();
  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selected === currentQuestion.correct) {
      setScore(score + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected("");
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setCompleted(false);
    setSelected("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {!completed ? (
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p className="text-lg mb-6">{currentQuestion.question}</p>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`w-full border rounded-lg py-2 px-4 text-left transition 
                  ${
                    selected === option
                      ? "bg-green-100 border-green-400"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selected}
            className={`w-full h-12 rounded-lg text-white font-semibold transition
              ${
                selected
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed 🎉</h2>
          <p className="text-lg mb-6">
            You scored <strong>{score}</strong> out of {questions.length}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Restart
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
