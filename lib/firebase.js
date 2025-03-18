// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"; // Import necessary auth functions
import { getFirestore } from "firebase/firestore"; // Import Firestore functions

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
const auth = getAuth(app);

// Initialize Firestore and export
const db = getFirestore(app);

// Export additional Firebase authentication methods
export { app, auth, db, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged };