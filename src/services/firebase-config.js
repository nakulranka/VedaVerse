import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyASvybUhmC1F0f-xo6dvtbjFPiSkanXB-8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "vedaverse-app.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "vedaverse-app",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "vedaverse-app.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "371582194284",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:371582194284:web:c123e123e123e123e123e1",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;