import React, { useContext, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { BoldText, Button, CenterdView, HeaderText } from "../shared-component";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { CustomCountDown } from "./counter";
import { RoundedButton } from "./rounded-button";
import { AuthenticationContext } from "../../service/authentication.context";
import { imgSession } from "./group-list";

export const CurrentSession = ({ navigation }) => {
  const route = useRoute();
  const sessionDetails = route.params.currentWorkout;
  const [isPause, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { addSession } = useContext(AuthenticationContext);
  let imgSource = null;
  imgSource = imgSession?.[sessionDetails.name].uri;
  if (!sessionDetails) return <Text>Loading</Text>;
  return (
    <View>
      <CenterdView>
        <HeaderText>{sessionDetails.name}</HeaderText>
        <Text>{`You will burn`}</Text>
        <BoldText>{`${sessionDetails.calorie} calories`}</BoldText>
        <Text>{`at the end of this session`}</Text>
        <Image style={{ height: 200, width: 200 }} source={imgSource} />

        {isFinished ? (
          <BoldText>Congratulations 🎉 ! move to the next one</BoldText>
        ) : (
          <>
            <RoundedButton>
              <CustomCountDown
                isPaused={isPause}
                minutes={sessionDetails.value || 0}
                onEnd={() => {
                  addSession({
                    name: sessionDetails.name,
                    calories: sessionDetails.calorie,
                  });
                  setIsFinished(true);
                }}
              />
            </RoundedButton>

            <Button compact onPress={() => setIsPaused(!isPause)}>
              {isPause ? "Continue" : " Pause"}
            </Button>
            <Button
              compact
              onPress={() => {
                addSession({
                  name: sessionDetails.name,
                  calories: sessionDetails.calorie,
                });
                setIsFinished(true);
              }}
            >
              Exercice completed
            </Button>
          </>
        )}
      </CenterdView>
    </View>
  );
};
