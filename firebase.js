// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mini-movie-app-54bdd.firebaseapp.com",
  projectId: "mini-movie-app-54bdd",
  storageBucket: "mini-movie-app-54bdd.appspot.com",
  messagingSenderId: "721337279705",
  appId: "1:721337279705:web:982546ecb33f3badd28ac8",
  measurementId: "G-QVEF001M7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
