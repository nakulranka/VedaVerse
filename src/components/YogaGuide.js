import React, { useState } from 'react';
import './YogaGuide.css';

const YogaGuide = () => {
  const [selectedDosha, setSelectedDosha] = useState('vata');

  const yogaPractices = {
    vata: {
      name: 'Vata',
      color: '#8B4513',
      description: 'Grounding and calming practices to balance air and space elements',
      banner: '/images/yoga_banner.jpg',
      principles: [
        'Slow, steady movements',
        'Longer holds in poses',
        'Focus on grounding',
        'Warm environment preferred'
      ],
      asanas: [
        {
          name: 'Child\'s Pose (Balasana)',
          duration: '3-5 minutes',
          benefits: 'Calms nervous system, grounds energy',
          instructions: 'Kneel on floor, sit back on heels, fold forward with arms extended'
        },
        {
          name: 'Mountain Pose (Tadasana)',
          duration: '2-3 minutes',
          benefits: 'Improves posture, creates stability',
          instructions: 'Stand tall, feet hip-width apart, arms at sides, breathe deeply'
        },
        {
          name: 'Forward Fold (Uttanasana)',
          duration: '1-2 minutes',
          benefits: 'Calms mind, stretches hamstrings',
          instructions: 'From standing, hinge at hips, let arms hang or hold elbows'
        },
        {
          name: 'Seated Twist (Ardha Matsyendrasana)',
          duration: '1-2 minutes each side',
          benefits: 'Aids digestion, releases tension',
          instructions: 'Sit cross-legged, twist gently to one side, hand behind back'
        },
        {
          name: 'Legs Up Wall (Viparita Karani)',
          duration: '10-15 minutes',
          benefits: 'Deeply restorative, calms nervous system',
          instructions: 'Lie on back near wall, extend legs up wall, arms relaxed'
        }
      ],
      pranayama: [
        {
          name: 'Nadi Shodhana (Alternate Nostril)',
          duration: '5-10 minutes',
          technique: 'Use thumb and ring finger to alternate closing nostrils while breathing'
        },
        {
          name: 'Ujjayi Breathing',
          duration: '5-15 minutes',
          technique: 'Breathe through nose with slight constriction in throat, creating ocean sound'
        }
      ],
      meditation: 'Focus on grounding visualizations, body scanning, or mantra repetition for 10-20 minutes'
    },
    pitta: {
      name: 'Pitta',
      color: '#FF6B35',
      description: 'Cooling and calming practices to balance fire and water elements',
      banner: '/images/yoga_banner.jpg',
      principles: [
        'Moderate intensity',
        'Cooling sequences',
        'Avoid overheating',
        'Practice during cooler times'
      ],
      asanas: [
        {
          name: 'Moon Salutation (Chandra Namaskara)',
          duration: '10-15 minutes',
          benefits: 'Cooling, calming alternative to sun salutation',
          instructions: 'Gentle flowing sequence emphasizing lateral movements'
        },
        {
          name: 'Fish Pose (Matsyasana)',
          duration: '2-3 minutes',
          benefits: 'Opens heart, cools body temperature',
          instructions: 'Lie on back, arch chest, rest crown of head on floor'
        },
        {
          name: 'Cobra Pose (Bhujangasana)',
          duration: '30 seconds - 1 minute',
          benefits: 'Gentle backbend, opens chest',
          instructions: 'Lie face down, press palms down, lift chest moderately'
        },
        {
          name: 'Pigeon Pose (Eka Pada Rajakapotasana)',
          duration: '3-5 minutes each side',
          benefits: 'Hip opening, releases stored tension',
          instructions: 'From downward dog, bring one knee forward, extend other leg back'
        },
        {
          name: 'Supported Bridge (Setu Bandhasana)',
          duration: '5-10 minutes',
          benefits: 'Gentle backbend, calming',
          instructions: 'Lie on back, place block under sacrum, legs bent or extended'
        }
      ],
      pranayama: [
        {
          name: 'Sheetali (Cooling Breath)',
          duration: '5-10 minutes',
          technique: 'Inhale through curled tongue, exhale through nose'
        },
        {
          name: 'Sheetkari (Hissing Breath)',
          duration: '5-10 minutes',
          technique: 'Inhale through teeth with tongue against teeth, exhale through nose'
        }
      ],
      meditation: 'Moon gazing, cooling visualizations, or focus on water elements for 15-20 minutes'
    },
    kapha: {
      name: 'Kapha',
      color: '#4A90A4',
      description: 'Energizing and warming practices to balance earth and water elements',
      banner: '/images/yoga_banner.jpg',
      principles: [
        'Dynamic movements',
        'Heart-opening poses',
        'Energizing sequences',
        'Morning practice preferred'
      ],
      asanas: [
        {
          name: 'Sun Salutation (Surya Namaskara)',
          duration: '10-20 minutes',
          benefits: 'Energizing, warming, full-body movement',
          instructions: 'Dynamic flowing sequence connecting breath with movement'
        },
        {
          name: 'Warrior I (Virabhadrasana I)',
          duration: '1-2 minutes each side',
          benefits: 'Builds strength, opens chest',
          instructions: 'Lunge position, back foot angled, arms overhead'
        },
        {
          name: 'Camel Pose (Ustrasana)',
          duration: '30 seconds - 1 minute',
          benefits: 'Heart opening, energizing backbend',
          instructions: 'Kneel, reach back to hold heels, open chest toward sky'
        },
        {
          name: 'Boat Pose (Navasana)',
          duration: '30 seconds - 1 minute, repeat 3-5 times',
          benefits: 'Core strengthening, builds heat',
          instructions: 'Sit, balance on sitting bones, lift legs and chest'
        },
        {
          name: 'Chair Pose (Utkatasana)',
          duration: '30 seconds - 1 minute',
          benefits: 'Leg strengthening, generates heat',
          instructions: 'Stand, bend knees as if sitting in chair, arms overhead'
        }
      ],
      pranayama: [
        {
          name: 'Bhastrika (Bellows Breath)',
          duration: '3-5 minutes',
          technique: 'Rapid, forceful breathing to generate heat and energy'
        },
        {
          name: 'Kapalabhati (Skull Shining)',
          duration: '5-10 minutes',
          technique: 'Rapid exhalations through nose, passive inhalations'
        }
      ],
      meditation: 'Dynamic meditation, visualization of fire or sun, or walking meditation for 10-15 minutes'
    }
  };

  const currentPractice = yogaPractices[selectedDosha];

  return (
    <div className="yoga-guide">
      <div className="yoga-header">
        <h1>Yoga for Your Dosha</h1>
        <p>Discover personalized yoga practices that balance your unique constitution and promote optimal health.</p>
      </div>

      <div className="dosha-selector">
        {Object.entries(yogaPractices).map(([dosha, practice]) => (
          <button
            key={dosha}
            className={`dosha-btn ${selectedDosha === dosha ? 'active' : ''}`}
            onClick={() => setSelectedDosha(dosha)}
            style={{ 
              backgroundColor: selectedDosha === dosha ? practice.color : 'transparent',
              borderColor: practice.color,
              color: selectedDosha === dosha ? '#fff' : practice.color
            }}
          >
            {practice.name}
          </button>
        ))}
      </div>

      <div className="yoga-content">
        <div className="practice-header">
          <div className="practice-banner">
            <img src={currentPractice.banner} alt="Yoga Banner" />
            <div className="practice-overlay">
              <h2 style={{ color: currentPractice.color }}>
                {currentPractice.name} Yoga Practice
              </h2>
              <p>{currentPractice.description}</p>
            </div>
          </div>
        </div>

        <div className="practice-principles">
          <h3>Practice Principles</h3>
          <div className="principles-grid">
            {currentPractice.principles.map((principle, index) => (
              <div key={index} className="principle-card">
                <span className="principle-icon">🧘</span>
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="practice-sections">
          <div className="asanas-section">
            <h3>Recommended Asanas (Poses)</h3>
            <div className="asanas-grid">
              {currentPractice.asanas.map((asana, index) => (
                <div key={index} className="asana-card">
                  <h4>{asana.name}</h4>
                  <div className="asana-details">
                    <p><strong>Duration:</strong> {asana.duration}</p>
                    <p><strong>Benefits:</strong> {asana.benefits}</p>
                    <p><strong>Instructions:</strong> {asana.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breathing-section">
            <h3>Pranayama (Breathing Practices)</h3>
            <div className="breathing-grid">
              {currentPractice.pranayama.map((breath, index) => (
                <div key={index} className="breathing-card">
                  <h4>{breath.name}</h4>
                  <p><strong>Duration:</strong> {breath.duration}</p>
                  <p><strong>Technique:</strong> {breath.technique}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="meditation-section">
            <h3>Meditation Practice</h3>
            <div className="meditation-card">
              <span className="meditation-icon">🧘‍♀️</span>
              <p>{currentPractice.meditation}</p>
            </div>
          </div>
        </div>

        <div className="practice-tips">
          <h3>General Tips for {currentPractice.name} Practice</h3>
          <div className="tips-content">
            {selectedDosha === 'vata' && (
              <div className="tips-list">
                <p>• Practice in a warm, quiet environment</p>
                <p>• Move slowly and mindfully</p>
                <p>• Hold poses longer for grounding</p>
                <p>• End with long relaxation (10-15 minutes)</p>
                <p>• Practice at the same time daily for routine</p>
              </div>
            )}
            {selectedDosha === 'pitta' && (
              <div className="tips-list">
                <p>• Practice during cooler parts of the day</p>
                <p>• Avoid overheating or competitive attitudes</p>
                <p>• Stay hydrated throughout practice</p>
                <p>• Practice in well-ventilated, cool spaces</p>
                <p>• Focus on surrendering rather than achieving</p>
              </div>
            )}
            {selectedDosha === 'kapha' && (
              <div className="tips-list">
                <p>• Practice in the morning to energize</p>
                <p>• Keep movements dynamic and flowing</p>
                <p>• Challenge yourself appropriately</p>
                <p>• Vary your routine to maintain interest</p>
                <p>• Practice in warm, dry environments</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="yoga-disclaimer">
        <p>
          <strong>Note:</strong> These practices are general guidelines. Always listen to your body 
          and consult with a qualified yoga instructor or healthcare provider, especially if you 
          have any health conditions or injuries.
        </p>
      </div>
    </div>
  );
};

export default YogaGuide;