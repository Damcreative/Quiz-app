import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import QuizPage from "./component/QuizPage"; // ✅ correct import
import HistoryPage from "./component/HistoryPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} /> {/* ✅ fixed */}
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
