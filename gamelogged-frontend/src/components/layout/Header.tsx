import React from 'react';


interface HeaderProps {
  isAuthenticated: boolean;
  nickname: string | null;
}

function Header({ isAuthenticated, nickname }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <a>GameLogged</a> 
        </div>
        <div className="text-md">
          {isAuthenticated && nickname ? (
            <span>Bem vindo, <span className="font-semibold">{nickname}</span>!</span>
          ) : (
            <a href="/" className="hover:text-blue-500">Login</a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;