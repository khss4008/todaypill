import { StyleSheet, View, Text } from "react-native";
import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import { accent, primary, secondary } from "../../constants/Colors";
import { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchEachMonthRoutines } from "../../API/calendarAPI";
import { pillRoutineCheckChangeState } from "../../Recoil/atoms/calendar";
import { useRecoilState } from "recoil";
import { getDateStr } from "../functions/getDateStr";
// import { randomColors } from "../Data/RandomColorsArray";

export interface CalendarViewProps {
  onChangeDate: (date: string) => void;
  todayString: string;
}
// const todayStr = useMemo(() => getDateStr(new Date()), []);
const todayStr = getDateStr(new Date());
export default function CalendarView({
  onChangeDate,
  todayString,
}: CalendarViewProps) {
  const [isCheckedChange, setIsCheckedChange] = useRecoilState(
    pillRoutineCheckChangeState
  );
  const [userId, setUserId] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(
    // parseInt(todayString.substring(5, 7))
    new Date().getMonth() + 1
  );
  const [takenList, setTakenList] = useState({});

  const [daySelected, setDaySelected] = useState(todayString);
  const [currentClickedMonth, sestCurrentClickedMonth] = useState(
    parseInt(todayString.substring(5, 7))
  );
  const [isRightArrowDisabled, setIsRightArrowDisabled] = useState(false);
  const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useState(false);

  const [taken, setTaken] = useState({});
  const [items, setItems] = useState({});
  const customTheme = {
    "stylesheet.calendar.header": {
      // headerContainer: {
      //   flexDirection: "row",
      //   backgroundColor: "#eee",
      //   borderRadius: 12,
      // },
      dayTextAtIndex0: {
        color: primary,
      },
      dayTextAtIndex6: {
        color: accent,
      },
    },
    // backgroundColor: "rgba(211, 60, 180, 0.2)",
    // calendarBackground: "rgba(226, 195, 220, 0.2)",
    // calendarBackground: primary,
    // textSectionTitleColor: '#b6c1cd',
    // textSectionTitleDisabledColor: '#d9e1e8',
    // selectedDayBackgroundColor: "#E2C3DC",
    selectedDayBackgroundColor: "transparent",
    selectedDayTextColor: "black",
    // todayTextColor: primary,
    // dayTextColor: '#2d4150',
    // textDisabledColor: '#d9e1e8',
    // dotColor: '#00adf5',
    // selectedDotColor: '#ffffff',
    arrowColor: "#E2C3DC",
    // disabledArrowColor: '#d9e1e8',
    // monthTextColor: accent,
    // indicatorColor: 'blue',
    // textDayFontFamily: 'monospace',
    // textMonthFontFamily: 'monospace',
    // textDayHeaderFontFamily: 'monospace',s
    // textDayFontWeight: '300',
    textMonthFontWeight: "bold",
    // textDayHeaderFontWeight: '300',
    // textDayFontSize: 16,
    // textMonthFontSize: 16,
    // textDayHeaderFontSize: 16
  };
  LocaleConfig.locales.kr = {
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  };
  LocaleConfig.defaultLocale = "kr";

  // -----------------------------------
  const dayPressHandler = (day: any) => {
    console.log("selected day", day);
    onChangeDate(day.dateString);
    setDaySelected(day.dateString);
  };

  const marked = useMemo(
    () => ({
      ...takenList,
      // [todayString]: {
      //   dots: [{ key: "today", color: accent }],
      // },
      [daySelected]: {
        selected: true,
        selectedColor: accent,
        selectedTextColor: "white",
      },

      // [taken]: {
      //   selected: true,
      //   selectedColor: accent,
      //   selectedTextColor: "white",
      // },
    }),
    [daySelected, takenList]
  );
  // const marked = {
  //   "2022-10-10": { marked: true },
  //   "2022-10-12": { selected: true },
  //   todayString: { selected: true },
  // };

  const getMonthRoutines = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const eachMonthRoutines = await fetchEachMonthRoutines(
      userId,
      currentMonth
    );
    // console.warn(eachMonthRoutines, "복용내역 fetch");
    markEachMonthCalendar(eachMonthRoutines, currentMonth);
  };

  const markEachMonthCalendar = (res: Array<object>, selectedMonth: number) => {
    // [{"calendarId": 7, "date": "2022-11-11", "routineId": 3, "taken": true, "userId": 2},
    // {"calendarId": 8, "date": "2022-11-11", "routineId": 9, "taken": true, "userId": 2},
    // {"calendarId": 9, "date": "2022-11-09", "routineId": 8, "taken": true, "userId": 2}]

    let temp = {};
    let allEachMonthRoutines = {};
    res.map((each: any) => {
      if (Object.keys(temp).includes(each.date)) {
        temp[each.date].push({
          key: each.routineId,

          // color: randomColors[each.routineId],
          color: "#E43A89",
        });
      } else {
        temp[each.date] = [
          {
            key: each.routineId,
            color: "#E43A89",
            // color: randomColors[each.routineId]
          },
        ];
      }

      // for (const eachDate in temp) {
      //   allEachMonthRoutines[eachDate] = { dots: temp[eachDate] };
      // }
      Object.entries(temp).map((eachDateArray: Array<any>) => {
        allEachMonthRoutines[eachDateArray[0]] = {
          dots: eachDateArray[1].slice(0, 5),
        };
      });
    });
    setTakenList(allEachMonthRoutines);
  };

  useFocusEffect(
    useCallback(() => {
      // getMonthRoutines(todayString.substring(5, 7));
      getMonthRoutines();
      // console.warn(currentMonth, "지금 몇달");
    }, [userId, currentMonth, isCheckedChange])
    // }, [userId, todayString])
  );

  useFocusEffect(
    useCallback(() => {
      currentMonth === 12
        ? setIsRightArrowDisabled(true)
        : setIsRightArrowDisabled(false);
      currentMonth === 1
        ? setIsLeftArrowDisabled(true)
        : setIsLeftArrowDisabled(false);
    }, [currentMonth])
    // }, [userId, todayString])
  );
  return (
    <View style={styles.calendarContainer}>
      <Calendar
        // style={styles.calendar}
        style={{
          width: "100%",
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 8,
          // margin: 12,
          elevation: 5,
          // borderWidth: 2,
          borderColor: primary,
          // backgroundColor: "rgba(226, 195, 220)",
        }}
        // initialDate={todayString}
        theme={customTheme}
        markingType="multi-dot"
        onDayPress={dayPressHandler}
        onMonthChange={(monthData) => {
          setCurrentMonth(monthData.month);
          // getMonthRoutines(monthData.month.toString());
        }}
        monthFormat={"yyyy년 MM월"}
        markedDates={marked}
        maxDate={"2022-12-31"}
        minDate={"2022-01-01"}
        // enableSwipeMonths
        disableArrowRight={isRightArrowDisabled}
        disableArrowLeft={isLeftArrowDisabled}
      />
      {/* <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2022-07-07"}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
      /> */}
    </View>
  );
}

// 샘플 캘린더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ---------------------------------------------------------------------------
// function CustomCalendar(props) {
//   const initDate = '2022-12-01';
//   const [selected, setSelected] = useState(initDate);
//   const marked = useMemo(() => ({
//     [selected]: {
//       selected: true,
//       selectedColor: '#222222',
//       selectedTextColor: 'yellow',
//     }
//   }), [selected]);
//   return (
//     <Calendar
//       initialDate={initDate}
//       markedDates={marked}
//       onDayPress={(day) => {
//         setSelected(day.dateString);
//         props.onDaySelect && props.onDaySelect(day);
//       }}
//       {...props}
//     />
//   );
// }

// function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomCalendar onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)}/>
//     </SafeAreaView>
//   );
// };

const styles = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  calendar: {
    width: "100%",
    // height: 300,
    // backgroundColor: "rgba(226, 195, 220, 0.2);",
    // borderRadius: 20,

    // borderBottomWidth: 1,
    // borderBottomColor: "#e0e0e0",
  },
});
