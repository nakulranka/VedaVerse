import React from 'react';
import './Header.css';

const Header = ({ currentView, onNavigate }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => onNavigate('welcome')}>
          <span className="logo-symbol">🕉️</span>
          <span className="logo-text">Veda Verse</span>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-link ${currentView === 'welcome' ? 'active' : ''}`}
            onClick={() => onNavigate('welcome')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentView === 'quiz' ? 'active' : ''}`}
            onClick={() => onNavigate('quiz')}
          >
            Prakriti Quiz
          </button>
          <button 
            className={`nav-link ${currentView === 'herbs' ? 'active' : ''}`}
            onClick={() => onNavigate('herbs')}
          >
            Herbs Guide
          </button>
          <button 
            className={`nav-link ${currentView === 'yoga' ? 'active' : ''}`}
            onClick={() => onNavigate('yoga')}
          >
            Yoga
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;