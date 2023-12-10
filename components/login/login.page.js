import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import {
  ActionButton,
  Button,
  CenterdView,
  HeaderText,
  TextInput,
} from "../shared-component";

export const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <CenterdView>
        <Text>Hey there,</Text>
        <HeaderText>Welcome back</HeaderText>
      </CenterdView>
      <View></View>
      <TextInput
        mode="outlined"
        placeholder="Enter your email"
        label="Email"
        right={<TextInput.Icon icon="email" />}
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        mode="outlined"
        secureTextEntry
        placeholder="Enter your password"
        label="Password"
        right={<TextInput.Icon icon="eye" />}
        onChangeText={(e) => setPassword(e)}
      />
      <Button
        elevation={5}
        onPress={() => navigation.navigate("SignUpPage")}
        mode="contained-tonal"
      >
        Login
      </Button>
      <Button
        style={{ marginTop: "2px" }}
        elevation={5}
        onPress={() => navigation.navigate("SignUpPage")}
        mode="contained-tonal"
      >
        Register
      </Button>
    </View>
  );
};
