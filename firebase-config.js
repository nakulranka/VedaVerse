// Firebase configuration for VedaVerse
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;