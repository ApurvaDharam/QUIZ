
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0ROl1hJp4gpVJq-zUP0HqdNrcInSVuJs",
  authDomain: "quiz-website-50ddb.firebaseapp.com",
  projectId: "quiz-website-50ddb",
  storageBucket: "quiz-website-50ddb.appspot.com",
  messagingSenderId: "1055362219336",
  appId: "1:1055362219336:web:4757e4381269845c79877d",
  measurementId: "G-WPTJY617EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth();
const db = getFirestore();
export {app, auth, db };
