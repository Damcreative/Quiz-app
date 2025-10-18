import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/">QuizMaster</Link>
        </h1>

        <nav className="space-x-6 text-sm hidden md:block">
          <Link to="/about" className="hover:text-gray-200 transition">About</Link>
          <Link to="/browse" className="hover:text-gray-200 transition">Browse</Link>
          <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
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
          <Link to="/about" className="block hover:text-gray-200 transition">About</Link>
          <Link to="/browse" className="block hover:text-gray-200 transition">Browse</Link>
          <Link to="/login" className="block hover:text-gray-200 transition">Login</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
