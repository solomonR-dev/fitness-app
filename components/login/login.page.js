import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";
import { Text } from "react-native-paper";
import {
  Button,
  CenterdView,
  HeaderText,
  TextInput,
} from "../shared-component";
import backgroupImage from "../../assets/fitness-app-background";
import { AuthenticationContext } from "../../service/authentication.context";
const image = {
  uri: "https://tecafitness.com/wp-content/uploads/2023/01/shutterstock_1013366374-1300x900-1.jpg",
};
export const LoginPage = ({ navigation }) => {
  const { onLogin, error, isLoading, setError } = useContext(
    AuthenticationContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
    }, 5000); // 5 seconds in milliseconds
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);
  return (
    <ImageBackground source={image}>
      <View style={{ height: "100%" }}>
        {isLoading && <ActivityIndicator size="large" />}
        <CenterdView>
          <Text style={{ padding: 10 }}>Hey there,</Text>
          <HeaderText>Welcome back</HeaderText>
        </CenterdView>
        <View></View>
        <TextInput
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
          mode="outlined"
          placeholder="Enter your email"
          autoCapitalize="none"
          label="Email"
          right={<TextInput.Icon icon="email" />}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          value={password}
          textContentType="password"
          mode="outlined"
          secureTextEntry
          placeholder="Enter your password"
          label="Password"
          right={<TextInput.Icon icon="eye" />}
          onChangeText={(e) => setPassword(e)}
        />
        {error && (
          <CenterdView>
            <Text style={{ color: "red" }}>
              An error occured please try again. Check your email and password
            </Text>
          </CenterdView>
        )}
        <Button
          elevation={5}
          onPress={() => onLogin(email, password)}
          mode="contained-tonal"
        >
          Login
        </Button>
        {error[0] && <Text style={{ color: "red" }}>{error[0]}</Text>}

        <Button
          style={{ marginTop: "2px" }}
          elevation={5}
          onPress={() => navigation.navigate("SignUpPage")}
          mode="contained-tonal"
        >
          Register
        </Button>
      </View>
    </ImageBackground>
  );
};
