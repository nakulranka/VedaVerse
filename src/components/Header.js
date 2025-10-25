import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-symbol">🕉️</span>
          <span className="logo-text">Veda Verse</span>
        </div>
        <nav className="nav-menu">
          <a href="#about" className="nav-link">About</a>
          <a href="#ayurveda" className="nav-link">Ayurveda</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;