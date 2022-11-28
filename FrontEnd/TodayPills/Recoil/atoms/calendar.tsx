import { atom } from "recoil";

export const pillRoutineCheckChangeState = atom({
  default: false,
  key: "pillRoutineCheckChange",
});

export const takenWeekDaysState = atom({
  default: [1, 2, 3, 4, 5, 6, 7],
  key: "takenWeekDays",
});
