import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBA23efa730qOc-BFzx23jkfoqSpm0uZHQ",
  authDomain: "trade-wheels.firebaseapp.com",
  projectId: "trade-wheels",
  storageBucket: "trade-wheels.firebasestorage.app",
  messagingSenderId: "1088732716165",
  appId: "1:1088732716165:web:f9766881baaf770a035dec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;