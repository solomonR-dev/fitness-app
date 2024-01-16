import { Dimensions, View } from "react-native";
import { BoldText, CenterdView, HeaderText } from "../shared-component";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../service/authentication.context";

export const MyProfile = () => {
  const { getAllSession, allSession, userName, getUserName } = useContext(
    AuthenticationContext
  );
  console.log("allSession", allSession);
  useEffect(() => {
    getAllSession();
    getAllSession();
    getUserName();
  }, []);
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const caloriesByDay = Array(allDays.length).fill(0);
  allSession?.forEach((item) => {
    const dayIndex = allDays.indexOf(item.day);
    if (dayIndex !== -1) {
      caloriesByDay[dayIndex] += item.calories;
    }
  });
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundColor: "#9EC8B9",
    backgroundGradientFrom: "#9EC8B9",
    backgroundGradientTo: "#4C6793",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(61, 19, 23, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(27, 29, 30, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#513C37",
    },
  };
  const data = {
    labels: allDays,
    datasets: [
      {
        data: caloriesByDay,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Calories burnt last 7 days"],
  };
  return (
    <View>
      <CenterdView>
        <HeaderText style={{ padding: 10 }}>
          {`Hey ${userName}! view your progress`}
        </HeaderText>
      </CenterdView>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};
