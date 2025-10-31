import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Paper,
  Alert,
  Chip,
  Fade,
  Grow,
  Slide,
  Zoom
} from '@mui/material';
import {
  Download,
  Share,
  RestartAlt,
  ArrowBack,
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';
import { AuthContext } from '../services/auth-service';
import { quizQuestions, doshaInfo } from '../data/quizData';

function QuizComponent() {
  const { user } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showQuestionAnimation, setShowQuestionAnimation] = useState(true);

  useEffect(() => {
    setShowQuestionAnimation(true);
  }, [currentQuestion]);

  const handleAnswer = (dosha) => {
    const newAnswers = { ...answers, [currentQuestion]: dosha };
    setAnswers(newAnswers);
    setSelectedOption(dosha);
    setIsTransitioning(true);
    
    // Visual feedback and transition timing
    setTimeout(() => {
      setShowQuestionAnimation(false);
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setIsTransitioning(false);
        } else {
          calculateResult();
          setIsTransitioning(false);
        }
      }, 200);
    }, 800);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setShowQuestionAnimation(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const restartQuiz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResult(false);
      setResult(null);
      setSelectedOption(null);
      setIsTransitioning(false);
      setShowQuestionAnimation(true);
    }, 300);
  };

  const calculateResult = () => {
    const doshaScores = { vata: 0, pitta: 0, kapha: 0 };
    
    // Count answers for each dosha
    Object.values(answers).forEach(dosha => {
      if (doshaScores.hasOwnProperty(dosha)) {
        doshaScores[dosha]++;
      }
    });

    const totalAnswers = Object.keys(answers).length;
    const percentages = {
      vata: Math.round((doshaScores.vata / totalAnswers) * 100),
      pitta: Math.round((doshaScores.pitta / totalAnswers) * 100),
      kapha: Math.round((doshaScores.kapha / totalAnswers) * 100)
    };

    const dominantDosha = Object.keys(doshaScores).reduce((a, b) => 
      doshaScores[a] > doshaScores[b] ? a : b
    );

    const constitution = getConstitutionType(percentages);

    const finalResult = {
      scores: doshaScores,
      percentages,
      dominantDosha,
      constitution,
      totalAnswers,
      timestamp: new Date().toISOString()
    };

    setResult(finalResult);
    setShowResult(true);

    // Save to localStorage if user is logged in
    if (user) {
      const existingResults = JSON.parse(localStorage.getItem(`quizResults_${user.uid}`) || '[]');
      existingResults.push(finalResult);
      localStorage.setItem(`quizResults_${user.uid}`, JSON.stringify(existingResults));
    }
  };

  const getConstitutionType = (percentages) => {
    const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    const highest = sorted[0][1];
    const secondHighest = sorted[1][1];
    
    if (highest >= 60) {
      return `${sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1)} Dominant`;
    } else if (highest - secondHighest <= 10) {
      return `${sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1)}-${sorted[1][0].charAt(0).toUpperCase() + sorted[1][0].slice(1)} Dual Constitution`;
    } else {
      return 'Balanced Tridoshic';
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const doshaDetails = doshaInfo[result.dominantDosha];
    const reportContent = `
🕉️ VEDAVERSE PRAKRITI ASSESSMENT REPORT 🕉️
═════════════════════════════════════════════

📊 ASSESSMENT RESULTS
Date: ${new Date(result.timestamp).toLocaleDateString()}
Constitution: ${result.constitution}
Dominant Dosha: ${result.dominantDosha.charAt(0).toUpperCase() + result.dominantDosha.slice(1)}

🧬 DOSHA DISTRIBUTION
Vata: ${result.percentages.vata}%
Pitta: ${result.percentages.pitta}%
Kapha: ${result.percentages.kapha}%

🌟 YOUR ${doshaDetails.name.toUpperCase()} CONSTITUTION

Element: ${doshaDetails.element}
Qualities: ${doshaDetails.qualities.join(', ')}

✨ KEY CHARACTERISTICS:
${doshaDetails.primaryCharacteristics.map(char => `• ${char}`).join('\n')}

🌿 BALANCING RECOMMENDATIONS:
${doshaDetails.balancingTips.map(tip => `• ${tip}`).join('\n')}

🍽️ DIETARY GUIDELINES:
${doshaDetails.diet.map(food => `• ${food}`).join('\n')}

🧘 LIFESTYLE PRACTICES:
${doshaDetails.lifestyle.map(practice => `• ${practice}`).join('\n')}

═════════════════════════════════════════════
Generated by VedaVerse - Divine Wellness Platform
For personalized consultations, visit VedaVerse.com
═════════════════════════════════════════════
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VedaVerse_Prakriti_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResult = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'My Vedic Constitution - VedaVerse',
        text: `I discovered my Ayurvedic constitution: ${result.constitution} with ${result.dominantDosha} dominance!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      const shareText = `I discovered my Ayurvedic constitution: ${result.constitution} with ${result.dominantDosha} dominance! Take the quiz at VedaVerse.`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Result copied to clipboard!');
      });
    }
  };

  // Results display
  if (showResult && result) {
    const doshaDetails = doshaInfo[result.dominantDosha];
    
    return (
      <Fade in={showResult} timeout={800}>
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          {/* Header */}
          <Zoom in={showResult} timeout={1000}>
            <Paper 
              sx={{ 
                p: 4, 
                mb: 3, 
                background: 'linear-gradient(135deg, #FFF8E1 0%, #F5DEB3 100%)',
                border: '2px solid #FFD700',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: 'linear-gradient(90deg, #FFD700 0%, #8B4513 50%, #FFD700 100%)',
                  animation: 'shimmer 2s infinite'
                }
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom 
                textAlign="center"
                sx={{
                  background: 'linear-gradient(45deg, #8B4513 30%, #FFD700 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 2,
                  animation: 'pulse 2s ease-in-out infinite alternate'
                }}
              >
                🕉️ Your Divine Prakriti Results 🕉️
              </Typography>
              
              {user && (
                <Fade in={true} timeout={1500}>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3,
                      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.1) 100%)',
                      border: '1px solid #4CAF50',
                      borderRadius: 2
                    }}
                  >
                    🌟 Results saved to your profile, {user.displayName || user.email}! 🌟
                  </Alert>
                </Fade>
              )}

              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Zoom in={true} timeout={1200}>
                  <Chip 
                    label={result.constitution}
                    sx={{
                      fontSize: '1.2rem',
                      py: 3,
                      px: 2,
                      background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                      color: 'white',
                      fontWeight: 'bold',
                      boxShadow: '0 8px 25px rgba(139, 69, 19, 0.3)',
                      transform: 'scale(1)',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      },
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </Zoom>
              </Box>

              {/* Action Buttons */}
              <Slide in={true} direction="up" timeout={1400}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={downloadReport}
                    sx={{ 
                      minWidth: 180,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 35px rgba(139, 69, 19, 0.4)'
                      }
                    }}
                  >
                    Download Report
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    onClick={shareResult}
                    sx={{ 
                      minWidth: 150,
                      '&:hover': {
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    Share Result
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAlt />}
                    onClick={restartQuiz}
                    sx={{ 
                      minWidth: 150,
                      '&:hover': {
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    Retake Quiz
                  </Button>
                </Box>
              </Slide>
            </Paper>
          </Zoom>

          {/* Dosha Distribution */}
          <Grow in={true} timeout={1500}>
            <Paper sx={{ p: 4, mb: 3 }}>
              <Typography variant="h5" gutterBottom color="primary" textAlign="center">
                🧬 Dosha Distribution Analysis
              </Typography>
              
              {Object.entries(result.percentages).map(([dosha, percentage], index) => (
                <Slide key={dosha} in={true} direction="left" timeout={1500 + (index * 200)}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          textTransform: 'capitalize', 
                          fontWeight: 600,
                          color: dosha === result.dominantDosha ? '#8B4513' : '#5D4037'
                        }}
                      >
                        {dosha.charAt(0).toUpperCase() + dosha.slice(1)} ({doshaInfo[dosha].element})
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{ 
                        height: 12, 
                        borderRadius: 6,
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: dosha === result.dominantDosha 
                            ? 'linear-gradient(45deg, #FFD700 30%, #DAA520 90%)'
                            : 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                          borderRadius: 6
                        }
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Qualities: {doshaInfo[dosha].qualities.join(' • ')}
                    </Typography>
                  </Box>
                </Slide>
              ))}
            </Paper>
          </Grow>

          {/* Detailed Analysis */}
          <Fade in={true} timeout={2000}>
            <Paper sx={{ p: 4, mb: 3 }}>
              <Typography variant="h5" gutterBottom color="primary" textAlign="center">
                🌟 Your {doshaDetails.name} Constitution
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center', mb: 4 }}>
                You have a predominantly {doshaDetails.name} constitution, governed by the {doshaDetails.element} elements. 
                This sacred combination shapes your unique physical, mental, and emotional characteristics.
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                {[
                  { title: '✨ Key Characteristics', items: doshaDetails.primaryCharacteristics },
                  { title: '🌿 Balancing Practices', items: doshaDetails.balancingTips },
                  { title: '🍽️ Dietary Guidelines', items: doshaDetails.diet },
                  { title: '🧘 Lifestyle Practices', items: doshaDetails.lifestyle }
                ].map((section, index) => (
                  <Zoom key={section.title} in={true} timeout={2200 + (index * 200)}>
                    <Card sx={{ 
                      p: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 35px rgba(139, 69, 19, 0.2)'
                      }
                    }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        {section.title}
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} style={{ marginBottom: '8px' }}>
                            <Typography variant="body2">{item}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Zoom>
                ))}
              </Box>
            </Paper>
          </Fade>

          {/* Next Steps */}
          <Slide in={true} direction="up" timeout={2500}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="primary">
                🚀 Continue Your Wellness Journey
              </Typography>
              <Typography variant="body1" paragraph>
                Now that you know your constitution, explore personalized herbs and yoga practices, 
                or consult with our certified Ayurvedic practitioners for deeper guidance.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
                <Button variant="contained" onClick={() => window.location.href = '#herbs'}>
                  Explore Herbs 🌿
                </Button>
                <Button variant="contained" onClick={() => window.location.href = '#yoga'}>
                  Practice Yoga 🧘‍♀️
                </Button>
                <Button variant="outlined" onClick={() => window.location.href = '#doctors'}>
                  Consult Practitioners 👨‍⚕️
                </Button>
              </Box>
            </Paper>
          </Slide>
        </Box>
      </Fade>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];

  return (
    <Fade in={!isTransitioning} timeout={500}>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* Header */}
        <Slide in={showQuestionAnimation} direction="down" timeout={800}>
          <Paper 
            sx={{ 
              p: 4, 
              mb: 3, 
              background: 'linear-gradient(135deg, #FFF8E1 0%, #F5DEB3 100%)',
              border: '2px solid #FFD700',
              borderRadius: 3,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #FFD700 0%, #8B4513 50%, #FFD700 100%)',
                animation: 'shimmer 3s infinite'
              }
            }}
          >
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #8B4513 30%, #FFD700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              🕉️ Divine Prakriti Assessment 🕉️
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Discover your authentic Ayurvedic constitution through this sacred 20-question journey
            </Typography>
            
            {/* Progress */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(progress)}% Complete
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(45deg, #FFD700 30%, #DAA520 90%)',
                    borderRadius: 6,
                    transition: 'transform 0.5s ease-in-out'
                  }
                }}
              />
            </Box>
          </Paper>
        </Slide>

        {/* Question Card */}
        <Fade in={showQuestionAnimation} timeout={1000}>
          <Paper 
            sx={{ 
              p: 4,
              background: 'linear-gradient(135deg, rgba(255, 248, 225, 0.95) 0%, rgba(245, 222, 179, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: 3
            }}
          >
            <Slide in={showQuestionAnimation} direction="left" timeout={1200}>
              <Typography 
                variant="h5" 
                gutterBottom 
                textAlign="center"
                sx={{ 
                  color: '#8B4513', 
                  fontWeight: 600,
                  mb: 4
                }}
              >
                {currentQ.question}
              </Typography>
            </Slide>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {currentQ.options.map((option, index) => (
                <Grow key={index} in={showQuestionAnimation} timeout={1400 + (index * 200)}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: selectedOption === option.dosha 
                        ? '3px solid #FFD700' 
                        : '2px solid transparent',
                      background: selectedOption === option.dosha
                        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 248, 225, 0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 248, 225, 0.8) 100%)',
                      transform: selectedOption === option.dosha ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                        transform: selectedOption === option.dosha ? 'scale(1.02)' : 'translateY(-3px) scale(1.02)',
                        boxShadow: '0 12px 40px rgba(139, 69, 19, 0.2)',
                        border: '3px solid #FFD700'
                      }
                    }}
                    onClick={() => !isTransitioning && handleAnswer(option.dosha)}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>
                        {selectedOption === option.dosha ? (
                          <CheckCircle sx={{ color: '#FFD700', fontSize: 24 }} />
                        ) : (
                          <RadioButtonUnchecked sx={{ color: '#8B4513', fontSize: 24 }} />
                        )}
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: '1.1rem',
                          lineHeight: 1.6,
                          color: '#5D4037',
                          flex: 1
                        }}
                      >
                        {option.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Box>

            {/* Navigation */}
            <Slide in={showQuestionAnimation} direction="up" timeout={1800}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || isTransitioning}
                  startIcon={<ArrowBack />}
                  sx={{ 
                    minWidth: 120,
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Previous
                </Button>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={restartQuiz}
                    disabled={isTransitioning}
                    startIcon={<RestartAlt />}
                    sx={{
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Restart
                  </Button>
                  
                  {currentQuestion === quizQuestions.length - 1 && (
                    <Zoom in={true} timeout={2000}>
                      <Button
                        variant="contained"
                        onClick={calculateResult}
                        disabled={isTransitioning}
                        size="large"
                        sx={{ 
                          minWidth: 150,
                          background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                          boxShadow: '0 8px 25px rgba(139, 69, 19, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #A0522D 30%, #8B4513 90%)',
                            transform: 'translateY(-3px) scale(1.05)',
                            boxShadow: '0 12px 35px rgba(139, 69, 19, 0.4)'
                          },
                          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                      >
                        See Results ✨
                      </Button>
                    </Zoom>
                  )}
                </Box>
              </Box>
            </Slide>
          </Paper>
        </Fade>

        {/* Sacred Knowledge Box */}
        <Fade in={showQuestionAnimation} timeout={2200}>
          <Paper 
            sx={{ 
              p: 3, 
              mt: 3, 
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(160, 82, 45, 0.05) 100%)',
              border: '1px solid rgba(139, 69, 19, 0.2)',
              borderRadius: 2
            }}
          >
            <Typography variant="body2" textAlign="center" color="text.secondary">
              🌟 Each answer reveals the cosmic energies (Vata, Pitta, Kapha) that shape your being. 
              Answer honestly to receive your most authentic constitutional reading. 🌟
            </Typography>
          </Paper>
        </Fade>
      </Box>
    </Fade>
  );
}

export default QuizComponent;