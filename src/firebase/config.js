// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB-s0YjEWzPuUjv35k6zTHoyWFL5SS9mUo",
    authDomain: "flight-sim-discovery.firebaseapp.com",
    projectId: "flight-sim-discovery",
    storageBucket: "flight-sim-discovery.appspot.com",
    messagingSenderId: "115028745364",
    appId: "1:115028745364:web:b0e14166e86084ffe6a881",
    measurementId: "G-VVV7WMLY1N"
  };

  //init firebase
  initializeApp(firebaseConfig)

  //init firebase services
  const auth = getAuth()

  export {auth}