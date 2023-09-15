// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrh2EAaku1-jzt1UUcliygTkNQoNkgFFU",
    authDomain: "pesproj-ee8bb.firebaseapp.com",
    projectId: "pesproj-ee8bb",
    storageBucket: "pesproj-ee8bb.appspot.com",
    messagingSenderId: "707439040425",
    appId: "1:707439040425:web:59f2fd2ebe9d6a0eee16b8",
    measurementId: "G-6T9W49VJEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db=getFirestore(app)
export const auth = getAuth();
export default app;