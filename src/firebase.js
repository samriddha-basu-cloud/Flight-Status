// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";  // Import Firestore methods
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDCbyeTiPh14Xy2Mw63I9r9dRnRSAdu9N0",
  authDomain: "flight-status-notify.firebaseapp.com",
  projectId: "flight-status-notify",
  storageBucket: "flight-status-notify.appspot.com",
  messagingSenderId: "774945646151",
  appId: "1:774945646151:web:489b40b3427b9db6d7b362",
  measurementId: "G-0C5DVZY80S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BAsqjSWNVzhbmrpPbq6XqCpi2R-U5f1hRObS5Le1MC_x9pLo8rvX8xPMX-6ZSRYYIMhfS7lj_d2RAZjMLEUIzXM' });
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };
