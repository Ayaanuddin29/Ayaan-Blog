// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c641c.firebaseapp.com",
  projectId: "mern-blog-c641c",
  storageBucket: "mern-blog-c641c.appspot.com",
  messagingSenderId: "825445969394",
  appId: "1:825445969394:web:724a4f88f5b7b850004f6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);