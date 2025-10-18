export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About This App</h1>
      <p className="text-gray-700 max-w-2xl text-center leading-relaxed">
        This quiz app allows users to test their knowledge across various categories and difficulties,
        powered by the Open Trivia Database API. You can review your answers, track your performance,
        and challenge yourself with new questions anytime!
      </p>
    </div>
  );
}
