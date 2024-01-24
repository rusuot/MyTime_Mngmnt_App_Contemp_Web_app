//process env file created & does contain FIREBASE_APP configs...
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_API_KEY,
  authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_APP_PROJECT_ID ,
  storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.FIREBASE_APP_MESSAGING_SENDER_ID ,
  appId: process.env.FIREBASE_APP_APP_ID ,
};

//init firebase app through configs
initializeApp(firebaseConfig);

//declare db which gets Firestore
const db = getFirestore();

//declare auth which gets the AUTH
const auth = getAuth();

//use timestamp
const timestamp = Timestamp;
// export db, auth & timestamp to use in app
export { db, auth, timestamp };
