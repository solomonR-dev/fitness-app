import React, { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { RestaurantScreen } from "./src/screens/excercices.screen";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { LoginPage } from "./components/login/login.page";
import { SignUpPage } from "./components/signup/signup.page";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { app } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    auth;
  }, []);
  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
    return unsubscribe;
  }, []);
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="LoginPage"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "LoginPage") {
                iconName = focused ? "login" : "login";
              } else if (route.name === "SignUpPage") {
                iconName = focused ? "adduser" : "adduser";
              } else if (route.name === "Exercice") {
                iconName = focused ? "barschart" : "barschart";
              }
              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="LoginPage" options={{ title: "Login" }}>
            {(props) => <LoginPage {...props} extraData={"some Data"} />}
          </Tab.Screen>
          <Tab.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{ title: "Sign up" }}
          />
          <Tab.Screen
            name="Exercice"
            component={RestaurantScreen}
            options={{ title: "Choose an excercice" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  );
}
