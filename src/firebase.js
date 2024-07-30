// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore methods
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBuQbqMpbSZGu1O-FWqF_-YUdLkxIp_IL4",
  authDomain: "flight-status-notify-32f37.firebaseapp.com",
  projectId: "flight-status-notify-32f37",
  storageBucket: "flight-status-notify-32f37.appspot.com",
  messagingSenderId: "760629100492",
  appId: "1:760629100492:web:c0478c550548d1b88e6769",
  measurementId: "G-VFMLPPC80W"
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
