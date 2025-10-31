# VedaVerse Setup Script - No Docker Required

## Quick Setup Instructions

### Prerequisites
1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **Git** - Download from [git-scm.com](https://git-scm.com/)

### Step 1: Set up the Frontend (React TypeScript)

```bash
# Navigate to your projects directory
cd c:\Projects

# Create new React TypeScript app
npx create-react-app vedaverse-frontend --template typescript
cd vedaverse-frontend

# Install required dependencies
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @reduxjs/toolkit react-redux react-router-dom
npm install react-hook-form @hookform/resolvers yup
npm install firebase axios

# Optional: Install Material-UI icons font
npm install @fontsource/roboto
```

### Step 2: Configure Firebase

Create `.env.local` file in the frontend root:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyASvybUhmC1F0f-xo6dvtbjFPiSkanXB-8
REACT_APP_FIREBASE_AUTH_DOMAIN=vedaverse-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=vedaverse-app
REACT_APP_FIREBASE_STORAGE_BUCKET=vedaverse-app.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=487346652887
REACT_APP_FIREBASE_APP_ID=1:487346652887:web:8737bd81c43f7294f79292
REACT_APP_FIREBASE_MEASUREMENT_ID=G-BJH807NNXD

# API Configuration (for future backend)
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Copy Components

Copy the following files from your existing Veda_Verse project:

**From `c:\Projects\Veda_Verse\src\components\`** to **`vedaverse-frontend\src\components\`**:
- Header.js → Header.tsx
- Welcome.js → Welcome.tsx  
- Quiz.js → Quiz.tsx
- Results.js → Results.tsx
- HerbsGuide.js → HerbsGuide.tsx
- YogaGuide.js → YogaGuide.tsx
- Footer.js → Footer.tsx
- All corresponding .css files

**From `c:\Projects\Veda_Verse\public\images\`** to **`vedaverse-frontend\public\images\`**:
- All image files (ashwagandha.jpg, neem.jpg, etc.)

### Step 4: Create Authentication Files

Create `src/config/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASvybUhmC1F0f-xo6dvtbjFPiSkanXB-8",
  authDomain: "vedaverse-app.firebaseapp.com",
  projectId: "vedaverse-app",
  storageBucket: "vedaverse-app.firebasestorage.app",
  messagingSenderId: "487346652887",
  appId: "1:487346652887:web:8737bd81c43f7294f79292",
  measurementId: "G-BJH807NNXD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

### Step 5: File Structure

Your final structure should look like:

```
vedaverse-frontend/
├── public/
│   ├── images/          # Copied from original project
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthDialog.tsx
│   │   ├── Header.tsx   # Converted from .js
│   │   ├── Welcome.tsx  # Converted from .js
│   │   ├── Quiz.tsx     # Converted from .js
│   │   ├── Results.tsx  # Converted from .js
│   │   ├── HerbsGuide.tsx
│   │   ├── YogaGuide.tsx
│   │   └── Footer.tsx
│   ├── config/
│   │   └── firebase.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   └── authService.ts
│   ├── App.tsx
│   └── index.tsx
├── .env.local           # Firebase configuration
└── package.json
```

### Step 6: Run the Application

```bash
# Start the development server
npm start

# Your app will open at http://localhost:3000
```

### Step 7: Test Authentication

1. Open http://localhost:3000
2. Click on authentication button
3. Try signing up with email/password
4. Check Firebase console for user creation

## What Works Now

✅ **Authentication**: Sign up/Sign in with email
✅ **Original Quiz**: Complete Prakriti analysis
✅ **Herbs Guide**: Interactive herb information  
✅ **Yoga Guide**: Dosha-specific yoga practices
✅ **Modern UI**: Material-UI design system
✅ **Responsive**: Works on mobile and desktop

## Future Enhancements (Backend Not Required Yet)

- User profile storage
- Health data tracking  
- AI-powered recommendations
- Doctor consultations
- Payment integration
- OCR for medical reports

## Troubleshooting

**Firebase Auth Issues:**
- Make sure email authentication is enabled in Firebase console
- Check browser console for errors
- Verify Firebase configuration keys

**Component Import Errors:**
- Convert .js files to .tsx
- Add proper TypeScript types
- Install missing dependencies

**Styling Issues:**
- Make sure CSS files are imported
- Check image paths are correct
- Verify Material-UI theme is applied

## Development Tips

1. **Start Simple**: Get authentication working first
2. **Convert Gradually**: Convert components from JS to TypeScript one by one
3. **Test Often**: Run `npm start` frequently to catch errors early
4. **Check Console**: Browser console shows helpful error messages

## Next Steps

1. Set up the frontend with above instructions
2. Test authentication and existing features
3. Plan backend API when ready for advanced features
4. Add health data input forms
5. Integrate AI services for personalized recommendations

The webapp will work perfectly without Docker - just React + Firebase for now!