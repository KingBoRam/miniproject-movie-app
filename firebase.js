import {initializeApp} from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASEPROJECIT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const getUserInfo = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const updateUserProfile = (editInfo) => {
  return updateProfile(auth.currentUser, editInfo);
};

export const emailSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const emailSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const userSignOut = () => {
  signOut(auth)
    .then(() => {
      window.location.replace("/");
    })
    .catch((error) => {
      alert(error + "로그아웃에 실패했습니다...");
    });
};

export default app;
