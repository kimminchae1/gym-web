// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd_nWKqcAFZU1jGJNaRYGGH1N-0gWtIe0",
  authDomain: "gymcare-e0eac.firebaseapp.com",
  projectId: "gymcare-e0eac",
  storageBucket: "gymcare-e0eac.firebasestorage.app",
  messagingSenderId: "319485319378",
  appId: "1:319485319378:web:d1c79dd36255cc43a3f50b",
  measurementId: "G-9H5WX6YWQR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
