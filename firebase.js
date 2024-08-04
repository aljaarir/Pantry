// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_6RPYEC8riNKG770ObojtqjWAU_S4wmE",
  authDomain: "hs-pantryapp-4ec57.firebaseapp.com",
  projectId: "hs-pantryapp-4ec57",
  storageBucket: "hs-pantryapp-4ec57.appspot.com",
  messagingSenderId: "938600234294",
  appId: "1:938600234294:web:5330ba4d52fb43fbee4797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore}