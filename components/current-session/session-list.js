import React from "react";
import { View } from "react-native";
import { CenterdView } from "../shared-component";
import { Card, Text } from "react-native-paper";

export const ListSession = ({ name = "Full body list" }) => {
  return (
    <View>
      <CenterdView>
        <Text>{name}</Text>
      </CenterdView>
      <Card>
        <View style={{ flexDirection: "row" }}>
          <Text>Full body</Text>

          <Text>Full body</Text>

          <Text>Full body</Text>
        </View>
      </Card>
    </View>
  );
};
