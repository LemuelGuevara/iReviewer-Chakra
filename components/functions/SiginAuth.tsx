import firebase from "../../app/firebaseApp";
import { auth } from "../../app/firebaseApp";

export default async function signinAuth() {
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log({ ...userCredentials.user });

    firebase.firestore().collection("users").doc(userCredentials.user?.uid).set({
      uid: userCredentials.user?.displayName,
      email: userCredentials.user?.email,
      name: userCredentials.user?.displayName,
      provider: userCredentials.user?.providerData[0]?.providerId,
      photourl: userCredentials.user?.photoURL,

      });
  }
