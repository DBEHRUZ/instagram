import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuYfII6-3ySEbNygQfNGw4n9W_i916_no",
  authDomain: "instagramclone-1a415.firebaseapp.com",
  projectId: "instagramclone-1a415",
  storageBucket: "instagramclone-1a415.appspot.com",
  messagingSenderId: "1018321155321",
  appId: "1:1018321155321:web:dd07dcec5cf7c389c9de28",
  measurementId: "G-V5G4DSRH0K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { auth };
export default db;
