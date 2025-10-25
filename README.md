# Prakriti Analyzer - Know Your Body Type

A comprehensive Ayurvedic body type analysis quiz built with React. Discover your unique dosha constitution (Vata, Pitta, Kapha) through an interactive questionnaire and receive personalized recommendations for diet, lifestyle, and wellness.

## 🌟 Features

- **Complete Prakriti Analysis**: 20 comprehensive questions covering physical, mental, and emotional traits
- **Interactive Quiz Interface**: Progress tracking, question navigation, and intuitive answer selection
- **Detailed Results**: Dosha percentages, constitution type, and visual analysis
- **Personalized Recommendations**: Custom dietary, lifestyle, and seasonal guidance
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful gradient designs, smooth animations, and accessible interface
- **Downloadable Reports**: Save your results as a text file
- **Share Functionality**: Share results on social media

## 🎯 What You'll Learn

- Your dominant dosha(s) and percentage breakdown
- Constitutional type (Vata, Pitta, Kapha dominant, dual, or tridoshic)
- Detailed characteristics of each dosha
- Personalized balancing tips and recommendations
- Dietary guidelines specific to your constitution
- Lifestyle practices for optimal health

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- **Desktop**: Full-featured experience with side-by-side layouts
- **Tablet**: Optimized grid layouts and touch-friendly interactions
- **Mobile**: Stacked layouts, larger touch targets, and simplified navigation

## 🧘 Ayurvedic Doshas

### Vata (Air + Space)
- **Qualities**: Dry, Cold, Light, Mobile, Rough
- **Characteristics**: Creative, energetic, quick-thinking
- **Imbalance**: Anxiety, restlessness, digestive issues

### Pitta (Fire + Water)
- **Qualities**: Hot, Sharp, Light, Liquid, Oily
- **Characteristics**: Intelligent, focused, natural leader
- **Imbalance**: Anger, inflammation, acidity

### Kapha (Earth + Water)
- **Qualities**: Heavy, Cold, Moist, Stable, Smooth
- **Characteristics**: Calm, stable, strong immunity
- **Imbalance**: Lethargy, weight gain, congestion

## 🎨 Design System

### Colors
- **Primary**: Warm brown (`#8B4513`) - representing earth element
- **Vata**: Deep brown (`#8B4513`) - air and space
- **Pitta**: Orange-red (`#FF6B35`) - fire and water
- **Kapha**: Blue-gray (`#4A90A4`) - earth and water
- **Background**: Warm cream (`#FFF8E1`) - natural warmth

### Typography
- **Font**: Poppins - modern, readable, and friendly
- **Hierarchy**: Clear heading levels with appropriate sizing
- **Accessibility**: High contrast ratios and readable sizes

## 📊 Scoring Logic

The quiz uses a sophisticated scoring system:

1. **Question Categories**: Physical build, digestion, sleep, emotions, etc.
2. **Dosha Assignment**: Each answer corresponds to Vata, Pitta, or Kapha
3. **Score Calculation**: Points accumulated for each dosha
4. **Percentage Analysis**: Relative strength of each dosha
5. **Constitution Determination**: Dominant, dual, or balanced constitution

## 🛠️ Technical Stack

- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom styling with CSS variables and responsive design
- **JavaScript ES6+**: Modern JavaScript features
- **Local Storage**: Save quiz progress and results
- **Web APIs**: Share API, Download API, Clipboard API

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Welcome.js      # Landing page
│   ├── Quiz.js         # Main quiz interface
│   ├── Results.js      # Results display
│   └── Footer.js       # Site footer
├── data/               # Static data
│   └── quizData.js     # Questions and dosha information
├── utils/              # Utility functions
│   └── scoring.js      # Scoring and analysis logic
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🎯 Key Components

### Quiz Component
- Progress tracking and question navigation
- Answer selection with visual feedback
- Question overview with jump navigation
- Loading states and smooth transitions

### Results Component
- Tabbed interface (Overview, Recommendations, Detailed)
- Visual dosha chart with percentages
- Personalized recommendations
- Download and share functionality

### Scoring System
- Calculates dosha percentages
- Determines constitution type
- Generates personalized recommendations
- Assesses balance status

## 🌐 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Features

- Touch-friendly interface
- Swipe navigation support
- Optimized loading times
- Progressive enhancement
- Offline-ready (service worker ready)

## 🔒 Privacy & Disclaimer

- No personal data collection
- All processing done client-side
- Educational purposes only
- Not a substitute for medical advice
- Consult qualified practitioners for health concerns

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ancient Ayurvedic texts and practitioners
- Modern Ayurvedic research and practitioners
- React community for excellent documentation
- Google Fonts for the Poppins font family

## 📞 Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Contact: support@vedaverse.com
- Documentation: [docs.vedaverse.com](https://docs.vedaverse.com)

---

**Discover your unique constitution and embark on a journey of personalized wellness with Ayurvedic wisdom! 🕉️**