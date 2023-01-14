// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import * as firebaseAdmin from 'firebase-admin';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUwSCWwNIe0bLaXNOskFw04BFCG4XWqRA",
  authDomain: "storemanager-9bb9e.firebaseapp.com",
  projectId: "storemanager-9bb9e",
  storageBucket: "storemanager-9bb9e.appspot.com",
  messagingSenderId: "354762013943",
  appId: "1:354762013943:web:2060ff58db6a23ed3267f2",
  measurementId: "G-40MQET78DW"
};

// Initialize Firebase
// const app = firebaseAdmin.initializeApp();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// const db = firebaseAdmin.firestore()

export {app, analytics, db}