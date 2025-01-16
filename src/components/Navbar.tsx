import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CornIcon } from './CornIcon';

interface NavbarProps {
  isScrolled: boolean;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, onContactClick }) => {
  const location = useLocation();
  const menuItems = [
    { name: 'Products', path: '/' },
    { name: 'Builds', path: '/builds' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`${isScrolled ? 'floating-nav scrolled' : 'floating-nav'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <CornIcon className="h-8 w-8 text-purple-400 rotate-12" />
              <span className="text-2xl font-bold shine-effect">Corny Softworks</span>
            </motion.div>
          </Link>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`text-purple-200 hover:text-white transition-all ${
                    location.pathname === item.path ? 'text-white font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-hover bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full"
            onClick={onContactClick}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </nav>
  );
};