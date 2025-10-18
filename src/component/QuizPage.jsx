import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ State declarations
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Get query parameters
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const difficulty = params.get("difficulty");
  const amount = params.get("amount") || 5;

  // ✅ Fetch quiz data
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
  }, [category, difficulty, amount]);

  // ✅ Handle next question
  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selected === currentQuestion.correct;

    // Save this question’s result
    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected,
        correct: currentQuestion.correct,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelected("");
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  // ✅ Loading state
  if (loading) {
    return <div className="text-center text-xl mt-10">Loading questions...</div>;
  }

  // ✅ Completed state (with review)
  if (completed) {
    const handleRetakeQuiz = () => {
      navigate(`/quiz?category=${category}&difficulty=${difficulty}&amount=${amount}`);
    };

      // ✅ Save quiz history to localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    const newRecord = {
      category,
      difficulty,
      score,
      total: questions.length,
      date: new Date().toLocaleString(),
    };

    // Save updated array
    localStorage.setItem("quizHistory", JSON.stringify([newRecord, ...history]));
  }, []); // Runs once when quiz completes

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Quiz Completed!</h2>
        <p className="text-lg mb-6 text-center">
          Your score: <span className="font-semibold">{score}</span> / {questions.length}
        </p>

        {/* ✅ Answers Review */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Review Your Answers</h3>
          <ul className="space-y-4">
            {answers.map((ans, index) => (
              <li
                key={index}
                className={`border rounded-lg p-4 ${
                  ans.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
                }`}
              >
                <p
                  className="font-medium text-gray-800"
                  dangerouslySetInnerHTML={{ __html: `${index + 1}. ${ans.question}` }}
                />
                <p className="mt-2 text-sm">
                  <strong>Your Answer:</strong>{" "}
                  <span
                    className={ans.isCorrect ? "text-green-700" : "text-red-700"}
                    dangerouslySetInnerHTML={{ __html: ans.selected }}
                  />
                </p>
                {!ans.isCorrect && (
                  <p className="mt-1 text-sm">
                    <strong>Correct Answer:</strong>{" "}
                    <span
                      className="text-green-700"
                      dangerouslySetInnerHTML={{ __html: ans.correct }}
                    />
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleRetakeQuiz}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Retake Quiz
          </button>
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

  // ✅ Quiz in progress
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
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
