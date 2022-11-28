import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";
import { useEffect, useState, useCallback } from "react";
import { RootStackScreenProps } from "../types";
import BackgroundScreen2 from "./BackgroundScreen2";
import Card from "../components/UI/Card";
import GoBackBtn from "../components/UI/GoBackBtn";
import { accent, primary } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import RoutineDetailList from "../components/Calendar/Routine/RoutineDetailList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { boldWelcome } from "../components/Data/fontFamilyObject";

export default function MyPillsScreen({ navigation }: any) {
  // RootStackScreenProps<"MyPills">
  const [userId, setUserId] = useState(0);
  const getMyId = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
  };
  const addRoutinePillHandler = () => {
    navigation.navigate("Search", { userId: userId });
  };

  useFocusEffect(
    useCallback(() => {
      getMyId();

      // return () => {

      // };
    }, [userId])
  );

  return (
    <BackgroundScreen2>
      <Card>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginTop: 3 }}>
                <GoBackBtn onPress={() => navigation.pop()} size={33} />
              </View>

              <View style={styles.title}>
                <Text style={{ ...styles.text, ...boldWelcome }}>
                  내가 섭취중인 영양제
                </Text>
              </View>
            </View>
            <Pressable onPress={addRoutinePillHandler}>
              <Ionicons name="add-circle-sharp" size={35} color={primary} />
            </Pressable>
          </View>
          <ScrollView style={styles.myPillsContainer}>
            <RoutineDetailList />
          </ScrollView>
        </View>
      </Card>
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },

  myPillsContainer: {
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    // marginTop: 20,
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  title: {
    marginStart: 10,
    // paddingHorizontal: 10,

    paddingVertical: 7,
    borderRadius: 30,
    // backgroundColor: "#FFEFFC",
    // backgroundColor: accent,
  },
  text: {
    fontSize: 25,
  },
});
