import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const sections = [
    { id: 'upload', label: 'Upload' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'awareness', label: 'Awareness Hub' },
    { id: 'blog', label: 'Blog' },
    { id: 'news', label: 'Cyber News' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <ShieldCheck className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">DeepGuard AI</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
              </motion.button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user?.name}
                  </span>
                </div>
                <motion.button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={login}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                <span>Sign in with Google</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;