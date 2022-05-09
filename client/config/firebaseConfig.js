import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDggYCQuvru7pvl28RArVRjub0A0efpO0",
    authDomain: "tablefg-831f9.firebaseapp.com",
    projectId: "tablefg-831f9",
    storageBucket: "tablefg-831f9.appspot.com",
    messagingSenderId: "937820153111",
    appId: "1:937820153111:web:33251f3eb5863857268352",
    measurementId: "G-EEXEHC19DD"
  };

  initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();

  export { db, auth };