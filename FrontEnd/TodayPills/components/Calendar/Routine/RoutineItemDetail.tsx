import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { accent, primary, secondary } from "../../../constants/Colors";
import PillCard from "../../UI/PillCard";
import { getDayOfWeekString } from "../../functions/getDayOfWeekString";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { fetchSupplementDetail } from "../../../API/supplementAPI";
import { getDaysName } from "../../functions/getDaysName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDateStr } from "../../functions/getDateStr";
import { deleteMySupplement } from "../../../API/routineAPI";
import { boldWelcome, regularWelcome } from "../../Data/fontFamilyObject";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { cancelNotification } from "../../functions/cancelNotification";

export interface RoutineDetailProps {
  key: number;
  routineId: number;
  supplementId: number;
  time: string;
  daysStr: string;
  pushAlarm: boolean;
  tablets: number;
  onClickDelete: () => void;
}

const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

export default function RoutineItemDetail({
  // key,
  routineId,
  supplementId,
  time,
  daysStr,
  pushAlarm,
  tablets,
  onClickDelete,
}: RoutineDetailProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState(0);

  const [takenDaysStr, setTakenDaysStr] = useState("");
  const [supplementDetail, setSupplementDetail] = useState<any>({});

  const modifyRoutineHandler = () => {
    // --------------------------------------------###############################
    // 진짜 supplementId 추가하긱!!!!!!!!!!!!!!!
    navigation.navigate("ModifyRoutine", {
      pillId: supplementId,
      update: "true",
      tablets,
      days: daysStr,
      time,
      pushAlarm,
      routineId,
    });
  };

  // let shownTime = time;
  // if ((time = "13:0")) {
  //   shownTime = "13:00";
  // }

  const getSupplementDetail = async () => {
    const supplementDetailItem: any = await fetchSupplementDetail(supplementId);
    setSupplementDetail(supplementDetailItem);
  };

  const deleteMyRoutineSupplement = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const dateStr = getDateStr(new Date());

    await deleteMySupplement(userId, routineId, dateStr);
    onClickDelete();
    cancelNotification(supplementId.toString());
    ToastAndroid.show(`해당 영양제 섭취 루틴이 삭제되었습니다.`, 2);
  };

  useFocusEffect(
    useCallback(() => {
      getSupplementDetail();
      const takenDaysArray = daysStr.split(",").map((day) => {
        return weekDays[parseInt(day) - 1];
      });

      setTakenDaysStr(getDaysName(takenDaysArray));
    }, [supplementId, daysStr])
  );

  return (
    <>
      {supplementDetail.name ? (
        <View style={styles.outerContainer}>
          <PillCard height={100} width={"90%"} bgColor={"white"}>
            <Pressable
              android_ripple={{ color: "#4E736F" }}
              style={styles.cardContainer}
              onPress={modifyRoutineHandler}
            >
              <View style={styles.routineContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: supplementDetail.image }}
                    style={styles.pillImage}
                  />
                </View>
                <View style={styles.pillDetailContainer}>
                  <View>
                    <Text style={{ ...styles.brand, ...boldWelcome }}>
                      {supplementDetail.brand}
                    </Text>
                    <Text
                      style={{
                        ...styles.name,
                        ...boldWelcome,
                        fontSize: supplementDetail.name.length > 22 ? 11 : 13,
                      }}
                    >
                      {supplementDetail.name}
                    </Text>
                  </View>
                  <View style={styles.dayTimeContainer}>
                    <Text style={{ ...styles.days, ...regularWelcome }}>
                      {takenDaysStr}
                    </Text>
                    <View style={styles.timeContainer}>
                      <Text style={{ ...styles.time, ...regularWelcome }}>
                        {time}
                        {/* {shownTime} */}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rightSideContainer}>
                  <Pressable onPress={deleteMyRoutineSupplement}>
                    <FontAwesome name="trash-o" size={22} color="#B7B7B7" />
                  </Pressable>
                  <View style={styles.cntContainer}>
                    <Text style={{ ...styles.cnt, ...regularWelcome }}>
                      {tablets}정
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </PillCard>

          {/* <Text style={styles.takenDate}></Text>
      <View style={styles.pillRoutineContainer}>
     
      </View> */}
        </View>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 5,
  },
  // buttonOuterContainer: {
  //   flex: 1,
  //   borderRadius: 30,

  //   margin: 4,
  //   overflow: "hidden",
  //   marginVertical: 10,
  //   elevation: 5,
  // },
  cardContainer: {
    flex: 1,
    // overflow: "hidden",
    // flex: 1,
    // backgroundColor: "#edfbf9",
    // backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 2,
    // elevation: 4,
    // height: 75,
    // marginHorizontal: 30,
    // marginVertical: 10,
    // borderRadius: 10,
  },
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
    paddingVertical: 5,
    // height: "80%",
    justifyContent: "space-between",
  },

  brand: {
    color: "#B7B7B7",
    fontSize: 10,
    // fontWeight: "bold",
  },
  name: {
    // fontSize: 13,
    letterSpacing: 0.5,
    marginTop: 5,

    // fontWeight: "bold",
  },
  cntContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#B7B7B7",
    borderRadius: 20,
  },
  cnt: {
    color: "white",
    fontSize: 12,
    // fontWeight: "bold",
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  dayTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 7,
  },
  days: {
    marginLeft: 2,
    marginTop: 5,
    marginBottom: 2,
    fontSize: 11,
    // fontWeight: "900",
    color: "rgba(0, 0, 0, 0.5)",
    // paddingHorizontal: 25,
  },

  timeContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 6,
    borderRadius: 5,
    // width: "25%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(235, 196, 217, 0.5)",
  },
  time: {
    fontSize: 12,
    // fontWeight: "900",
    color: "#FF78A3",
    // paddingHorizontal: 25,
  },
  rightSideContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
});
