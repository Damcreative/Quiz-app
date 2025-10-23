import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import QuizPage from "./component/QuizPage";
import About from "./component/AboutPage";
import Browse from "./component/BrowsePage";
import Login from "./component/LoginPage";
import Header from "./component/Header"; // ✅ import header
import HistoryPage from "./component/HistoryPage";

function App() {
  return (
    <Router>
      <Header /> {/* ✅ show header on all pages */}
      <div className="pt-20"> {/* ✅ add top padding so header doesn’t overlap content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
