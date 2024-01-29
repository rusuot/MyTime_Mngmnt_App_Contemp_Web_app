//process env file created & does contain FIREBASE_APP configs...
// Received after Firebase db was created from: https://console.firebase.google.com/
// ***
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD3nEy7eJOLfygUpe2JrCFzb-VkxZc05Fk",
//   authDomain: "contemporary-web-app-6f54f.firebaseapp.com",
//   projectId: "contemporary-web-app-6f54f",
//   storageBucket: "contemporary-web-app-6f54f.appspot.com",
//   messagingSenderId: "815549909710",
//   appId: "1:815549909710:web:ef50f861e9674f7368de9f",
//   measurementId: "G-7SM38NPZGH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// ***

import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_APP_ID ,
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
