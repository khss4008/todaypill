import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useRecoilState } from "recoil";
import { useState, useCallback } from "react";
import { primary } from "../../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { boldWelcome } from "../../Data/fontFamilyObject";
import { takenWeekDaysState } from "../../../Recoil/atoms/calendar";

export interface WeekDayProps {
  day: string;
  dayId: number;
  // isDayLoading: boolean;
  takeDays: Array<number>;
}

export default function WeekDay({
  day,
  dayId,
  // isDayLoading,
  takeDays,
}: WeekDayProps) {
  const [takenWeekDays, setTakenWeekDays] = useRecoilState(takenWeekDaysState);
  const [isPressed, setIsPressed] = useState(false);

  const pressDayHandler = () => {
    setTakenWeekDays((prevDays) => {
      console.warn([...prevDays, dayId].sort());

      return [...prevDays, dayId].sort();
    });

    setIsPressed(true);
  };
  const unpressDayHandler = () => {
    setTakenWeekDays((prevDays) => {
      const nowSet = new Set(prevDays);
      nowSet.delete(dayId);
      return Array.from(nowSet);
    });

    setIsPressed(false);
  };

  useFocusEffect(
    useCallback(() => {
      // if (!isDayLoading && takeDays.includes(dayId)) {
      if (takeDays.includes(dayId)) {
        setIsPressed(true);
      }
      return () => {};
    }, [])
  );

  return (
    <Pressable
      onPress={isPressed ? unpressDayHandler : pressDayHandler}
      style={styles.dayContainer}
    >
      <View
        style={[
          styles.btnContainer,
          { backgroundColor: isPressed ? primary : "#CCCCCC" },
        ]}
      >
        <Text style={{ ...styles.text, ...boldWelcome }}>{day}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dayContainer: {},
  btnContainer: {
    borderRadius: 10,
    // backgroundColor: primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    overflow: "hidden",

    // minHeight: 200,
    // marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 17,
    // fontWeight: "bold",
  },
});
