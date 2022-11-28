import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Modal,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import { useRecoilState } from "recoil";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { accent, primary, secondary } from "../../../constants/Colors";
import PillCard from "../../UI/PillCard";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
// import BottomSheet from "reanimated-bottom-sheet";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CustomBtn from "../../UI/CustomBtn";
import WeekDayList from "./WeekDayList";
import * as Notifications from "expo-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { fetchSupplementDetail } from "../../../API/supplementAPI";
import {
  addMyRoutineSupplement,
  fetchAllRoutineSupplements,
  updateMyRoutineSupplement,
} from "../../../API/routineAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotifications from "./PushNotifications";
import { getDateStr } from "../../functions/getDateStr";
import { setNotification } from "../../functions/setNotification";
import { boldWelcome, regularWelcome } from "../../Data/fontFamilyObject";
import { takenWeekDaysState } from "../../../Recoil/atoms/calendar";
import { getDaysName } from "../../functions/getDaysName";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { cancelNotification } from "../../functions/cancelNotification";
// import Notifications from "../../../utils/Notifications";

export default function ModifyRoutineItem({
  navigation,
  pillId,
  updateOrNot,
  prevRoutineDetail,
}: any) {
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [takenDaysName, setTakenDaysName] = useState("");
  const [isDaySubmitted, setIsDaySubmitted] = useState(false);
  const [allMyRoutineList, setAllMyRoutineList] = useState([]);
  // const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

  const [supplementDetail, setSupplementDetail] = useState({
    name: "",
    brand: "",
    image: "",
    ingredients: "",
    bestTime: "",
    requiredCount: "",
  });
  const [pillCnt, setPillCnt] = useState(1);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [takenWeekDays, setTakenWeekDays] = useRecoilState(takenWeekDaysState);
  const [takenTime, setTakenTime] = useState("");
  const [isAM, setIsAM] = useState(true);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const submitModifyRoutineHandler = async () => {
    if (takenDaysName === "") {
      return Alert.alert("섭취 요일", "섭취 요일을 선택해주세요!");
    }

    const nowDateStr = getDateStr(new Date());
    let submitTakenTime = takenTime;
    if (!isAM) {
      const PMHour = parseInt(takenTime.slice(0, 2)) + 12;
      submitTakenTime = `${PMHour}:${takenTime.slice(3, 5)}`;
    }

    if (updateOrNot === "true") {
      await updateMyRoutineSupplement(
        userId,
        prevRoutineDetail.routineId,
        pillId,
        takenWeekDays.toString(),
        isAlarmEnabled,
        pillCnt,
        submitTakenTime,
        nowDateStr
      );
      if (prevRoutineDetail.pushAlarm) {
        cancelNotification(pillId.toString());
      }
    } else {
      let isExist = false;

      console.warn("새로 등록하는 영양제들!!!!!!!!!!!!!!!!!!!!!");

      allMyRoutineList.map((eachRoutine: any) => {
        if (eachRoutine.supplementId == pillId) {
          isExist = true;
          return;
        }
      });
      if (isExist) {
        Alert.alert(
          "중복 등록",
          "이미 등록된 영양제입니다! \n같은 영양제는 한 번만 등록할 수 있습니다."
        );
        return navigation.navigate("MyPills", { userId });
      }
      await addMyRoutineSupplement(
        userId,
        pillId,
        takenWeekDays.toString(),
        isAlarmEnabled,
        pillCnt,
        submitTakenTime,
        nowDateStr
      );
    }

    if (isAlarmEnabled) {
      // const tempAlarmDays = selectedRoutineDays.split(",");

      if (takenWeekDays.length === 7) {
        setNotification(
          pillId.toString(),
          "영양제 섭취 알람",
          `${supplementDetail.name} ${pillCnt}정을 드실 시간입니다!`,
          0,
          parseInt(submitTakenTime.substring(0, 2)),
          parseInt(submitTakenTime.substring(3, 5))
        );
      } else {
        takenWeekDays.map((dayId: number) => {
          setNotification(
            pillId.toString(),
            "영양제 섭취 알람",
            `${supplementDetail.name} ${pillCnt}정을 드실 시간입니다!`,
            dayId,
            parseInt(submitTakenTime.substring(0, 2)),
            parseInt(submitTakenTime.substring(3, 5))
          );
        });
      }
    }
    ToastAndroid.show(
      `영양제 섭취 ${updateOrNot === "true" ? "수정" : "등록"} 완료!`,
      2
    );
    navigation.navigate("MyPills", { userId });
    // setIsFinalSubmitted(true);
    // console.warn("제출함!!!!!!!!!!!!!!!!!!!!");
  };

  const getSupplementDetailAndAllRoutine = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const eachSupplementDetail = await fetchSupplementDetail(pillId);
    // if (eachSupplementDetail.bestTime.slice(0,2))
    if (updateOrNot === "false") {
      setTakenTime(timeConvert(eachSupplementDetail.bestTime));
      // setPillCnt(1);
    } else {
      setIsAlarmEnabled(prevRoutineDetail.pushAlarm);
      setPillCnt(prevRoutineDetail.tablets);
      setTakenTime(timeConvert(prevRoutineDetail.time));
    }
    setSupplementDetail(eachSupplementDetail);

    const allMyRoutines = await fetchAllRoutineSupplements(
      parseInt(currentUserId)
    );
    const visibleRoutineList = allMyRoutines.filter((eachRoutine: any) => {
      return !eachRoutine.deletedSince;
    });
    setAllMyRoutineList(visibleRoutineList);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const onChangeDaysName = (changedName: string) => {
    setTakenDaysName(changedName);
    // setIsDaySubmitted(false);
  };

  const handleTimeConfirm = (date: Date) => {
    // console.warn("A date has been picked: ", date);
    let hour = date.getHours();
    let minute = date.getMinutes().toString();
    setIsAMorPM(hour);
    if (hour > 12) {
      hour -= 12;
    }
    let hourString = hour.toString();

    if (minute.length === 1) {
      console.warn(minute);
      minute = "0" + minute;
    }
    if (hourString.length === 1) {
      hourString = "0" + hourString;
    }

    setTakenTime(`${hourString}:${minute}`);
    hideDatePicker();
  };

  const setIsAMorPM = (hour: number) => {
    if (hour > 12) {
      setIsAM(false);
    } else if (hour == 12) {
      setIsAM(false);
    } else {
      setIsAM(true);
    }
  };
  const timeConvert = (timeString: string) => {
    let hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);

    setIsAMorPM(hour);
    if (hour > 12) {
      hour -= 12;
    }

    let hourStr = hour.toString();
    if (hourStr.length === 1) {
      hourStr = "0" + hourStr;
    }
    return `${hourStr}:${minute}`;
  };
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  useFocusEffect(
    useCallback(() => {
      // getMyAllRoutineSupplements();
      getSupplementDetailAndAllRoutine();
      if (updateOrNot === "true") {
        const takenDaysArray = prevRoutineDetail.days
          .split(",")
          .map((day: string) => {
            return weekDays[parseInt(day) - 1];
          });
        setTakenDaysName(getDaysName(takenDaysArray));
      }
      setIsLoading(false);

      // return () => {

      // };
    }, [pillId])
  );

  const decreaseHandler = () => {
    setPillCnt((pillCnt) => (pillCnt > 1 ? pillCnt - 1 : 1));
  };
  const increaseHandler = () => {
    setPillCnt((pillCnt) => (pillCnt < 20 ? pillCnt + 1 : 20));
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView style={styles.outerContainer}>
          <PillCard height={400} width={"90%"} bgColor={"white"}>
            <View style={styles.cardInnerContainer}>
              <View style={styles.imageOuterContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: supplementDetail.image }}
                    style={styles.pillImage}
                  />
                </View>
              </View>
              <View style={styles.pillDetailContainer}>
                <View style={styles.nameContainer}>
                  <Text style={{ ...styles.name, ...regularWelcome }}>
                    제품명
                  </Text>
                  {/* <Text style={styles.pillName}>{routineItem.pillName}</Text> */}
                  <Text style={{ ...styles.pillName, ...boldWelcome }}>
                    {supplementDetail.name}
                  </Text>
                  <View style={styles.separator} />
                </View>
                <View style={styles.cntContainer}>
                  <Text style={{ ...styles.name, ...regularWelcome }}>
                    섭취 개수
                  </Text>
                  <View style={styles.modifyCnt}>
                    <Pressable onPress={decreaseHandler}>
                      <Entypo
                        name="circle-with-minus"
                        size={27}
                        color={accent}
                      />
                    </Pressable>
                    <Text style={{ ...styles.cnt, ...boldWelcome }}>
                      {pillCnt}
                    </Text>
                    <Pressable onPress={increaseHandler}>
                      <Entypo
                        name="circle-with-plus"
                        size={27}
                        color={accent}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </PillCard>

          <View>
            <PillCard height={200} width={"90%"} bgColor={"white"}>
              <View style={styles.takenTimeInnerContainer}>
                <View style={styles.dayAlarmOuterContainer}>
                  <View style={styles.dayOuterContainer}>
                    <View style={styles.dayAlarmContainer}>
                      <Text style={{ ...styles.name, ...regularWelcome }}>
                        섭취 요일
                      </Text>

                      <Text
                        style={{ ...styles.dayAndTimeName, ...regularWelcome }}
                      >
                        {takenDaysName}
                      </Text>
                    </View>

                    <Text style={{ ...styles.dayExplText, ...regularWelcome }}>
                      아래 요일을 클릭하여 섭취 요일을 선택해주세요.
                    </Text>
                  </View>

                  <View style={styles.dayListContainer}>
                    <WeekDayList
                      // addRoutineDaysHandler={setSelectedRoutineDays}
                      onChangeDaysName={onChangeDaysName}
                      prevRoutineDetail={prevRoutineDetail}
                      // getSubmitted={setIsDaySubmitted}
                      updateOrNot={updateOrNot}
                      pillId={pillId}
                    />
                  </View>
                </View>

                <View style={{ alignItems: "center" }}>
                  <View style={[styles.separator, { width: "90%" }]} />
                </View>
                <View style={styles.dayAlarmSecondContainer}>
                  <Text style={{ ...styles.name, ...regularWelcome }}>
                    섭취 시간
                  </Text>

                  <Pressable
                    onPress={showDatePicker}
                    style={styles.directionRow}
                  >
                    <Text style={{ ...styles.dayAndTimeName, ...boldWelcome }}>
                      {/* {supplementDetail.bestTime} {isAM ? "AM" : "PM"} */}
                      <Text
                        style={isAM ? { color: primary } : { color: "#309388" }}
                      >
                        {isAM ? "AM" : "PM"}
                      </Text>{" "}
                      {takenTime}
                      {/* dayTimePicker 쓰기 */}
                    </Text>
                    <DateTimePickerModal
                      // is24Hour={true}
                      positiveButtonLabel="확인"
                      negativeButtonLabel="취소"
                      // positiveButtonLabel="Negative"
                      isVisible={isDatePickerVisible}
                      mode="time"
                      // display="clock"
                      onConfirm={handleTimeConfirm}
                      onCancel={hideDatePicker}

                      // isDarkModeEnabled={true}
                    />
                    <AntDesign name="right" size={24} color="black" />
                  </Pressable>
                </View>
              </View>
            </PillCard>
          </View>

          <View>
            <PushNotifications
              addAlarmHandler={setIsAlarmEnabled}
              isAlarm={isAlarmEnabled}
              // pillName={supplementDetail.name}
              // pillCnt={pillCnt}
              // isSubmitted={isFinalSubmitted}
              // weekdays={selectedRoutineDays.split(",")}
            />
            <View>
              <View style={styles.chooseBtn}>
                <CustomBtn
                  buttonColor={accent}
                  title={updateOrNot === "true" ? "수정하기" : "등록하기"}
                  titleColor={"#fff"}
                  buttonWidth={"90%"}
                  fontSize={20}
                  onPress={submitModifyRoutineHandler}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 15,
  },

  cardInnerContainer: {
    flex: 1,
  },
  imageOuterContainer: {
    alignItems: "center",
    flex: 3,
    marginVertical: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  pillImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  pillDetailContainer: {
    flex: 2,
    // width: "55%",
    marginHorizontal: 20,
    // // height: "80%",
    // justifyContent: "space-between",
  },
  nameContainer: {
    flex: 1,
  },
  takenTimeInnerContainer: {
    flex: 1,
    padding: 8,
  },
  cntContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingTop: 20,
    // marginTop: 10,

    paddingHorizontal: 5,
  },
  modifyCnt: {
    flexDirection: "row",
  },

  name: {
    fontSize: 16,
    color: "#4d4a4a",
    // fontWeight: "bold",
  },
  pillName: {
    marginVertical: 7,
    fontSize: 17,
    // fontWeight: "bold",
  },
  separator: {
    // marginVertical: 10,
    backgroundColor: "#B7B7B7",
    height: 1,
    width: "100%",
  },
  cnt: {
    fontSize: 24,
    // fontWeight: "bold",
    paddingHorizontal: 10,
    // marginTop: -3,
  },
  time: {
    fontSize: 15,
    fontWeight: "900",
    color: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 25,
  },
  dayExplText: {
    fontSize: 12,
    color: "#FF78A3",
    paddingHorizontal: 15,
    letterSpacing: 1,
  },
  dayAlarmOuterContainer: {
    flex: 6,
  },
  dayOuterContainer: {
    flex: 3,
    // backgroundColor: "yellow",
  },
  dayAlarmContainer: {
    flex: 1,
    paddingHorizontal: 17,
    // backgroundColor: "blue",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayAlarmSecondContainer: {
    paddingHorizontal: 13,
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayListContainer: {
    flex: 5,
  },
  directionRow: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  dayAndTimeName: {
    // fontWeight: "900",
    fontSize: 18,
  },

  modalContainer: {
    height: 150,
    width: 250,
  },
  // bottomOuterContainer: {
  //   height: 150,
  // },
  bottomContainer: {
    flex: 1,

    // margin: 14,
  },
  contentContainer: {
    flex: 1,
    // alignItems: "center",
  },

  chooseBtn: {
    flex: 1,
    alignItems: "center",
  },
});
