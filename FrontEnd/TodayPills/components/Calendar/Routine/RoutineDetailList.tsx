import { StyleSheet, View, Text, Pressable } from "react-native";

import { useState, useCallback } from "react";
import { accent, primary, secondary } from "../../../constants/Colors";
import RoutineItemDetail from "./RoutineItemDetail";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAllRoutineSupplements } from "../../../API/routineAPI";
import { strTimeToNum } from "../../functions/strTimeToNum";

// export interface PillScheduleProps {
//   selectedDate: string;
// }

export default function RoutineDetailList() {
  const [pillRoutineDetailList, setPillRoutineDetailList] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const [userId, setUserId] = useState(0);
  const getMyAllRoutineSupplements = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const allMyRoutines = await fetchAllRoutineSupplements(userId);
    const visibleRoutineList = allMyRoutines.filter((eachRoutine: any) => {
      return !eachRoutine.deletedSince;
    });
    visibleRoutineList.sort((a: any, b: any) => {
      if (strTimeToNum(a.time) > strTimeToNum(b.time)) return 1;
      if (strTimeToNum(a.time) === strTimeToNum(b.time)) return 0;
      if (strTimeToNum(a.time) < strTimeToNum(b.time)) return -1;
    });

    setPillRoutineDetailList(visibleRoutineList);
  };

  const deleteClickHandler = () => {
    setDeleteClicked((delClicked) => !delClicked);
  };

  useFocusEffect(
    useCallback(() => {
      getMyAllRoutineSupplements();
    }, [userId, deleteClicked])
  );
  return (
    <View style={styles.pillRoutineContainer}>
      {pillRoutineDetailList.map((rout, idx) => (
        <RoutineItemDetail
          key={idx}
          routineId={rout.routineId}
          supplementId={rout.supplementId}
          time={rout.time}
          daysStr={rout.day}
          pushAlarm={rout.pushAlarm}
          tablets={rout.tablets}
          onClickDelete={deleteClickHandler}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pillRoutineContainer: {
    // minHeight: 200,
    // marginTop: 10,
  },
});
