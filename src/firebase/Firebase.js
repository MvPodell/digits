// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl--FhOewFaht5uU_cV1WBs88tfeAhQxc",
  authDomain: "digits-c645b.firebaseapp.com",
  projectId: "digits-c645b",
  storageBucket: "digits-c645b.appspot.com",
  messagingSenderId: "837283212299",
  appId: "1:837283212299:web:5cf6da48c180a156386b0e",
  measurementId: "G-CP0R2XRYJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };