import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; 
import Header from './Header'
import { AuthController } from '../../authentication/controllers/AuthController';

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authController = AuthController.getInstance();
    const auth = authController.isAuthenticated();
    setIsAuthenticated(auth);

    if (auth) {
      const fetchNickname = async () => {
        try {
          const name = await authController.getUserNickname();
          setNickname(name);
        } catch {
          navigate('/');
        }
      };
      fetchNickname();
    }else{
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header isAuthenticated={isAuthenticated} nickname={nickname} />
      <main className='mt-20'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;