export const getDayOfWeekString = (dateIdx: number) => {
  const week = ["월", "화", "수", "목", "금", "토", "일"];

  return week[dateIdx];
};
