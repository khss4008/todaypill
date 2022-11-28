// import EditScreenInfo from "../components/EditScreenInfo";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CalendarView from "../components/Calendar/CalendarView";
import DayPillSchedule from "../components/Calendar/Routine/DayPillSchedule";
import Card from "../components/UI/Card";
import { RootTabScreenProps } from "../types";
import { useState, useCallback } from "react";
import BackgroundScreen2 from "./BackgroundScreen2";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  boldWelcome,
  regularWelcome,
} from "../components/Data/fontFamilyObject";
// import { getDeviceToken } from "../utils/Notifications";

export default function CalendarScreen({
  navigation,
}: RootTabScreenProps<"Calendar">) {
  const [isLoading, setIsLoading] = useState(true);
  const [UserName, setUserName] = useState("");

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayString);

  const dateChangeHandler = (date: string) => {
    // getDeviceToken();
    // console.log(date, "date 받음");
    setSelectedDate(date);
  };
  const getNickname = async () => {
    const currentUserNickName = await AsyncStorage.getItem(
      "@storage_UserNickName"
    );
    setUserName(currentUserNickName);
  };

  useFocusEffect(
    useCallback(() => {
      getNickname();
      // return () => {

      // };
    }, [])
  );

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <BackgroundScreen2>
      <Card>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={{ ...styles.title, ...regularWelcome }}>
              <Text style={{ ...styles.name, ...boldWelcome }}>
                {UserName}{" "}
              </Text>
              님의 캘린더
            </Text>
            {/* <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          /> */}
            {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
          </View>
          <View style={styles.calendarOuterContainer}>
            <View style={styles.calendarContainer}>
              <CalendarView
                onChangeDate={dateChangeHandler}
                todayString={todayString}
              />
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <DayPillSchedule selectedDate={selectedDate} />
          </View>
        </ScrollView>
      </Card>
      {/* <View style={styles.titleContainer}></View> */}
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    // height: 0,
    paddingTop: 10,
    paddingBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  calendarOuterContainer: {
    height: 350,
    // backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarContainer: {
    height: "100%",
    // backgroundColor: "red",
    width: "90%",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 1,
  },
  name: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});
