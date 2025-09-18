// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfjVx5bVgj15gZuKgFj0A5WIe9V1SKi2U",
  authDomain: "todo-bcd40.firebaseapp.com",
  projectId: "todo-bcd40",
  storageBucket: "todo-bcd40.firebasestorage.app",
  messagingSenderId: "760332558995",
  appId: "1:760332558995:web:0d0c77346c0af68d86e366",
  measurementId: "G-7SGRECV2K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics);

export const db = getFirestore(app);