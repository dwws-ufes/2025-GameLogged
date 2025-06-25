import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Header'
import { AuthViewModel } from '../../authentication/viewModels/AuthViewModel';

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);

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
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header isAuthenticated={isAuthenticated} nickname={nickname} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;