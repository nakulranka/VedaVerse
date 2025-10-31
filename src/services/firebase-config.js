import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASvybUhmC1F0f-xo6dvtbjFPiSkanXB-8",
  authDomain: "vedaverse-app.firebaseapp.com",
  projectId: "vedaverse-app",
  storageBucket: "vedaverse-app.firebasestorage.app",
  messagingSenderId: "371582194284",
  appId: "1:371582194284:web:c123e123e123e123e123e1",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;