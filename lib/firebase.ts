import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCMHjNhfMByGaMuNrSVHBAO55ER3MR5C3I",
  authDomain: "lexilearn-e7c1b.firebaseapp.com",
  projectId: "lexilearn-e7c1b",
  storageBucket: "lexilearn-e7c1b.appspot.com",
  messagingSenderId: "203271548411",
  appId: "1:203271548411:web:918745cac8d1d4ebe76f5e",
  measurementId: "G-JFSJ8Y6WF2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage, app };