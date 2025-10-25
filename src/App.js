import React, { useState } from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'quiz', 'results'
  const [quizResults, setQuizResults] = useState(null);

  const startQuiz = () => {
    setCurrentView('quiz');
    setQuizResults(null);
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentView('results');
  };

  const restartQuiz = () => {
    setCurrentView('welcome');
    setQuizResults(null);
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        {currentView === 'welcome' && (
          <Welcome onStartQuiz={startQuiz} />
        )}
        
        {currentView === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}
        
        {currentView === 'results' && quizResults && (
          <Results results={quizResults} onRestart={restartQuiz} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;