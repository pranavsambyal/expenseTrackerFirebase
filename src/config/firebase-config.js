// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQN_bi7zq_N_pY4aRJqhM067mAFF_IDaI",
  authDomain: "expense-tracker-85a91.firebaseapp.com",
  projectId: "expense-tracker-85a91",
  storageBucket: "expense-tracker-85a91.appspot.com",
  messagingSenderId: "363575183502",
  appId: "1:363575183502:web:6b5ba0c76eb3070987e1df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)