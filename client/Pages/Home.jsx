import { View, Text, StyleSheet, ScrollView, Image, TextInput, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Home(props) {

  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [foodType, setFoodType] = useState();
  const [diners, setDiners] = useState();

  const [foodListVisible, setFoodListVisible] = useState(false);
  const [dinersListVisible, setDinersListVisible] = useState(false);

  const foodTypes = [
    { key: 1, label: "Asian" },
    { key: 2, label: "Café" },
    { key: 3, label: "Dairy" },
    { key: 4, label: "Desserts" },
    { key: 5, label: "Fish" },
    { key: 6, label: "Indian" },
    { key: 7, label: "Italian" },
    { key: 8, label: "Mexican" },
    { key: 9, label: "Mediterranean" },
    { key: 10, label: "Pub" },
    { key: 11, label: "Meat" },
    { key: 12, label: "Vegetarian/Vegan" },
  ];

  const dinersList = [
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
    { key: 4, value: "4" },
    { key: 5, value: "5" },
    { key: 6, value: "6" },
    { key: 7, value: "7" },
    { key: 8, value: "8" },
    { key: 9, value: "9" },
    { key: 10, value: "10" },
    { key: 11, value: "11" },
    { key: 12, value: "12"},
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let heading = await Location.getHeadingAsync({});
    })();
  }, []);

  let text = "Searching for Location..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleFind = () => {
    if (location && foodType && diners) {
        props.navigation.navigate("Page1");
    } else {
        alert('Invalid Error');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
        <View style={styles.iconCon}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            style={styles.input}
            placeholder="Search By Location"
            onChangeText={setLocation}
            value={text}
          />
          <TouchableOpacity onPress={() => setFoodListVisible(true)}>
            <Text style={styles.input}>{foodType || "Type of Food"}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={foodListVisible}
            onRequestClose={() => setFoodListVisible(false)}
          >
            <View style={styles.modal}>
              {foodTypes.map((item) => (
                <TouchableOpacity style={styles.modalTO}
                  key={item.key}
                  onPress={() => {
                    setFoodType(item.label);
                    setFoodListVisible(false);
                  }}
                >
                  <Text style={styles.modalItem}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
          <TouchableOpacity onPress={() => setDinersListVisible(true)}>
            <Text style={styles.input}>{diners || "Diners Amount"}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={dinersListVisible}
            onRequestClose={() => setDinersListVisible(false)}
          >
            <View style={styles.modal}>
              {dinersList.map((item) => (
                <TouchableOpacity
                  style={styles.modalTO}
                  key={item.key}
                  onPress={() => {
                    setDiners(item.value);
                    setDinersListVisible(false);
                  }}
                >
                  <Text style={styles.modalItem}>{item.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
          <TouchableOpacity style={styles.btn} onPress={handleFind}>
              <Text style={styles.title}>Find</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#94B285",
    width: "100%",
    height: "100%",
  },
  iconCon: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  inputCon: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    margin: 30,
    padding: 20,
    marginTop: 80,
    height: 300,
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "75%",
    alignSelf: "center",
    verticalAlign: "middle",
    borderColor: "#B0B0B0",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  modal: {
    flex: 0.7,
    width: "40%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: "50%",
  },
  modalTO: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modalItem: {
    fontSize: 14,
  },
  btn: {
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    width: "75%",
    backgroundColor: "#B0B0B0",
    borderColor: "#838383",
    borderWidth: 3,
    margin: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
  },
});
