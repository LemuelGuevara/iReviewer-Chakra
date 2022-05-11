import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const clientCredentials = {
  apiKey: "AIzaSyDDjI0p8J4UilkRw8xXhh1jxWCsm1q_0nY",
  authDomain: "ireviewer-7dcf1.firebaseapp.com",
  projectId: "ireviewer-7dcf1",
  storageBucket: "ireviewer-7dcf1.appspot.com",
  messagingSenderId: "643878437693",
  appId: "1:643878437693:web:4e00d70edd53b10e5a3b54",
  measurementId: "G-G8G79H2H3H"
}

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
}

export const auth = firebase.auth();
export default firebase