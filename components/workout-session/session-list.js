import React from "react";
import { FlatList, View } from "react-native";
import { BoldText, CenterdView, HeaderText } from "../shared-component";
import { Avatar, Card, Text } from "react-native-paper";
import { fullBody } from "./group-list";
import { formatTime } from "../../utils";

export const SessionList = ({ group, navigate }) => {
  const session = fullBody;
  const groupName = "Full body";
  const UniqCard = ({ item }) => {
    const { calorie, isTime, name, value } = item;
    return (
      <View>
        <Card style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
          <View
            style={{
              flex: 1,
              width: 650,
              alignItems: "flex-start",
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Avatar.Icon size={40} icon="google-fit" />
              <View style={{ marginLeft: 20 }}>
                <BoldText>{name}</BoldText>
                <Text>{isTime ? formatTime(value) : value + "x"}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexGrow: 1,
              }}
            >
              <Avatar.Icon size={40} icon="arrow-right-circle" />
            </View>
          </View>
        </Card>
      </View>
    );
  };
  return (
    <View>
      <CenterdView>
        <HeaderText>{groupName}</HeaderText>
      </CenterdView>
      <FlatList
        data={session}
        renderItem={({ item }) => <UniqCard item={item} />}
        keyExtractor={(e) => e.name}
      />
    </View>
  );
};
