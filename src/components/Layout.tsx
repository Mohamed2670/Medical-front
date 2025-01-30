import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Pill, Search, LogOut, BarChart2, Upload, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Pill className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">MedSearch</span>
              </Link>
            </div>
            {isLoggedIn && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/search"
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </Link>
                <Link
                  to="/upload"
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};