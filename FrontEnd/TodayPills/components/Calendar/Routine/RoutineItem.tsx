import { StyleSheet, View, Text, Image, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { accent, primary, secondary } from "../../../constants/Colors";
import PillCard from "../../UI/PillCard";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchSupplementDetail } from "../../../API/supplementAPI";
import { checkMyRoutine, deleteMyRoutineCheck } from "../../../API/calendarAPI";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useRecoilState } from "recoil";
import { pillRoutineCheckChangeState } from "../../../Recoil/atoms/calendar";
import { boldWelcome, regularWelcome } from "../../Data/fontFamilyObject";
import { getDateStr } from "../../functions/getDateStr";

export interface RoutineProps {
  key: number;
  time: string;
  routineId: number;
  pillId: number;
  // image: string;
  // brand: string;
  // name: string;
  cnt: number;
  selectedDate: string;
  taken: boolean;
  calendarId: number;
  isCheckVisible: boolean;
  // changeCheckHandler: () => void;
}

export default function RoutineItem({
  time,
  // image,
  // brand,
  // name,
  routineId,
  pillId,
  cnt,
  selectedDate,
  taken,
  calendarId,
  isCheckVisible,
}: // changeCheckHandler,
RoutineProps) {
  const [isCheckedChange, setIsCheckedChange] = useRecoilState(
    pillRoutineCheckChangeState
  );

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detailInfo, setDetailInfo] = useState({
    brand: "",
    name: "",
    image: "",
  });

  const [userId, setUserId] = useState(0);
  // const [pillRoutine, setPillRoutine] = useState(dummyRoutine);
  const [eachCalendarId, setEachCalendarId] = useState(calendarId);

  const deleteCheckHandler = async () => {
    setIsChecked(false);
    await deleteMyRoutineCheck(eachCalendarId);
    console.warn(calendarId, "캘린더 삭제");
    setIsCheckedChange(!isCheckedChange);
    // changeCheckHandler();
  };
  const checkHandler = async () => {
    setIsChecked(true);
    const calendarTempId: number = await checkMyRoutine(
      routineId,
      selectedDate,
      userId
    );
    console.warn(calendarTempId, "캘린더 아이디");
    setEachCalendarId(calendarTempId);
    // changeCheckHandler();
    setIsCheckedChange(!isCheckedChange);
  };

  const getPillDetail = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const eachPillDetail = await fetchSupplementDetail(pillId);
    setDetailInfo({
      brand: eachPillDetail.brand,
      name: eachPillDetail.name,
      image: eachPillDetail.image,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getPillDetail();

      setIsChecked(taken);
      setIsLoading(false);
      // console.warn(selectedDate, taken);
    }, [userId, pillId, taken, calendarId])
  );
  return (
    <View style={styles.outerContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View>
            <Text style={{ ...styles.time, ...boldWelcome }}>{time}</Text>
          </View>

          <PillCard height={100} width={"90%"} bgColor={"white"}>
            <View style={styles.routineContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: detailInfo.image }}
                  style={styles.pillImage}
                />
              </View>
              <View style={styles.pillDetailContainer}>
                <Text style={{ ...styles.brand, ...boldWelcome }}>
                  {detailInfo.brand}
                </Text>
                <Text
                  style={{
                    ...boldWelcome,
                    fontSize: detailInfo.name.length > 22 ? 13 : 15,
                    letterSpacing: 0.5,
                  }}
                >
                  {detailInfo.name}
                </Text>
                <Text style={{ ...styles.cnt, ...boldWelcome }}>{cnt}정</Text>
              </View>
              {isCheckVisible && (
                <View style={styles.check}>
                  {isChecked ? (
                    <Pressable onPress={deleteCheckHandler}>
                      <AntDesign name="checkcircle" size={30} color={primary} />
                    </Pressable>
                  ) : (
                    <Pressable onPress={checkHandler}>
                      <AntDesign
                        name="checkcircleo"
                        size={30}
                        color="#B7B7B7"
                      />
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </PillCard>
        </>
      )}

      {/* <Text style={styles.takenDate}></Text>
      <View style={styles.pillRoutineContainer}>
     
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 15,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#edfbf9",
  //   // backgroundColor: "white",
  //   // alignItems: "center",
  //   // justifyContent: "center",
  //   // borderWidth: 2,
  //   elevation: 4,
  //   height: 75,
  //   marginHorizontal: 30,
  //   marginVertical: 10,
  //   borderRadius: 10,
  // },
  routineContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-around",
    padding: 10,
  },
  imageContainer: {
    width: "20%",
    height: "100%",
  },
  pillImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  pillDetailContainer: {
    width: "55%",
    marginHorizontal: 18,
    // height: "80%",
    justifyContent: "space-between",
  },
  check: {
    // width: "20%",
    // height: "100%",
    justifyContent: "center",
  },
  brand: {
    color: "#B7B7B7",
    fontSize: 10,
    // fontWeight: "bold",
  },
  name: {
    // fontSize: 15,
    // fontWeight: "bold",
  },
  cnt: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 10,
    letterSpacing: 1,
    // fontWeight: "bold",
    paddingHorizontal: 3,
  },
  time: {
    fontSize: 15,
    // fontWeight: "900",

    color: primary,
    // color: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 25,
  },
  pillRoutineContainer: {
    minHeight: 200,
  },
});
