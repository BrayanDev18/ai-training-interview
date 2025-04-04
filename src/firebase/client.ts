import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBcrpHI59dii-DJpKgFGYR9oC8h5EsW0-I",
  authDomain: "ai-training-interview.firebaseapp.com",
  projectId: "ai-training-interview",
  storageBucket: "ai-training-interview.firebasestorage.app",
  messagingSenderId: "388498303647",
  appId: "1:388498303647:web:380e2ee16428d21d4610aa",
  measurementId: "G-34N7W4TRJV"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
