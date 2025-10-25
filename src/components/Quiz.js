import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import { calculateDoshaScores, getDominantDosha, getPersonalizedRecommendations } from '../utils/scoring';
import './Quiz.css';

const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    // Reset selected answer when question changes
    setSelectedAnswer(null);
    
    // Check if there's a saved answer for this question
    if (answers[currentQuestion]) {
      setSelectedAnswer(answers[currentQuestion]);
    }
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      completeQuiz(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = async (finalAnswers) => {
    setIsLoading(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const scores = calculateDoshaScores(finalAnswers);
    const analysis = getDominantDosha(scores);
    const recommendations = getPersonalizedRecommendations(analysis);
    
    const results = {
      ...analysis,
      recommendations,
      questionsAnswered: finalAnswers.length,
      totalQuestions: quizQuestions.length
    };
    
    setIsLoading(false);
    onComplete(results);
  };

  const jumpToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Analyzing Your Prakriti...</h2>
          <p>Calculating your dosha balance and preparing personalized recommendations.</p>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      {/* Progress Section */}
      <div className="quiz-header">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>
        
        <button 
          className="toggle-progress-btn"
          onClick={() => setShowProgress(!showProgress)}
          aria-label="Toggle question overview"
        >
          {showProgress ? '📋' : '📊'}
        </button>
      </div>

      {/* Question Overview (collapsible) */}
      {showProgress && (
        <div className="question-overview">
          <h4>Quick Navigation</h4>
          <div className="question-grid">
            {quizQuestions.map((q, index) => (
              <button
                key={q.id}
                className={`question-nav-btn ${
                  index === currentQuestion ? 'current' : ''
                } ${answers[index] ? 'answered' : ''}`}
                onClick={() => jumpToQuestion(index)}
                disabled={index > answers.length}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Question */}
      <div className="question-container">
        <div className="question-category">{question.category}</div>
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === option ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              <div className="option-content">
                <div className="option-text">{option.text}</div>
                <div className="option-dosha">{option.dosha.charAt(0).toUpperCase() + option.dosha.slice(1)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-container">
        <button
          className="nav-button secondary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        
        <div className="question-counter">
          {currentQuestion + 1} / {quizQuestions.length}
        </div>
        
        <button
          className="nav-button primary"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion === quizQuestions.length - 1 ? 'Get Results' : 'Next →'}
        </button>
      </div>

      {/* Dosha Info Hint */}
      <div className="dosha-hint">
        <p><strong>Vata:</strong> Air + Space (Movement, Creativity)</p>
        <p><strong>Pitta:</strong> Fire + Water (Transformation, Intelligence)</p>
        <p><strong>Kapha:</strong> Earth + Water (Structure, Stability)</p>
      </div>
    </div>
  );
};

export default Quiz;