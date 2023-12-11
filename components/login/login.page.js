import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import {
  Button,
  CenterdView,
  HeaderText,
  TextInput,
} from "../shared-component";
import { AuthenticationContext } from "../../service/authentication.context";

export const LoginPage = ({ navigation }) => {
  const { onLogin, error } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
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
  );
};
