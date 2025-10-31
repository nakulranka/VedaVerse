import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  Paper,
  Alert
} from '@mui/material';

const questions = [
  {
    id: 1,
    question: "What is your typical body frame?",
    options: [
      { value: "thin", text: "Thin, light frame (Vata)", dosha: "vata" },
      { value: "medium", text: "Medium, muscular frame (Pitta)", dosha: "pitta" },
      { value: "large", text: "Large, heavy frame (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 2,
    question: "How is your skin typically?",
    options: [
      { value: "dry", text: "Dry, rough, cool (Vata)", dosha: "vata" },
      { value: "warm", text: "Warm, oily, prone to acne (Pitta)", dosha: "pitta" },
      { value: "smooth", text: "Smooth, thick, cool (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 3,
    question: "What describes your hair best?",
    options: [
      { value: "dry", text: "Dry, brittle, frizzy (Vata)", dosha: "vata" },
      { value: "fine", text: "Fine, straight, early graying (Pitta)", dosha: "pitta" },
      { value: "thick", text: "Thick, wavy, lustrous (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 4,
    question: "How is your appetite?",
    options: [
      { value: "irregular", text: "Irregular, sometimes forget to eat (Vata)", dosha: "vata" },
      { value: "strong", text: "Strong, gets angry when hungry (Pitta)", dosha: "pitta" },
      { value: "steady", text: "Steady, can skip meals easily (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 5,
    question: "How do you handle stress?",
    options: [
      { value: "anxious", text: "Become anxious and worried (Vata)", dosha: "vata" },
      { value: "irritable", text: "Become irritable and angry (Pitta)", dosha: "pitta" },
      { value: "withdrawn", text: "Become withdrawn and sluggish (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 6,
    question: "What is your sleep pattern?",
    options: [
      { value: "light", text: "Light sleeper, wake up easily (Vata)", dosha: "vata" },
      { value: "sound", text: "Sound sleep, moderate duration (Pitta)", dosha: "pitta" },
      { value: "deep", text: "Deep, long sleep, hard to wake up (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 7,
    question: "How is your memory?",
    options: [
      { value: "quick", text: "Quick to learn, quick to forget (Vata)", dosha: "vata" },
      { value: "sharp", text: "Sharp memory, good retention (Pitta)", dosha: "pitta" },
      { value: "slow", text: "Slow to learn, but never forget (Kapha)", dosha: "kapha" }
    ]
  },
  {
    id: 8,
    question: "What is your typical body temperature?",
    options: [
      { value: "cold", text: "Often feel cold, cold hands/feet (Vata)", dosha: "vata" },
      { value: "warm", text: "Often feel warm, dislike heat (Pitta)", dosha: "pitta" },
      { value: "moderate", text: "Moderate, good tolerance (Kapha)", dosha: "kapha" }
    ]
  }
];

function Quiz({ user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const doshaScores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.entries(answers).forEach(([questionIndex, answerValue]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      if (selectedOption) {
        doshaScores[selectedOption.dosha]++;
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

    setResult({
      scores: doshaScores,
      percentages,
      dominantDosha,
      totalAnswers
    });
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const getDoshaDescription = (dosha) => {
    const descriptions = {
      vata: {
        title: "Vata Dosha",
        description: "You have a predominantly Vata constitution. Vata governs movement and is associated with air and space elements.",
        characteristics: [
          "Creative and energetic when balanced",
          "Quick thinking and adaptable",
          "May experience anxiety when imbalanced",
          "Benefits from routine and warm foods"
        ],
        recommendations: [
          "Follow regular daily routines",
          "Eat warm, cooked foods",
          "Practice calming activities like yoga",
          "Get adequate rest and sleep"
        ]
      },
      pitta: {
        title: "Pitta Dosha",
        description: "You have a predominantly Pitta constitution. Pitta governs transformation and is associated with fire and water elements.",
        characteristics: [
          "Natural leadership qualities",
          "Sharp intellect and focus",
          "May experience anger when imbalanced",
          "Strong digestive fire"
        ],
        recommendations: [
          "Avoid excessive heat and spicy foods",
          "Practice cooling activities",
          "Maintain work-life balance",
          "Eat at regular intervals"
        ]
      },
      kapha: {
        title: "Kapha Dosha",
        description: "You have a predominantly Kapha constitution. Kapha governs structure and is associated with earth and water elements.",
        characteristics: [
          "Calm and steady nature",
          "Strong immunity and endurance",
          "May experience sluggishness when imbalanced",
          "Compassionate and caring"
        ],
        recommendations: [
          "Engage in regular physical activity",
          "Eat light, warm foods",
          "Avoid oversleeping",
          "Seek variety and stimulation"
        ]
      }
    };
    return descriptions[dosha];
  };

  if (showResult && result) {
    const doshaInfo = getDoshaDescription(result.dominantDosha);
    
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h4" gutterBottom color="primary" textAlign="center">
            Your Prakriti Results
          </Typography>
          
          {user && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Results saved to your profile, {user.displayName || user.email}!
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Dosha Distribution:
            </Typography>
            
            {Object.entries(result.percentages).map(([dosha, percentage]) => (
              <Box key={dosha} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                    {dosha}
                  </Typography>
                  <Typography variant="body1">
                    {percentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{ height: 8, borderRadius: 4 }}
                  color={dosha === result.dominantDosha ? 'primary' : 'secondary'}
                />
              </Box>
            ))}
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                {doshaInfo.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {doshaInfo.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Key Characteristics:
              </Typography>
              <ul>
                {doshaInfo.characteristics.map((char, index) => (
                  <li key={index}>
                    <Typography variant="body2">{char}</Typography>
                  </li>
                ))}
              </ul>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Recommendations:
              </Typography>
              <ul>
                {doshaInfo.recommendations.map((rec, index) => (
                  <li key={index}>
                    <Typography variant="body2">{rec}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" onClick={restartQuiz} size="large">
              Take Quiz Again
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary" textAlign="center">
          Prakriti Assessment
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {currentQ.question}
            </Typography>
            
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              {currentQ.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.text}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Quiz;