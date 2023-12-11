import { signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../firebaseConfig";

export const loginRequest = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};
