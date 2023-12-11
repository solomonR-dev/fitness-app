import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Button, CenterdView } from "../shared-component";
import { AuthenticationContext } from "../../service/authentication.context";

export const AccountSettings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <CenterdView>
      <Button
        style={{ marginTop: 200 }}
        elevation={5}
        onPress={() => onLogout()}
        mode="contained-tonal"
      >
        Log out
      </Button>
    </CenterdView>
  );
};
