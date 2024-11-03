import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <Link to="/" className="logo">SmartBudget</Link>
      <div className="nav-links">
        <Link to="/#features">Features</Link>
        <Link to="/#how-it-works">How It Works</Link>
      </div>
      <div className="nav-actions">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-button">Sign Up</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
