import React, { useState, useContext } from "react";
import { Text, View } from "react-native";
import {
  Button,
  CenterdView,
  HeaderText,
  TextInput,
} from "../shared-component";
import { AuthenticationContext } from "../../service/authentication.context";

import { Icon } from "react-native-paper";
import { SvgXml } from "react-native-svg";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { onRegister } = useContext(AuthenticationContext);
  return (
    <View>
      <CenterdView>
        <Text style={{ padding: 10 }}>Hey there,</Text>
        <HeaderText>Create an Account</HeaderText>
      </CenterdView>
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
      <Button
        style={{ marginTop: "4px" }}
        elevation={5}
        onPress={() => {
          onRegister(email, password, confirmedPassword);
        }}
        mode="contained-tonal"
      >
        Create an account
      </Button>
    </View>
  );
};
