import { Dimensions, View } from "react-native";
import { BoldText, CenterdView, HeaderText } from "../shared-component";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

export const MyProfile = () => {
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
    labels: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
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
          Hey ! view your progress
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
