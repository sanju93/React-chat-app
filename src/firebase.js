// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATF2fQ_CxOQLgpkW2GXlc5hYAOd2jBjmg",
  authDomain: "chat-app-6cde5.firebaseapp.com",
  projectId: "chat-app-6cde5",
  storageBucket: "chat-app-6cde5.appspot.com",
  messagingSenderId: "605674401991",
  appId: "1:605674401991:web:7fbb13ae39865c846d8ee2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;