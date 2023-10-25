// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API_KEY",
  authDomain: "financial-n.firebaseapp.com",
  projectId: "financial-n",
  storageBucket: "financial-n.appspot.com",
  messagingSenderId: "869482768612",
  appId: "1:869482768612:web:b1e9101a527b4fe5f664f1"
};

// Initialize Firebase
return app = initializeApp(firebaseConfig);