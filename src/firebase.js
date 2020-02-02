import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const instance = firebase.initializeApp({
  apiKey: "AIzaSyC5Hy5RxbtOVE8-NMq97i2qYLthJF9oAKE",
  authDomain: "simplemart-65f29.firebaseapp.com",
  databaseURL: "https://simplemart-65f29.firebaseio.com",
  projectId: "simplemart-65f29",
  storageBucket: "simplemart-65f29.appspot.com",
  messagingSenderId: "965118886942",
  appId: "1:965118886942:web:9bb8bd24567aa4d973da0f",
  measurementId: "G-70EENL2TXK"
});

export const firebaseglobal = instance;
export const db = instance.firestore();
export const auth = instance.auth();

export const timestamp = firebase.firestore.Timestamp;

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const TwitterProvider = new firebase.auth.TwitterAuthProvider();
