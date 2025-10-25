import React from 'react';
import './Welcome.css';

const Welcome = ({ onStartQuiz }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1>Know Your Body Type</h1>
          <h2>Discover Your Ayurvedic Constitution (Prakriti)</h2>
        </div>

        <div className="welcome-description">
          <p>
            Ayurveda, the ancient science of life, teaches us that each person has a unique constitution 
            called <strong>Prakriti</strong>. Understanding your dosha balance can help you make better 
            choices for your health, diet, and lifestyle.
          </p>
        </div>

        <div className="doshas-preview">
          <div className="dosha-card">
            <div className="dosha-icon vata">💨</div>
            <h3>Vata</h3>
            <p>Air + Space</p>
            <span className="dosha-traits">Creative • Energetic • Quick-thinking</span>
          </div>
          <div className="dosha-card">
            <div className="dosha-icon pitta">🔥</div>
            <h3>Pitta</h3>
            <p>Fire + Water</p>
            <span className="dosha-traits">Intelligent • Focused • Leadership</span>
          </div>
          <div className="dosha-card">
            <div className="dosha-icon kapha">🌊</div>
            <h3>Kapha</h3>
            <p>Earth + Water</p>
            <span className="dosha-traits">Calm • Stable • Enduring</span>
          </div>
        </div>

        <div className="quiz-info">
          <h3>What You'll Get:</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">📊</span>
              <span>Detailed dosha analysis with percentages</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🍽️</span>
              <span>Personalized dietary recommendations</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🧘</span>
              <span>Lifestyle and wellness guidance</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📱</span>
              <span>Downloadable results report</span>
            </div>
          </div>
        </div>

        <div className="quiz-details">
          <div className="detail-item">
            <strong>⏱️ Time:</strong> 5-7 minutes
          </div>
          <div className="detail-item">
            <strong>📝 Questions:</strong> 20 comprehensive questions
          </div>
          <div className="detail-item">
            <strong>🎯 Focus:</strong> Physical, mental, and emotional traits
          </div>
        </div>

        <button className="start-quiz-btn" onClick={onStartQuiz}>
          Start Your Prakriti Analysis
        </button>

        <div className="disclaimer-note">
          <p>
            This quiz is based on traditional Ayurvedic principles and is for educational purposes. 
            For personalized health advice, consult with a qualified practitioner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;