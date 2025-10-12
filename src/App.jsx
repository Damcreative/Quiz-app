import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import QuizPage from "./component/QuizPage"; // ✅ correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} /> {/* ✅ fixed */}
      </Routes>
    </Router>
  );
}

export default App;
