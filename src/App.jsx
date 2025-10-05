import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import QuizPage from "./component/QuizPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
