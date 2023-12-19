import React, { useState } from "react";
import { View } from "react-native";
import { CenterdView, HeaderText } from "../shared-component";
import { Text } from "react-native-paper";

export const CurrentSession = ({ name = "ABS" }) => {
  const [number, setNumber] = useState(0);
  const increment = function () {
    setNumber(number + 1);
    var animationUpdate = requestAnimationFrame(increment);
    if (number >= 500) {
      clearAnimationFrame(animationUpdate);
    }
  };
  requestAnimationFrame(increment);

  return (
    <View>
      <CenterdView>
        <HeaderText>Current session</HeaderText>
        <Text>{name}</Text>
      </CenterdView>
      <Text>{number}</Text>
    </View>
  );
};
