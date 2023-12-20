import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ExercicesList } from "../src/screens/excercices.screen";
import { SessionList } from "../components/workout-session/session-list";
import { CurrentSession } from "../components/workout-session/current-session";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SignUpPage } from "../components/signup/signup.page";
import { LoginPage } from "../components/login/login.page";
import { AuthenticationContext } from "../service/authentication.context";
import { AccountSettings } from "../components/settings/account-settings";
import { MyProfile } from "../components/myprofile/myprofile.infos";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const ExcercicesScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ExercicesList"
          component={ExercicesList}
          options={{ title: "" }}
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
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ title: "My Profile" }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {
        <Tab.Navigator
          initialRouteName="LoginPage"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "LoginPage") {
                iconName = focused ? "login" : "login";
              } else if (route.name === "SignUpPage") {
                iconName = focused ? "adduser" : "adduser";
              } else if (route.name === "ExcercicesScreen") {
                iconName = focused ? "barschart" : "barschart";
              } else if (route.name === "Settings") {
                iconName = focused ? "setting" : "setting";
              } else if (route.name === "MyProfile") {
                iconName = focused ? "user" : "user";
              }
              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          {isAuthenticated ? (
            <>
              <Tab.Screen
                name="ExcercicesScreen"
                component={ExcercicesScreen}
                options={{ title: "Maxi-FIT" }}
              />
              <Tab.Screen
                name="MyProfile"
                component={MyProfile}
                options={{ title: "My Profile" }}
              />
              <Tab.Screen
                name="Settings"
                component={AccountSettings}
                options={{ title: "Settings" }}
              />
            </>
          ) : (
            <>
              <Tab.Screen name="LoginPage" options={{ title: "Login" }}>
                {(props) => <LoginPage {...props} extraData={"some Data"} />}
              </Tab.Screen>
              <Tab.Screen
                name="SignUpPage"
                component={SignUpPage}
                options={{ title: "Sign up" }}
              />
            </>
          )}
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
};
