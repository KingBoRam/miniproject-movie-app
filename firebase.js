// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "themovies-a075b.firebaseapp.com",
  projectId: "themovies-a075b",
  storageBucket: "themovies-a075b.appspot.com",
  messagingSenderId: "267771447145",
  appId: "1:267771447145:web:738c5132b3ba2de7999ff8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
