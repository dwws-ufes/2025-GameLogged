import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthViewModel } from '../../authentication/viewModels/AuthViewModel';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const authViewModel = new AuthViewModel();

    const auth = authViewModel.isAuthenticated();
    setIsAuthenticated(auth);

    if (auth) {
      const fetchNickname = async () => {
        try {
          const name = await authViewModel.getUserNickname();
          setNickname(name);
        } catch {
          setNickname(null);
        }
      };
      fetchNickname();
    } else {
      setNickname(null);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        {isAuthenticated && nickname ? `Welcome, ${nickname}` : ''}
      </h1>
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