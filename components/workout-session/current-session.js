import React, { useContext, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { BoldText, Button, CenterdView, HeaderText } from "../shared-component";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { CustomCountDown } from "./counter";
import { RoundedButton } from "./rounded-button";
import { AuthenticationContext } from "../../service/authentication.context";
export const CurrentSession = ({ navigation }) => {
  const route = useRoute();
  const sessionDetails = route.params.currentWorkout;
  const [isPause, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { addData } = useContext(AuthenticationContext);
  return (
    <View>
      <CenterdView>
        <HeaderText>{sessionDetails.name}</HeaderText>
        <Text>{`You will burn`}</Text>
        <BoldText>{`${sessionDetails.calorie} calories`}</BoldText>
        <Text>{`at the end of this session`}</Text>
        <Image
          style={{ height: 200, width: 200 }}
          source={require("../../assets/test-workout.gif")}
        />
        {isFinished ? (
          <BoldText>Congratulations 🎉 ! move to the next one</BoldText>
        ) : (
          <>
            <RoundedButton>
              <CustomCountDown
                isPaused={isPause}
                minutes={sessionDetails.value || 0}
                onEnd={() => {
                  addData(sessionDetails.calorie);
                  setIsFinished(true);
                }}
              />
            </RoundedButton>
            <Button compact onPress={() => setIsPaused(!isPause)}>
              {isPause ? "Continue" : " Pause"}
            </Button>
          </>
        )}
      </CenterdView>
    </View>
  );
};
