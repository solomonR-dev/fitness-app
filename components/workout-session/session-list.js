import React from "react";
import { FlatList, View } from "react-native";
import { BoldText, CenterdView, HeaderText } from "../shared-component";
import { Avatar, Card, Text } from "react-native-paper";
import { excerciceCategory, fullBody } from "./group-list";
import { formatTime } from "../../utils";
import { useRoute } from "@react-navigation/native";

export const SessionList = ({ group, navigation }) => {
  const route = useRoute();
  const groupName = route.params.excerciceCategory;
  const rawSessionData = excerciceCategory?.map((s, index) => {
    if (s.name === groupName) return s.items;
  });
  const session = rawSessionData.filter(Boolean)[0];
  const UniqCard = ({ item }) => {
    const { calorie, isTime, name, value, img } = item;
    return (
      <View>
        <Card
          onPress={() =>
            navigation.navigate("CurrentSession", {
              currentWorkout: item,
            })
          }
          style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        >
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
                <Text>
                  {isTime
                    ? `${formatTime(value) | `${calorie} calories`}`
                    : `${value}x | ${calorie} calories`}
                </Text>
              </View>
            </View>
            <View
              style={{
                // flex: 1,
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
