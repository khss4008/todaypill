import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { useState, useCallback } from "react";
import WeekDay from "./WeekDay";
import { accent, primary, secondary } from "../../../constants/Colors";
import CustomBtn from "../../UI/CustomBtn";
import { useFocusEffect } from "@react-navigation/native";
import { getDaysName } from "../../functions/getDaysName";
import { boldWelcome } from "../../Data/fontFamilyObject";
import { takenWeekDaysState } from "../../../Recoil/atoms/calendar";
import LoadingSpinner from "../../UI/LoadingSpinner";

const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

export default function WeekDayList(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  // const [isDayLoading, setIsDayLoading] = useState(true);
  const [takenWeekDays, setTakenWeekDays] = useRecoilState(takenWeekDaysState);
  const [daysNames, setDaysNames] = useState("");

  const [isSelectCompleted, setIsSelectCompleted] = useState(false);
  // isSelectCompleted ? props.getSubmitted(true) : props.getSubmitted(false);

  // const submitDays = [...selectedDays].sort();
  const submitDaysNames = takenWeekDays.map(
    (eachDayId: number) => weekDays[eachDayId - 1]
  );

  const finalSubmitDaysNames = getDaysName(submitDaysNames);

  useFocusEffect(
    useCallback(() => {
      if (props.updateOrNot === "false") {
        setTakenWeekDays([1, 2, 3, 4, 5, 6, 7]);
      } else {
        const takenWeekDayIdsStr = props.prevRoutineDetail.days;
        if (takenWeekDayIdsStr) {
          const takenDaysNumberArray = takenWeekDayIdsStr
            .split(",")
            .map((eachDayIdStr: string) => {
              return parseInt(eachDayIdStr);
            });
          setTakenWeekDays(takenDaysNumberArray);
          // setIsDayLoading(false);
        }
      }
      setIsLoading(false);
      // return () => {};
    }, [props.pillId])
  );

  props.onChangeDaysName(finalSubmitDaysNames);

  // const daySelectCompleteHandler = () => {
  //   setIsSelectCompleted(true);
  //   props.getSubmitted(true);
  // };

  // const submitChangeHandler = () => {
  //   props.getSubmitted(false);
  // };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.outerContainer}>
          <View style={styles.dayListContainer}>
            {weekDays.map((day, idx) => (
              <WeekDay
                key={idx}
                day={day}
                dayId={idx + 1}
                takeDays={takenWeekDays}
                // isDayLoading={isDayLoading}
              />
            ))}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  dayListContainer: {
    flex: 7,
    flexDirection: "row",

    marginHorizontal: 10,

    // marginBottom: 4,
    alignItems: "center",
    justifyContent: "space-between",
    // minHeight: 200,
    // marginTop: 10,
  },
  btn: {
    flex: 2,
    // backgroundColor: "red",
    paddingHorizontal: 20,
    paddingBottom: 10,
    // marginBottom: 5,
    flexDirection: "row-reverse",
    alignItems: "center",
  },

  confirmText: {
    fontSize: 15,
    letterSpacing: 1,
    // fontWeight: "900",
  },
});

// return (
//   <>
//     {isLoading ? (
//       <LoadingSpinner />
//     ) : (
//       <View style={styles.outerContainer}>
//         <View style={styles.dayListContainer}>
//           {weekDays.map((day, idx) => (
//             <WeekDay
//               key={idx}
//               day={day}
//               dayId={idx + 1}
//               // selectedDayIdsArray={takenWeekDays}
//               // daySelectHandler={daySelectHandler}
//               // deleteDayHandler={deleteDayHandler}
//               // submitChangeHandler={submitChangeHandler}
//               // isDaysSelectCompleted={isSelectCompleted}
//             />
//           ))}
//         </View>
//         <View style={styles.btn}>
//           {/* <Text>{submitDays.join(", ")}</Text> */}
//           <Pressable
//             onPress={daySelectCompleteHandler}
//             // style={styles.btnContainer}
//           >
//             {({ pressed }) => (
//               <Text
//                 style={{
//                   ...styles.confirmText,
//                   color: pressed ? "black" : accent,
//                   ...boldWelcome,
//                 }}
//               >
//                 완료
//                 {/* {pressed ? 'Pressed!' : 'Press Me'} */}
//               </Text>
//             )}
//           </Pressable>
//         </View>
//       </View>
//     )}
//   </>
// );
