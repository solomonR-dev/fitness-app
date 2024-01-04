import "react-native-get-random-values";
import React, { createContext, useContext, useState } from "react";
import { loginRequest } from "./authentication.service";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
export const AuthenticationContext = createContext();
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
export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addMealFeedback, setAddMealFeeBack] = useState(undefined);
  const [mealPlan, setMealPlan] = useState([]);
  const [allSession, setAllSession] = useState([]);
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

  const addSession = async ({ name, calories }) => {
    await setDoc(doc(db, "workoutProgress", name), {
      name,
      calories,
      day: dayName,
      key: uuid(),
    });
  };

  const addMeal = async (data) => {
    const { day } = data;
    await setDoc(doc(db, "mealsPlans", day), {
      ...data,
      key: uuid(),
    })
      .then((res) => {
        console.log("res >>", res);
        setAddMealFeeBack(true);
      })
      .catch((err) => {
        console.log("err", err);
        setAddMealFeeBack(false);
      });
  };

  const getMeal = async (day) => {
    const meal = await getDocs(collection(db, "mealsPlans"));
    const tempArr = [];
    meal?.forEach((doc) => {
      tempArr.push(doc?.data());
    });
    setMealPlan(tempArr);
  };

  const getAllSession = async () => {
    const sessions = await getDocs(collection(db, "workoutProgress"));
    const tempArr = [];
    sessions?.forEach((doc) => {
      tempArr.push(doc?.data());
    });
    setAllSession(tempArr);
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
        addSession,
        addMeal,
        getMeal,
        addMealFeedback,
        mealPlan,
        getAllSession,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
