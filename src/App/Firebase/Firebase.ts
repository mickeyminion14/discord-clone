import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlQN1dXhJmbV0gm9O40CI3Dy8-Nemtms8",
  authDomain: "discord-clone-1b089.firebaseapp.com",
  databaseURL: "https://discord-clone-1b089.firebaseio.com",
  projectId: "discord-clone-1b089",
  storageBucket: "discord-clone-1b089.appspot.com",
  messagingSenderId: "501684685942",
  appId: "1:501684685942:web:82ac8d8bb62e3d36d5e357",
  measurementId: "G-84VHCHSG34",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters(
  {
    prompt: "select_account",
  }
);
