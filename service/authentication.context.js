import "react-native-get-random-values";
import React, { createContext, useContext, useState } from "react";
import { loginRequest } from "./authentication.service";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
function getFormattedDate() {
  const d = new Date();
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${(d.getFullYear() % 100).toString().padStart(2, "0")}`;
}
export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addMealFeedback, setAddMealFeeBack] = useState(undefined);
  const [mealPlan, setMealPlan] = useState([]);
  const [allSession, setAllSession] = useState([]);
  const [userName, setUserName] = useState("");
  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setInStorage("userId", u.user.uid);
        setIsLoading(false);
        // createUser();
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  };

  const setInStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
    }
  };
  const getFromStorage = async (value) => {
    const name = await AsyncStorage.getItem(value);
    return;
    try {
      if (name !== null) {
        console.log("retrieved successfully:", name);
        return name;
      } else {
        console.log("No stored yet.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving name:", error);
      return null;
    }
  };

  const onRegister = ({ email, password, confirmedPassword, name }) => {
    setIsLoading(true);
    if (password !== confirmedPassword) {
      setError("Error: Passwords do not match");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setInStorage("userId", u.user.uid);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(true);
      })
      .finally(() => {
        createUser({ name, email });
      });
  };

  const onLogout = async () => {
    await AsyncStorage.clear();
    signOut(auth).then(() => {
      setUser(null);
      setError([]);
    });
  };

  const addSession = async ({ name, calories }) => {
    const now = Date.now();
    const date = new Date();
    const uid = await AsyncStorage.getItem("userId");
    await setDoc(doc(db, "workoutProgress", `${dayName}${now}`), {
      name,
      calories,
      day: dayName,
      userId: uid,
      createdAt: date,
    });
  };

  const createUser = async ({ name, email }) => {
    const uid = await AsyncStorage.getItem("userId");
    await setDoc(doc(db, "users", email), {
      email,
      name,
      userId: uid,
    });
  };

  const addMeal = async (data) => {
    const { day } = data;
    const now = Date.now();
    const uid = await AsyncStorage.getItem("userId");
    await setDoc(doc(db, "mealsPlans", `${day}${now}`), {
      ...data,
      userId: uid,
      key: uuid(),
    })
      .then((res) => {
        setAddMealFeeBack(true);
      })
      .catch((err) => {
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

  const getUserName = async () => {
    const uid = await AsyncStorage.getItem("userId");
    const q = query(collection(db, "users"), where("userId", "==", uid));
    const user = await getDocs(q);
    const tempUser = [];
    user?.forEach((doc) => {
      tempUser.push(doc?.data());
    });
    // return tempUser[0]?.name;
    setUserName(tempUser[0]?.name);
    setInStorage("userName", tempUser[0]?.name);
  };

  const getAllSession = async () => {
    const uid = await AsyncStorage.getItem("userId");
    const q = query(
      collection(db, "workoutProgress"),
      where("userId", "==", uid)
    );
    const sessions = await getDocs(q);
    const tempSession = [];
    sessions?.forEach((doc) => {
      tempSession.push(doc?.data());
    });
    setAllSession(tempSession);
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
        setError,
        createUser,
        allSession,
        getFromStorage,
        getUserName,
        userName,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
