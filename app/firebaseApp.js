import { initializeApp, getApp, getApps } from "firebase/app";
import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDjI0p8J4UilkRw8xXhh1jxWCsm1q_0nY",
  authDomain: "ireviewer-7dcf1.firebaseapp.com",
  projectId: "ireviewer-7dcf1",
  storageBucket: "ireviewer-7dcf1.appspot.com",
  messagingSenderId: "643878437693",
  appId: "1:643878437693:web:4e00d70edd53b10e5a3b54",
  measurementId: "G-G8G79H2H3H"
}

// const app = firebase.initializeApp(firebaseConfig)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

// export default app
export { db, storage }






