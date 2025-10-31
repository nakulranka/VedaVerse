import React, { useState } from 'react';
import './HerbsGuide.css';

const HerbsGuide = () => {
  const [selectedHerb, setSelectedHerb] = useState(null);

  const herbs = [
    {
      id: 'ashwagandha',
      name: 'Ashwagandha',
      image: '/images/ashwagandha.jpg',
      scientificName: 'Withania somnifera',
      category: 'Adaptogenic Herb',
      doshaEffect: {
        vata: 'Balancing - Reduces anxiety and stress',
        pitta: 'Neutral - Use in moderation',
        kapha: 'Stimulating - Boosts energy and metabolism'
      },
      benefits: [
        'Reduces stress and anxiety',
        'Improves sleep quality',
        'Boosts immune system',
        'Enhances physical strength',
        'Supports cognitive function'
      ],
      usage: [
        'Take 300-500mg daily with warm milk',
        'Best consumed in evening',
        'Can be mixed with honey',
        'Consult practitioner for dosage'
      ],
      precautions: [
        'Avoid during pregnancy',
        'May interact with blood pressure medications',
        'Reduce if experiencing stomach upset'
      ]
    },
    {
      id: 'turmeric',
      name: 'Turmeric',
      image: '/images/turmeric.jpg',
      scientificName: 'Curcuma longa',
      category: 'Anti-inflammatory Herb',
      doshaEffect: {
        vata: 'Warming - Good for joint pain',
        pitta: 'Slightly heating - Use in moderation',
        kapha: 'Excellent - Reduces inflammation and mucus'
      },
      benefits: [
        'Powerful anti-inflammatory',
        'Supports liver health',
        'Boosts immune system',
        'Aids digestion',
        'Promotes wound healing'
      ],
      usage: [
        'Add 1 tsp to warm milk (golden milk)',
        'Use in cooking daily',
        'Take with black pepper for absorption',
        'Can be applied topically for skin'
      ],
      precautions: [
        'May increase bleeding risk',
        'Avoid large amounts if gallstones',
        'May interact with blood thinners'
      ]
    },
    {
      id: 'tulsi',
      name: 'Tulsi (Holy Basil)',
      image: '/images/tulsi.jpg',
      scientificName: 'Ocimum tenuiflorum',
      category: 'Sacred Adaptogenic Herb',
      doshaEffect: {
        vata: 'Calming - Reduces anxiety',
        pitta: 'Cooling - Reduces heat and irritation',
        kapha: 'Stimulating - Clears respiratory congestion'
      },
      benefits: [
        'Reduces stress and promotes calm',
        'Supports respiratory health',
        'Boosts immune system',
        'Improves mental clarity',
        'Balances blood sugar'
      ],
      usage: [
        'Drink as tea 2-3 times daily',
        'Chew 2-4 fresh leaves in morning',
        'Add to herbal formulations',
        'Use leaves in cooking'
      ],
      precautions: [
        'Generally safe for most people',
        'May lower blood sugar',
        'Avoid large amounts during pregnancy'
      ]
    },
    {
      id: 'neem',
      name: 'Neem',
      image: '/images/neem.jpg',
      scientificName: 'Azadirachta indica',
      category: 'Purifying Herb',
      doshaEffect: {
        vata: 'Neutral - Use with care as it can be drying',
        pitta: 'Excellent - Cooling and detoxifying',
        kapha: 'Good - Reduces excess oil and congestion'
      },
      benefits: [
        'Purifies blood',
        'Supports skin health',
        'Natural antibacterial',
        'Supports oral health',
        'Helps manage blood sugar'
      ],
      usage: [
        'Take neem capsules as directed',
        'Use neem oil for skin application',
        'Chew neem leaves (very bitter)',
        'Use neem toothpaste for oral health'
      ],
      precautions: [
        'Very bitter taste',
        'Avoid during pregnancy',
        'May lower blood sugar',
        'Use under guidance for internal consumption'
      ]
    }
  ];

  const getDoshaColor = (dosha) => {
    const colors = {
      vata: '#8B4513',
      pitta: '#FF6B35',
      kapha: '#4A90A4'
    };
    return colors[dosha];
  };

  return (
    <div className="herbs-guide">
      <div className="herbs-header">
        <h1>Ayurvedic Herbs Guide</h1>
        <p>Discover the healing power of traditional Ayurvedic herbs and their benefits for each dosha constitution.</p>
      </div>

      <div className="herbs-grid">
        {herbs.map(herb => (
          <div 
            key={herb.id} 
            className={`herb-card ${selectedHerb?.id === herb.id ? 'selected' : ''}`}
            onClick={() => setSelectedHerb(herb)}
          >
            <div className="herb-image">
              <img src={herb.image} alt={herb.name} />
              <div className="herb-overlay">
                <h3>{herb.name}</h3>
                <p>{herb.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedHerb && (
        <div className="herb-details">
          <div className="herb-details-header">
            <img src={selectedHerb.image} alt={selectedHerb.name} />
            <div className="herb-info">
              <h2>{selectedHerb.name}</h2>
              <p className="scientific-name">{selectedHerb.scientificName}</p>
              <span className="category-tag">{selectedHerb.category}</span>
            </div>
            <button 
              className="close-details"
              onClick={() => setSelectedHerb(null)}
            >
              ✕
            </button>
          </div>

          <div className="herb-content">
            <div className="dosha-effects">
              <h3>Effects on Doshas</h3>
              <div className="dosha-effects-grid">
                {Object.entries(selectedHerb.doshaEffect).map(([dosha, effect]) => (
                  <div 
                    key={dosha} 
                    className="dosha-effect"
                    style={{ borderLeftColor: getDoshaColor(dosha) }}
                  >
                    <h4 style={{ color: getDoshaColor(dosha) }}>
                      {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
                    </h4>
                    <p>{effect}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="herb-sections">
              <div className="herb-section">
                <h3>Health Benefits</h3>
                <ul>
                  {selectedHerb.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="herb-section">
                <h3>How to Use</h3>
                <ul>
                  {selectedHerb.usage.map((usage, index) => (
                    <li key={index}>{usage}</li>
                  ))}
                </ul>
              </div>

              <div className="herb-section">
                <h3>Precautions</h3>
                <ul className="precautions">
                  {selectedHerb.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="herb-disclaimer">
            <p>
              <strong>Disclaimer:</strong> This information is for educational purposes only. 
              Consult with a qualified Ayurvedic practitioner or healthcare provider before 
              using any herbs, especially if you have medical conditions or take medications.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HerbsGuide;