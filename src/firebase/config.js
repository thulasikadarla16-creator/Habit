import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANRrwWimVT6YcxdNrB71cdh68pvIR_OT4",
  authDomain: "habit-tracker-84a61.firebaseapp.com",
  projectId: "habit-tracker-84a61",
  storageBucket: "habit-tracker-84a61.firebasestorage.app",
  messagingSenderId: "796008981581",
  appId: "1:796008981581:web:c9f57bb8602365c3f86804",
  measurementId: "G-BL8HMQ1V9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
