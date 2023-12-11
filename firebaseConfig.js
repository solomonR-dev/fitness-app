import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPBEDr7R8wC8mQxK_YP-muMfXX8ORYz8Y",
  authDomain: "fitnessapp-7fbfd.firebaseapp.com",
  projectId: "fitnessapp-7fbfd",
  storageBucket: "fitnessapp-7fbfd.appspot.com",
  messagingSenderId: "734683270344",
  appId: "1:734683270344:web:a77e20d4d006c75dce29fd",
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
export { app, auth, db };
