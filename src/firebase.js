import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcDv0XyErM6eKRvl0-Y3VB3gf63nybIqE",
  authDomain: "budget-app-e5cff.firebaseapp.com",
  projectId: "budget-app-e5cff",
  storageBucket: "budget-app-e5cff.appspot.com",
  messagingSenderId: "678229052119",
  appId: "1:678229052119:web:528f27b59379fd49b8be92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
