import React, { createContext, useContext, useState } from "react";
import { loginRequest } from "./authentication.service";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  const onRegister = (email, password, confirmedPassword) => {
    setIsLoading(true);
    if (password !== confirmedPassword) {
      setError("Error: Passwords do not match");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError([]);
    });
  };

  const addData = async (dailyBurn) => {
    var dateObject = new Date();
    var dayOfWeek = dateObject.getUTCDay();
    var daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var dayName = daysOfWeek[dayOfWeek];
    await setDoc(doc(db, "workoutProgress", dayName), {
      name: dayName,
      calories: dailyBurn,
    });
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        addData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
