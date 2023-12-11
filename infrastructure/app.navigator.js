import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RestaurantScreen } from "../src/screens/excercices.screen";
import { SessionList } from "../components/workout-session/session-list";
import { CurrentSession } from "../components/workout-session/current-session";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SignUpPage } from "../components/signup/signup.page";
import { LoginPage } from "../components/login/login.page";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppNavigator = () => {
  const ExcercicesScreen = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Exercice"
          component={RestaurantScreen}
          options={{ title: "Session list" }}
        />
        <Stack.Screen
          name="SessionList"
          component={SessionList}
          options={{ title: "Session List" }}
        />
        <Stack.Screen
          name="CurrentSession"
          component={CurrentSession}
          options={{ title: "Workout" }}
        />
      </Stack.Navigator>
    );
  };

  return (
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
          component={ExcercicesScreen}
          options={{ title: "Workout list" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
