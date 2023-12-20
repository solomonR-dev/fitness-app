import { View } from "react-native";
import { CenterdView, HeaderText } from "../shared-component";
import { Text } from "react-native-paper";

export const MyProfile = () => {
  return (
    <View>
      <CenterdView>{/* <HeaderText>My Profile</HeaderText> */}</CenterdView>
      <Text>Here is my profile</Text>
    </View>
  );
};
