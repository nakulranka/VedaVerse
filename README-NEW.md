# VedaVerse - AI-Powered Ayurvedic Healthcare Platform

A comprehensive web application that combines traditional Ayurvedic wisdom with modern technology to provide personalized healthcare guidance, doctor consultations, and wellness recommendations.

## 🌿 Features

### Core Functionality
- **Prakriti Assessment**: Interactive quiz to determine your Ayurvedic body constitution
- **Herb Database**: Comprehensive guide to Ayurvedic medicinal plants
- **Yoga & Pranayama**: Customized practices for your body type
- **Doctor Consultation**: Find and book appointments with certified practitioners
- **User Authentication**: Secure Firebase-based user accounts

### Technical Features
- **React 18**: Modern frontend framework with hooks
- **Material-UI**: Professional design system and components
- **Firebase Auth**: Secure user authentication and data storage
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Modern web browser
- Internet connection for Firebase

### Installation

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

## 📱 Usage Guide

### 1. Getting Started
- Create an account or sign in with email/password
- Complete your profile setup
- Take the Prakriti quiz to discover your dosha

### 2. Explore Features
- **Quiz**: 8-question assessment for body constitution analysis
- **Herbs**: Browse 6+ medicinal plants with detailed information
- **Yoga**: Practice poses and breathing techniques suitable for your dosha
- **Doctors**: Search and book consultations with Ayurvedic practitioners

### 3. Personalized Experience
- All recommendations are tailored to your dominant dosha
- Save your quiz results and track wellness progress
- Access personalized herb and yoga recommendations

## 🏗️ Project Structure

```
VedaVerse/
├── components/
│   ├── AuthDialog.jsx      # User authentication dialog
│   ├── Quiz.jsx           # Prakriti assessment component
│   ├── HerbsGuide.jsx     # Ayurvedic herbs database
│   ├── YogaGuide.jsx      # Yoga poses and pranayama
│   └── DoctorSearch.jsx   # Doctor booking system
├── App.jsx                # Main application component
├── index.js               # React entry point
├── index.html             # HTML template
├── firebase-config.js     # Firebase configuration
├── auth-service.js        # Authentication service
└── package.json           # Dependencies and scripts
```

## 🔧 Firebase Configuration

The app is pre-configured with Firebase:
- **Project ID**: vedaverse-app
- **Authentication**: Email/Password enabled
- **Database**: Firestore for user data storage
- **Hosting**: Ready for Firebase deployment

## 🎨 Available Components

### Quiz Component
- 8 comprehensive questions covering physical and mental traits
- Progress tracking with visual indicators
- Detailed results with dosha percentages
- Personalized recommendations based on constitution

### Herbs Guide
- 6 traditional Ayurvedic herbs with detailed profiles
- Search and filter functionality by dosha and category
- Usage instructions and precautions
- Benefits and scientific information

### Yoga Guide  
- 6+ yoga poses categorized by difficulty and dosha
- Breathing techniques (pranayama) for different constitutions
- Step-by-step instructions with safety precautions
- Filter by category, dosha, and difficulty level

### Doctor Booking
- Search certified Ayurvedic practitioners
- Filter by specialization, location, and ratings
- Multi-step booking process with calendar integration
- Appointment management and consultation types

## 🎯 Customization

### Adding New Herbs
Edit `components/HerbsGuide.jsx`:

```javascript
{
  id: 7,
  name: "New Herb",
  scientificName: "Scientific Name",
  category: "Category",
  dosha: ["Vata", "Pitta"],
  benefits: ["Benefit 1", "Benefit 2"],
  usage: "Usage instructions",
  precautions: "Safety information",
  description: "Detailed description"
}
```

### Adding Yoga Poses
Edit `components/YogaGuide.jsx`:

```javascript
{
  id: 7,
  name: "New Pose",
  sanskritName: "Sanskrit Name",
  category: "Standing",
  dosha: ["Kapha"],
  difficulty: "Beginner",
  duration: "1-2 minutes",
  benefits: ["Benefit 1", "Benefit 2"],
  instructions: ["Step 1", "Step 2"],
  precautions: "Safety notes"
}
```

### Theme Customization
Edit Material-UI theme in `App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#2E7D32' }, // Ayurvedic green
    secondary: { main: '#FF7043' }, // Warm orange
    background: { default: '#F8F9FA' }
  }
});
```

## 📊 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner  
- `npm run eject` - Ejects from Create React App

## 🔐 Authentication Flow

1. User clicks "Sign In" button
2. AuthDialog opens with Sign In/Sign Up tabs
3. User enters email and password
4. Firebase handles authentication securely
5. User state is managed across the application
6. Protected features become available after login

## 🌐 Responsive Design

The application is fully responsive with:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Optimized layouts with touch-friendly interactions
- **Mobile**: Stacked layouts and drawer navigation

## 🚢 Deployment Options

### Firebase Hosting
```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`

### Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🧪 Development Tips

- Use React DevTools for debugging
- Check browser console for authentication state
- Firebase Auth state changes are logged
- All components support hot reloading

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Authentication Error**
   - Verify API keys in `firebase-config.js`
   - Check if email authentication is enabled in Firebase Console
   - Ensure network connectivity

2. **Dependencies Not Installing**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - Check Node.js version compatibility

3. **App Not Starting**
   - Ensure Node.js version 16+ is installed
   - Check for port conflicts (default: 3000)
   - Verify all dependencies are installed

## 🔒 Security & Privacy

- All authentication handled by Firebase Auth
- User data encrypted and stored securely
- No sensitive information stored in local storage
- GDPR compliant data handling practices

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Ayurvedic practitioners and texts
- Firebase team for authentication services
- Material-UI team for the component library
- React community for excellent documentation
- Open source contributors and testers

## 📞 Support

For questions or support:
- Check browser console for error messages
- Verify Firebase configuration
- Ensure all dependencies are properly installed
- Review the troubleshooting section above

---

**Experience the wisdom of Ayurveda with modern technology! 🕉️**