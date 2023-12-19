import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  setPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkWxqr3WzelBHF5J7lQJV66Gj6IxxxtPE",
  authDomain: "fitnessapp-80f22.firebaseapp.com",
  projectId: "fitnessapp-80f22",
  storageBucket: "fitnessapp-80f22.appspot.com",
  messagingSenderId: "825529135259",
  appId: "1:825529135259:web:91d0eaa1a456df6c4fd63e",
};

const app = initializeApp(firebaseConfig);
// const app = initializeApp({});

// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
export { app, auth, db };
