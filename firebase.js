// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCrNx1pFYwhYoGZCOHUWUTvhl-MVvSIBpc",
  authDomain: "inventory-management-1faa8.firebaseapp.com",
  projectId: "inventory-management-1faa8",
  storageBucket: "inventory-management-1faa8.appspot.com",
  messagingSenderId: "486510032141",
  appId: "1:486510032141:web:4d458a56c2dbc25d1fac44",
  measurementId: "G-6JHF5LJ4ES"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };

