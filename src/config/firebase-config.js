// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEnSCwOI3IrmxV5gjc9wbpgL1giKVtI1I",
  authDomain: "deskstop-ddc43.firebaseapp.com",
  projectId: "deskstop-ddc43",
  storageBucket: "deskstop-ddc43.firebasestorage.app",
  messagingSenderId: "441531143894",
  appId: "1:441531143894:web:67b882fc88ad2e3f3adb77",
  measurementId: "G-SFLPHNCVG7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
