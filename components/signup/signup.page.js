import React from "react";
import { Text, View } from "react-native";
import {
  Button,
  CenterdView,
  HeaderText,
  TextInput,
} from "../shared-component";
import { Icon } from "react-native-paper";
import { SvgXml } from "react-native-svg";

export const SignUpPage = () => {
  return (
    <View>
      <CenterdView>
        <Text>Hey there,</Text>
        <HeaderText>Create an Account</HeaderText>
      </CenterdView>

      <TextInput
        mode="outlined"
        label="First name"
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="Last name"
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="Email"
        right={<TextInput.Icon icon="email" />}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <Button
        style={{ marginTop: "4px" }}
        elevation={5}
        onPress={() => navigation.navigate("SignUpPage")}
        mode="contained-tonal"
      >
        Create an account
      </Button>
    </View>
  );
};
