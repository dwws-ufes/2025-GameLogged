function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to GameLogged</h1>
      <p className="text-lg mb-8">Your gaming journey starts here!</p>
      <a
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Get Started
      </a>
    </div>
  );
}

export default HomePage;