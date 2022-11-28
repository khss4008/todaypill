import apiInstance from "./index";
const api = apiInstance();

const fetchEachMyRoutine = async (
  userId: number,
  date: string,
  day: number
) => {
  const result = await api.get(`/calendar/${userId}/${date}/${day}`);
  // console.warn(result.data, "각각의 루틴 가져오기");
  return result.data;
};

const checkMyRoutine = async (
  routineId: number,
  dateStr: string,
  userId: number
) => {
  const result = await api.post(`/calendar/${userId}/${dateStr}`, {
    date: dateStr,
    routineId,
    userId,
  });
  return result.data;
  console.warn("복용 체크 완료!!!!!!");
};
const deleteMyRoutineCheck = async (calendarId: number) => {
  await api.delete(`/calendar/${calendarId}`);
};

const fetchEachMonthRoutines = async (userId: number, month: number) => {
  const result = await api.get(`/calendar/${userId}/${month}`);
  // console.warn(result.data, month, "복용 내역 가져오기");
  return result.data;
};
// const addMyRoutineSupplement = async (
//   userId: number,
//   supplementId: number,
//   day: string,
//   pushAlarm: boolean,
//   tablets: number,
//   time: string
// ) => {
//   // console.log(supplementId, day, pushAlarm, tablets, time);
//   await api.post(`/mypage/${userId}/mysupplement`, {
//     supplementId,
//     day,
//     pushAlarm,
//     tablets,
//     time,
//   });
// };
// const updateMyRoutineSupplement = async (
//   userId: number,
//   routineId: number,
//   supplementId: number,
//   day: string,
//   pushAlarm: boolean,
//   tablets: number,
//   time: string
// ) => {
//   console.warn(
//     "루틴 복약 수정",
//     supplementId,
//     routineId,
//     day,
//     pushAlarm,
//     tablets,
//     time
//   );
//   await api.put(`/mypage/${userId}/mysupplement/${routineId}`, {
//     supplementId,
//     day,
//     pushAlarm,
//     tablets,
//     time,
//   });
// };

export {
  fetchEachMyRoutine,
  checkMyRoutine,
  deleteMyRoutineCheck,
  fetchEachMonthRoutines,
};
