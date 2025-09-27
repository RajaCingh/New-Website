import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (sectionId) => {
    if (typeof onNavigate === 'function') {
      onNavigate(sectionId);
    } else {
      window.location.hash = sectionId;
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
    //{ id: 'admin', label: 'Admin' }
  ];

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            onClick={() => goTo('hero')}
          >
            <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Raja Singh" className="logo-image" />
            <span className="logo-text">Raja Singh</span>
          </motion.div>

          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => goTo(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="nav-item">
                <button
                  className="theme-toggle"
                  onClick={() => {
                    const root = document.documentElement;
                    const isDark = root.getAttribute('data-theme') === 'dark';
                    const next = isDark ? 'light' : 'dark';
                    root.setAttribute('data-theme', next);
                    try { localStorage.setItem('theme', next); } catch {}
                  }}
                  aria-label="Toggle theme"
                >
                  {document.documentElement.getAttribute('data-theme') === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
              </li>
            </ul>
          </nav>

          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
