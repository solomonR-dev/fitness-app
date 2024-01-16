import "react-native-get-random-values";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { BoldText, Button, CenterdView } from "../shared-component";
import { SelectList } from "react-native-dropdown-select-list";
import { DataTable, Modal, TextInput } from "react-native-paper";
import { AuthenticationContext } from "../../service/authentication.context";
const daysData = [
  { key: "1", value: "Monday" },
  { key: "2", value: "Tuesday" },
  { key: "3", value: "Wednsday" },
  { key: "4", value: "Thursday" },
  { key: "5", value: "Friday" },
  { key: "6", value: "Saturday" },
  { key: "7", value: "Sunday" },
];
export const MealPlans = () => {
  const { addMeal, addMealFeedback, getMeal, mealPlan } = useContext(
    AuthenticationContext
  );
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [mealInput, setMealInput] = useState({
    name: "",
    calories: "",
    descriptions: "",
    day: "",
  });
  useEffect(() => {
    if (mealPlan) {
      getMeal();
    }
  }, []);
  useEffect(() => {
    return () => {
      setMealInput({
        name: "",
        calories: "",
        descriptions: "",
        day: "",
      });
      setNotification("");
    };
  }, []);
  useEffect(() => {
    if (addMealFeedback !== undefined) {
      //   setNotification(true);
      if (addMealFeedback === true) setNotification("Meal added successfully");
      if (addMealFeedback === false)
        setNotification("Something went wrong please try again");
    }
  }, [addMealFeedback]);
  useEffect(() => {
    getMeal();
  }, [visible]);
  const toggleModal = () => setVisible(!visible);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [items] = useState([
    {
      key: 1,
      day: "Monday",
      name: "Cupcake",
      calories: 356,
    },
    {
      key: 2,
      day: "Tuesday",
      name: "Eclair",
      calories: 262,
    },
    {
      key: 3,
      day: "Wednesday",
      name: "Frozen yogurt",
      calories: 159,
    },
    {
      key: 4,
      day: "Thursday",
      name: "Gingerbread",
      calories: 305,
    },
    {
      key: 5,
      day: "Friday",
      name: "Gingerbread",
      calories: 305,
    },
    {
      key: 6,
      day: "Saturday",
      name: "Gingerbread",
      calories: 305,
    },
    {
      key: 7,
      day: "Sunday",
      name: "Gingerbread",
      calories: 305,
    },
  ]);

  return (
    <View>
      <Button mode="outlined" onPress={() => toggleModal()}>
        Add new meal
      </Button>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Day</DataTable.Title>
          <DataTable.Title>Meal</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
        </DataTable.Header>
        {mealPlan?.map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.day}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Modal
        dismissable={true}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {/* {notification?.length && <Text>{notification}</Text>} */}
        <View style={{ paddingTop: 120 }}>
          <Text
            onPress={hideModal}
            style={{ color: "blue", alignSelf: "flex-end" }}
          >
            Close
          </Text>
          <CenterdView>
            <BoldText>Meal plan</BoldText>
          </CenterdView>
          <TextInput
            value={mealInput.name}
            style={{ margin: 10 }}
            mode="outlined"
            label="Name"
            onChangeText={(e) => setMealInput((prev) => ({ ...prev, name: e }))}
          />
          <TextInput
            value={mealInput.calories}
            style={{ margin: 10 }}
            mode="outlined"
            label="Calories"
            onChangeText={(e) =>
              setMealInput((prev) => ({ ...prev, calories: e }))
            }
          />
          <TextInput
            value={mealInput.descriptions}
            style={{ margin: 10 }}
            mode="outlined"
            label="Description"
            //   placeholder="type here"
            onChangeText={(e) =>
              setMealInput((prev) => ({ ...prev, descriptions: e }))
            }
          />
          <SelectList
            placeholder="Select day"
            boxStyles={{ margin: 10 }}
            setSelected={(val) =>
              setMealInput((prev) => ({ ...prev, day: val }))
            }
            data={daysData}
            save="value"
          />
          <Button
            onPress={() => {
              addMeal({ ...mealInput });
              toggleModal();
            }}
            mode="outlined"
          >
            Save
          </Button>
        </View>
      </Modal>
    </View>
  );
};
