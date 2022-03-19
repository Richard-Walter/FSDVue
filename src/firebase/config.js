// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator  } from 'firebase/auth'

const USE_EMULATOR = process.env.USE_EMULATOR

const firebaseConfig = {
    apiKey: "AIzaSyB-s0YjEWzPuUjv35k6zTHoyWFL5SS9mUo",
    authDomain: "flight-sim-discovery.firebaseapp.com",
    projectId: "flight-sim-discovery",
    storageBucket: "flight-sim-discovery.appspot.com",
    messagingSenderId: "115028745364",
    appId: "1:115028745364:web:b0e14166e86084ffe6a881",
    measurementId: "G-VVV7WMLY1N"
  };

   //init firebase services
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore()
  const auth = getAuth()

  // If on localhost, use all firebase services locally
if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8090);
  connectAuthEmulator(auth, "http://localhost:9099");
  // add more services as described in the docs: https://firebase.google.com/docs/emulator-suite/connect_firestore
}


  export {db, auth}