import apiInstance from "./index";
const api = apiInstance();

const fetchAllRoutineSupplements = async (userId: number) => {
  const result = await api.get(`/mypage/${userId}/mysupplement`);
  return result.data;
};

const deleteMySupplement = async (
  userId: number,
  routineId: number,
  dateStr: string
) => {
  // await api.patch(`/mypage/${userId}/mysupplement/${routineId}`, dateStr);
  await api.patch(`/mypage/${userId}/mysupplement/${routineId}`, {
    deletedSince: dateStr,
  });
};

const addMyRoutineSupplement = async (
  userId: number,
  supplementId: number,
  day: string,
  pushAlarm: boolean,
  tablets: number,
  time: string,
  dateStr: string
) => {
  // console.log(supplementId, day, pushAlarm, tablets, time);
  await api.post(`/mypage/${userId}/mysupplement`, {
    supplementId,
    day,
    pushAlarm,
    tablets,
    time,
    addedSince: dateStr,
  });
};
const updateMyRoutineSupplement = async (
  userId: number,
  routineId: number,
  supplementId: number,
  day: string,
  pushAlarm: boolean,
  tablets: number,
  time: string,
  dateStr: string
) => {
  // console.warn(
  //   "루틴 복약 수정",
  //   supplementId,
  //   routineId,
  //   day,
  //   pushAlarm,
  //   tablets,
  //   time,
  //   dateStr
  // );
  await api.put(`/mypage/${userId}/mysupplement/${routineId}`, {
    supplementId,
    day,
    pushAlarm,
    tablets,
    time,
    addedSince: dateStr,
  });
};

export {
  fetchAllRoutineSupplements,
  addMyRoutineSupplement,
  deleteMySupplement,
  updateMyRoutineSupplement,
};
