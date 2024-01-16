import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import {
  Button,
  CenterdView,
  HeaderText,
  TextInput,
} from "../shared-component";
import { AuthenticationContext } from "../../service/authentication.context";
const image = {
  uri: "https://tecafitness.com/wp-content/uploads/2023/01/shutterstock_1013366374-1300x900-1.jpg",
};
import { Icon } from "react-native-paper";
import { SvgXml } from "react-native-svg";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { onRegister, isLoading, error, setError, createUser } = useContext(
    AuthenticationContext
  );

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
          <HeaderText>Create an Account</HeaderText>
        </CenterdView>
        <TextInput
          value={name}
          mode="outlined"
          label="Name"
          right={<TextInput.Icon icon="account" />}
          onChangeText={(e) => setName(e)}
        />
        <TextInput
          value={email}
          mode="outlined"
          label="Email"
          right={<TextInput.Icon icon="email" />}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          value={password}
          mode="outlined"
          label="Password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          onChangeText={(e) => setPassword(e)}
        />
        <TextInput
          value={confirmedPassword}
          mode="outlined"
          label="Confirm password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          onChangeText={(e) => setConfirmedPassword(e)}
        />
        {error && (
          <CenterdView>
            <Text style={{ color: "red" }}>
              An error occured on registration, please try again
            </Text>
          </CenterdView>
        )}
        <Button
          style={{ marginTop: "4px" }}
          elevation={5}
          onPress={() => {
            onRegister({ email, password, confirmedPassword, name });
            // createUser({ name, email });
          }}
          mode="contained-tonal"
        >
          Create an account
        </Button>
      </View>
    </ImageBackground>
  );
};
