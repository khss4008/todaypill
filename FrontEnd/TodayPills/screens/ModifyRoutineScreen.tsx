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

import { RootStackScreenProps } from "../types";
import BackgroundScreen2 from "./BackgroundScreen2";
import Card from "../components/UI/Card";
import GoBackBtn from "../components/UI/GoBackBtn";
import { useState, useCallback } from "react";
import { accent, primary } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import RoutineDetailList from "../components/Calendar/Routine/RoutineDetailList";
import ModifyRoutineItem from "../components/Calendar/Routine/ModifyRoutineItem";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { boldWelcome } from "../components/Data/fontFamilyObject";

export default function ModifyRoutineScreen({ navigation, route }: any) {
  // RootStackScreenProps<"MyPills">
  const prevRoutineDetail = {
    tablets: route.params?.tablets,
    days: route.params?.days,
    time: route.params?.time,
    pushAlarm: route.params?.pushAlarm,
    routineId: route.params?.routineId,
  };
  return (
    <BackgroundScreen2>
      <Card>
        <View style={styles.container}>
          <View style={styles.myPillsContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.backBtn}>
                <GoBackBtn onPress={() => navigation.pop()} size={33} />
              </View>
              <View>
                <Text style={{ ...styles.text, ...boldWelcome }}>
                  영양제 섭취{" "}
                  {route.params.update === "true" ? (
                    <Text>수정</Text>
                  ) : (
                    <Text>등록</Text>
                  )}
                </Text>
                {/* <Text style={styles.text}>{pillId}</Text> */}
              </View>
            </View>
            <ModifyRoutineItem
              navigation={navigation}
              pillId={route.params?.pillId}
              updateOrNot={route.params?.update}
              prevRoutineDetail={prevRoutineDetail}
            />
          </View>
        </View>
      </Card>
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    marginTop: 10,
    marginBottom: 80,
    marginHorizontal: 15,
  },
  backBtn: {
    // marginTop: 10,
  },
  myPillsContainer: {
    marginVertical: 10,
  },
  titleContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 25,
    marginLeft: 5,
    // fontWeight: "bold",
  },
});
