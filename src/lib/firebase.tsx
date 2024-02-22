// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGSelxHGyYWSW_06OwieaYHZRnxUbD7OI",
  authDomain: "biblioreads-fiverr.firebaseapp.com",
  projectId: "biblioreads-fiverr",
  storageBucket: "biblioreads-fiverr.appspot.com",
  messagingSenderId: "412134070577",
  appId: "1:412134070577:web:7fd6442d6d6cbcadc33810",
  measurementId: "G-TXX6JTRPBS"
};


// Initialize Firebase
const app = getApps().length ? getApp() :initializeApp(firebaseConfig);
const auth=getAuth();
const firestore = getFirestore(app);

export {auth,app,firestore}