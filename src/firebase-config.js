import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  // apiKey: "process.env.REACT_APP_FIREBASE_API_KEY",
  // authDomain: "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN",
  // projectId: "process.env.REACT_APP_FIREBASE_PROJECT_ID",
  // storageBucket: "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET",
  // messagingSenderId: "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  // appId: "process.env.REACT_APP_FIREBASE_APP_ID",
  // measurementId: "process.env.REACT_APP_FIREBASE_MEASUREMENT_ID",
  apiKey: "AIzaSyBYUgqtIGfvsH3vzWdCVVG0F_SM5WVNap4",
  authDomain: "microblogger-11019.firebaseapp.com",
  projectId: "microblogger-11019",
  storageBucket: "microblogger-11019.appspot.com",
  messagingSenderId: "419236920624",
  appId: "1:419236920624:web:f6992a279b9a482eee9cf5",
  measurementId: "G-G54GVGQ95L",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const createUser = createUserWithEmailAndPassword;
export const logInUser = signInWithEmailAndPassword;
export const updateProfileCredentials = updateProfile;
export const authStateChange = onAuthStateChanged;
export const userPersistence = setPersistence;
export const fullPersistence = browserLocalPersistence;
export const signMeOut = signOut;
export const storage = getStorage(app);
