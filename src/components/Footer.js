import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Veda Verse</h4>
            <p>Bringing ancient wisdom to modern wellness through Ayurvedic knowledge and practices.</p>
          </div>
          
          <div className="footer-section">
            <h4>Learn More</h4>
            <ul>
              <li><a href="#ayurveda">About Ayurveda</a></li>
              <li><a href="#doshas">Understanding Doshas</a></li>
              <li><a href="#constitution">Prakriti Analysis</a></li>
              <li><a href="#lifestyle">Ayurvedic Lifestyle</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#recipes">Dosha Recipes</a></li>
              <li><a href="#yoga">Yoga for Doshas</a></li>
              <li><a href="#meditation">Meditation Guide</a></li>
              <li><a href="#herbs">Ayurvedic Herbs</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
            <p>Follow us for daily Ayurvedic wisdom</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; {currentYear} Veda Verse. All rights reserved.</p>
            <div className="legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
          <div className="footer-disclaimer">
            <p>
              <strong>Medical Disclaimer:</strong> The information provided is for educational purposes only 
              and should not be used as a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;