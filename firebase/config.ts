// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCFz9wKr98Jox3BjP3DEl1rxRgieySKIOo",
    authDomain: "flipy-flashcards.firebaseapp.com",
    projectId: "flipy-flashcards",
    storageBucket: "flipy-flashcards.appspot.com",
    messagingSenderId: "1248505269",
    appId: "1:1248505269:web:2e53506b95fc222d40bdfc"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }