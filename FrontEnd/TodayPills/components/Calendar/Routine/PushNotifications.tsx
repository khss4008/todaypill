import { StyleSheet, View, Text, Switch } from "react-native";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { accent, primary, secondary } from "../../../constants/Colors";
import PillCard from "../../UI/PillCard";

import CustomBtn from "../../UI/CustomBtn";

import * as Notifications from "expo-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { fetchSupplementDetail } from "../../../API/supplementAPI";
import { fetchAllRoutineSupplements } from "../../../API/routineAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNotification } from "../../functions/setNotification";
import { boldWelcome, regularWelcome } from "../../Data/fontFamilyObject";
// import Notifications from "../../../utils/Notifications";

export interface PushProps {
  addAlarmHandler: (alarmOrNot: boolean) => void;
  isAlarm: boolean;
  // pillName: string;
  // pillCnt: number;
  // isSubmitted: boolean;
  // weekdays: Array<string>;
}

export default function PushNotifications({
  addAlarmHandler,
  isAlarm,
}: // pillName,
// pillCnt,
// isSubmitted,
// weekdays,
PushProps) {
  // export default function PushNotifications({
  //   navigation,
  //   pillId,
  //   updateOrNot,
  // }: any) {
  const [userId, setUserId] = useState(0);

  const alarmToggleSwitch = () => {
    addAlarmHandler(!isAlarm);
  };

  return (
    <PillCard height={130} width={"90%"} bgColor={"white"}>
      <View style={styles.takenTimeInnerContainer}>
        <View style={styles.switchAlarmContainer}>
          <Text style={{ ...styles.pushAlarmName, ...boldWelcome }}>
            푸시 알람
          </Text>
          <Switch
            // style={{ height: "50%" }}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            trackColor={{ false: "#767577", true: accent }}
            // thumbColor={isAlarmEnabled ? "white" : "#f4f3f4"}
            thumbColor={isAlarm ? "white" : "#f4f3f4"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={alarmToggleSwitch}
            // value={isAlarmEnabled}
            value={isAlarm}
          />
        </View>
        <View style={styles.alarmExplanation}>
          <Text style={{ ...styles.alarmExplText, ...regularWelcome }}>
            푸시 알람을 켜두시면 등록하신 시간에 맞춰 알림을 받을 수 있어요 !
          </Text>
        </View>
      </View>
    </PillCard>
  );
}

const styles = StyleSheet.create({
  takenTimeInnerContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  switchAlarmContainer: {
    flex: 1,
    flexDirection: "row",

    paddingHorizontal: 20,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pushAlarmName: {
    // marginVertical: 7,
    fontSize: 21,
    // fontWeight: "bold",
  },
  alarmExplanation: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingBottom: 30,
    alignItems: "center",
  },
  alarmExplText: {
    fontSize: 13,
    color: "#FF78A3",
    letterSpacing: 1,
  },
});
