import { initializeApp } from "firebase";
import "firebase/firestore";

const firebase = initializeApp({
  apiKey: "AIzaSyC5Hy5RxbtOVE8-NMq97i2qYLthJF9oAKE",
  authDomain: "simplemart-65f29.firebaseapp.com",
  databaseURL: "https://simplemart-65f29.firebaseio.com",
  projectId: "simplemart-65f29",
  storageBucket: "simplemart-65f29.appspot.com",
  messagingSenderId: "965118886942",
  appId: "1:965118886942:web:9bb8bd24567aa4d973da0f",
  measurementId: "G-70EENL2TXK"
});

export const db = firebase.firestore();
export const auth = firebase.auth();

/*
export const db = app.database();
export const nameRef = db.ref("names");

export const db_firestore = app.firestore();
export const dataRef = db_firestore.ref("items");
*/
