export const calculateDoshaScores = (answers) => {
  const scores = {
    vata: 0,
    pitta: 0,
    kapha: 0
  };

  // Calculate total scores for each dosha
  answers.forEach(answer => {
    if (answer && answer.dosha && answer.score) {
      scores[answer.dosha] += answer.score;
    }
  });

  return scores;
};

export const getDominantDosha = (scores) => {
  const totalScore = scores.vata + scores.pitta + scores.kapha;
  
  if (totalScore === 0) return null;

  // Calculate percentages
  const percentages = {
    vata: Math.round((scores.vata / totalScore) * 100),
    pitta: Math.round((scores.pitta / totalScore) * 100),
    kapha: Math.round((scores.kapha / totalScore) * 100)
  };

  // Find the dominant dosha(s)
  const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
  const dominantDoshas = Object.keys(scores).filter(dosha => scores[dosha] === maxScore);

  // Determine constitution type
  let constitutionType;
  if (dominantDoshas.length === 1) {
    const dominant = dominantDoshas[0];
    if (percentages[dominant] >= 60) {
      constitutionType = `${dominant.charAt(0).toUpperCase() + dominant.slice(1)} Dominant`;
    } else {
      constitutionType = `${dominant.charAt(0).toUpperCase() + dominant.slice(1)} Primary`;
    }
  } else if (dominantDoshas.length === 2) {
    constitutionType = `Dual Constitution: ${dominantDoshas.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join('-')}`;
  } else {
    constitutionType = "Tridoshic (Balanced)";
  }

  return {
    scores,
    percentages,
    dominantDoshas,
    constitutionType,
    primaryDosha: dominantDoshas[0]
  };
};

export const getBalanceStatus = (scores) => {
  const total = scores.vata + scores.pitta + scores.kapha;
  const percentages = {
    vata: (scores.vata / total) * 100,
    pitta: (scores.pitta / total) * 100,
    kapha: (scores.kapha / total) * 100
  };

  // Check for severe imbalance (one dosha > 70%)
  const maxPercentage = Math.max(percentages.vata, percentages.pitta, percentages.kapha);
  if (maxPercentage > 70) {
    return {
      status: "imbalanced",
      severity: "high",
      message: "Significant imbalance detected. Consider consulting an Ayurvedic practitioner."
    };
  } else if (maxPercentage > 50) {
    return {
      status: "moderately_imbalanced", 
      severity: "medium",
      message: "Moderate imbalance. Focus on balancing practices for your dominant dosha."
    };
  } else {
    return {
      status: "balanced",
      severity: "low",
      message: "Good balance! Continue maintaining your current lifestyle practices."
    };
  }
};

export const getPersonalizedRecommendations = (analysis) => {
  const { primaryDosha } = analysis;
  
  const recommendations = {
    immediate: [],
    dietary: [],
    lifestyle: [],
    seasonal: []
  };

  switch (primaryDosha) {
    case 'vata':
      recommendations.immediate = [
        "Establish regular daily routines",
        "Practice grounding meditation for 10 minutes daily",
        "Ensure 7-8 hours of sleep with early bedtime"
      ];
      recommendations.dietary = [
        "Eat warm, cooked meals at regular times",
        "Include healthy fats like ghee and nuts",
        "Favor sweet, sour, and salty tastes",
        "Avoid raw, cold foods and excessive caffeine"
      ];
      recommendations.lifestyle = [
        "Practice gentle yoga and stretching",
        "Take warm oil massages (Abhyanga)",
        "Avoid excessive travel and overstimulation",
        "Create a calm, warm living environment"
      ];
      recommendations.seasonal = [
        "Extra care during fall and early winter",
        "Increase warm foods in cold weather",
        "Maintain consistent routines during season changes"
      ];
      break;

    case 'pitta':
      recommendations.immediate = [
        "Avoid overheating and excessive sun exposure",
        "Practice cooling pranayama (Sheetali)",
        "Take breaks from intense work and competition"
      ];
      recommendations.dietary = [
        "Eat cooling foods like cucumber and mint",
        "Favor sweet, bitter, and astringent tastes",
        "Avoid spicy, sour, and very salty foods",
        "Drink plenty of cool (not cold) water"
      ];
      recommendations.lifestyle = [
        "Exercise during cooler parts of the day",
        "Practice moderation in all activities",
        "Spend time in nature, especially near water",
        "Cultivate patience and relaxation practices"
      ];
      recommendations.seasonal = [
        "Extra care during summer months",
        "Increase cooling foods in hot weather",
        "Avoid excessive heat exposure"
      ];
      break;

    case 'kapha':
      recommendations.immediate = [
        "Increase physical activity and movement",
        "Wake up early and avoid daytime naps",
        "Engage in stimulating mental activities"
      ];
      recommendations.dietary = [
        "Eat light, warm, and spicy foods",
        "Favor pungent, bitter, and astringent tastes",
        "Reduce heavy, oily, and very sweet foods",
        "Include warming spices like ginger and black pepper"
      ];
      recommendations.lifestyle = [
        "Engage in vigorous, regular exercise",
        "Vary routines and try new activities",
        "Stay in warm, dry environments",
        "Practice energizing breathing exercises"
      ];
      recommendations.seasonal = [
        "Extra care during spring and early summer",
        "Increase light foods during wet, cold weather",
        "Maintain active lifestyle year-round"
      ];
      break;

    default:
      // Balanced constitution
      recommendations.immediate = [
        "Maintain current balanced lifestyle",
        "Practice seasonal adjustments",
        "Listen to your body's changing needs"
      ];
      recommendations.dietary = [
        "Eat seasonally appropriate foods",
        "Maintain variety in your diet",
        "Adjust portions based on activity level"
      ];
      recommendations.lifestyle = [
        "Continue balanced exercise routine",
        "Practice stress management techniques",
        "Maintain good sleep hygiene"
      ];
      recommendations.seasonal = [
        "Adjust diet and lifestyle with seasons",
        "Pay attention to environmental changes",
        "Maintain flexibility in routines"
      ];
  }

  return recommendations;
};