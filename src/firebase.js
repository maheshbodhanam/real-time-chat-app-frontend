import firebaseConfig from './firebase-config.json';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
