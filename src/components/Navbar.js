import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking a link (for mobile)
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">SmartBudget</Link>
        
        {/* Hamburger menu button */}
        <div 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        
        {/* Navigation menu */}
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/#features" onClick={handleLinkClick}>Features</Link>
            <Link to="/#how-it-works" onClick={handleLinkClick}>How It Works</Link>
          </div>
          <div className="nav-actions">
            <Link to="/login" onClick={handleLinkClick}>Login</Link>
            <Link to="/signup" className="signup-button" onClick={handleLinkClick}>Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
