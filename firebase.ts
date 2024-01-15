import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDzjMvf8fw6zUtsDBX1pbtK8JP9W2KVlvE",
  authDomain: "z-tempa.firebaseapp.com",
  projectId: "z-tempa",
  storageBucket: "z-tempa.appspot.com",
  messagingSenderId: "64280585753",
  appId: "1:64280585753:web:eae1a6aa991dcbb71aec88",
  measurementId: "G-HSNV8EWRYV"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {app, auth, db}