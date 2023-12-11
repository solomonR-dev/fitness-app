import React from "react";
import { View } from "react-native";
import { CenterdView } from "../shared-component";

export const CurrentSession = (session = {}) => {
  const {
    name = "Warm up",
    isTime = true,
    value = "5",
    calorie = 20,
  } = session;
  return (
    <View>
      <CenterdView>
        <Text>Workout</Text>
      </CenterdView>
    </View>
  );
};
