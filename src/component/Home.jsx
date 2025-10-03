function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-end items-center p-6 space-x-6">
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-green-600">About</a>
          <a href="#" className="hover:text-green-600">Browse</a>
          <a href="#" className="hover:text-green-600">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          
          {/* Left: Hero content */}
          <div className="flex flex-col max-w-xl space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900">QuizMaster</h1>
            <p className="text-lg text-gray-600">
              Test your knowledge in minutes — pick a topic and start.
            </p>

            {/* Category Select */}
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option>Select a topic</option>
              <option>General Knowledge</option>
              <option>Science</option>
              <option>Entertainment</option>
              <option>Sports</option>
            </select>

            {/* Start Quiz CTA */}
            <button 
              className="w-full lg:w-56 h-12 bg-green-600 text-white font-semibold rounded-lg 
                         hover:bg-green-700 transition"
            >
              Start Quiz
            </button>
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:flex justify-center">
            <div className="w-80 h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Illustration
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
