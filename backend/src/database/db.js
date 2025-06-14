// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-WRh_UV1zzpa3IBU1iUJbWWMd4CTli4s",
  authDomain: "v55team22.firebaseapp.com",
  projectId: "v55team22",
  storageBucket: "v55team22.firebasestorage.app",
  messagingSenderId: "435225844549",
  appId: "1:435225844549:web:7e92da95e37a169dfbfc2c",
  measurementId: "G-42XCNSX7BJ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
