import React, { useState, useEffect } from 'react';

import { Settings, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';
import {AuthController} from "@/authentication/controllers/AuthController.ts";
import {AuthStateService} from "@/authentication/services/AuthStateService.ts";
import {useNavigate} from "react-router-dom";

type Theme = 'light' | 'dark';

interface HeaderProps {
  isAuthenticated: boolean;
  nickname: string | null;
}


function Header({ isAuthenticated, nickname }: HeaderProps) {
  const authController = AuthController.getInstance();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const redirectToHome = () => {
    navigate('/');
  }

  const logout = () => {
    authController.logout();
    navigate('');
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/perfil');
    }
  }
  return (
    <header className="block bg-transparent absolute border-box top-0 w-full z-50">
      <nav className="border-none z-15 bg-transparent mx-15 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <a onClick={redirectToHome} className='cursor-pointer'>GameLogged</a>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-md">
            {isAuthenticated && nickname ? (
              <span>Bem vindo, <span className="font-semibold">{nickname}</span>!</span>
            ) : (
              <a href="/" className="hover:text-blue-500">Login</a>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={"cursor-pointer rounded-full p-0"} variant="ghost">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>
                  Mudar para tema {theme === 'dark' ? 'Claro' : 'Escuro'}
                </span>
              </DropdownMenuItem>
              {
                isAuthenticated ? (
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>
                  Logout
                </span>
                    </DropdownMenuItem>
                ) : null
              }
              <DropdownMenuItem onClick={handleProfileClick} className={"cursor-pointer"}>
                <User className="mr-2 h-4 w-4" />
                <span>
                  Perfil
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export default Header;