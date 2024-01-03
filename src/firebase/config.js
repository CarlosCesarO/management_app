import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Firebase config aqui embaixo

const firebaseConfig = {
  apiKey: "AIzaSyB6Sn0-7ayf9xcg6P6WaVKQDvct3RhkR5k",
  authDomain: "getitdone-623d5.firebaseapp.com",
  projectId: "getitdone-623d5",
  storageBucket: "getitdone-623d5.appspot.com",
  messagingSenderId: "270097355047",
  appId: "1:270097355047:web:63aa33321b335bc9e11902",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Timestamp
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
