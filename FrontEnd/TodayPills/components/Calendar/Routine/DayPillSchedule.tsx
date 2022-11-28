import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteZero } from "../../functions/deleteZero";
import { getDayOfWeek } from "../../functions/getDayOfWeek";
import { useState, useCallback } from "react";
import RoutineItem from "./RoutineItem";
import { accent, primary, secondary } from "../../../constants/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fetchAllRoutineSupplements } from "../../../API/routineAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchEachMyRoutine } from "../../../API/calendarAPI";
import { useRecoilState } from "recoil";
import { pillRoutineCheckChangeState } from "../../../Recoil/atoms/calendar";
import { boldWelcome } from "../../Data/fontFamilyObject";
import { strTimeToNum } from "../../functions/strTimeToNum";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { getDateStr } from "../../functions/getDateStr";
import { FontAwesome } from "@expo/vector-icons";
export interface PillScheduleProps {
  selectedDate: string;
}

const days = ["no", "월", "화", "수", "목", "금", "토", "일"];
const todayDateNumber = parseInt(getDateStr(new Date()).split("-").join(""));
export default function DayPillSchedule({ selectedDate }: PillScheduleProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckedChange, setIsCheckedChange] = useRecoilState(
    pillRoutineCheckChangeState
  );
  const navigation = useNavigation<any>();
  const [userId, setUserId] = useState(0);
  const [dayId, setDayId] = useState(0);
  const [dayStrOfWeek, setDayStrOfWeek] = useState("");
  const [pillRoutine, setPillRoutine] = useState([]);
  const [pillRoutineCheck, setPillRoutineCheck] = useState([]);
  const [isCheckVisible, setIsCheckVisible] = useState(true);
  // const dayString = `${deleteZero(selectedDate.slice(5, 7))}월 ${deleteZero(
  //   selectedDate.slice(8, 10)
  // )}일 ${dayStrOfWeek}`;
  const dayString = `${deleteZero(selectedDate.slice(5, 7))}월 ${deleteZero(
    selectedDate.slice(8, 10)
  )}일 ${dayStrOfWeek}요일`;
  const addRoutineHandler = () => {
    navigation.navigate("MyPills", { userId: userId });
  };

  const getMyEachRoutine = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));

    const dayOfWeek = getDayOfWeek(selectedDate);
    setDayStrOfWeek(dayOfWeek);
    setDayId(days.indexOf(dayOfWeek));
    const eachMyRoutine = await fetchEachMyRoutine(
      userId,
      selectedDate,
      days.indexOf(dayOfWeek)
    );
    // const visibleRoutineList = eachMyRoutine.filter((eachRoutine: any) => {
    //   return !eachRoutine.deletedSince;
    // });
    eachMyRoutine.sort((a: any, b: any) => {
      if (strTimeToNum(a.time) > strTimeToNum(b.time)) return 1;
      if (strTimeToNum(a.time) === strTimeToNum(b.time)) return 0;
      if (strTimeToNum(a.time) < strTimeToNum(b.time)) return -1;
    });

    setPillRoutine(eachMyRoutine);
  };

  useFocusEffect(
    useCallback(() => {
      const dayOfWeek = getDayOfWeek(selectedDate);
      // setDayStrOfWeek(dayOfWeek);
      // setDayId(days.indexOf(dayOfWeek));
      const judgeIsFutureOrNot = (selectedDateStr: string) => {
        const selectedDateNumber = parseInt(
          selectedDateStr.split("-").join("")
        );
        // console.warn(todayDateNumber, selectedDateNumber);
        return todayDateNumber < selectedDateNumber;
      };
      if (judgeIsFutureOrNot(selectedDate)) {
        setIsCheckVisible(false);
      } else {
        setIsCheckVisible(true);
      }
      getMyEachRoutine();
      setIsLoading(false);
      // }, [userId, isCheckedChange, selectedDate, dayId, dayStrOfWeek])
    }, [userId, selectedDate, isCheckedChange])
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.container}>
          <View style={styles.eachDateContainer}>
            <View
              style={{
                ...styles.takenDateContainer,
                // backgroundColor: isCheckVisible ? accent : "#B7B7B7",
                borderColor: isCheckVisible ? accent : "#B7B7B7",
              }}
            >
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={isCheckVisible ? accent : "#B7B7B7"}
              />
              {/* <FontAwesome name="calendar-check-o" size={24} color="white" /> */}
              <Text
                style={{
                  ...styles.takenDate,
                  color: isCheckVisible ? accent : "#B7B7B7",
                  ...boldWelcome,
                }}
              >
                {dayString}
              </Text>
            </View>
            <Pressable onPress={addRoutineHandler}>
              <MaterialCommunityIcons
                name="pencil-circle"
                size={35}
                color={primary}
              />
            </Pressable>
          </View>

          <View style={styles.pillRoutineContainer}>
            {pillRoutine.map((rout, idx) => (
              <RoutineItem
                key={idx}
                time={rout.time}
                routineId={rout.routineId}
                pillId={rout.supplementId}
                selectedDate={selectedDate}
                cnt={rout.tablets}
                taken={rout.taken}
                calendarId={rout.calendarId}
                isCheckVisible={isCheckVisible}
                // changeCheckHandler={changeCheckHandler}
              />
            ))}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 2,
    // backgroundColor: "red",
    // minHeight: 200,
  },
  eachDateContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  takenDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 30,
    // borderWidth: 1.5,
    // backgroundColor: "#FFEFFC",
    // backgroundColor: accent,
  },
  takenDate: {
    fontSize: 20,
    marginLeft: 5,
    // color: "white",
    letterSpacing: 1,
    // color: accent,
    // paddingHorizontal: 25,
  },
  pillRoutineContainer: {
    minHeight: 200,
    marginTop: 10,
  },
});
