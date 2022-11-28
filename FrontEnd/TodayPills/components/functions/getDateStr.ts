export const getDateStr = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthStr = month >= 10 ? month.toString() : "0" + month.toString();
  const dayStr = day >= 10 ? day.toString() : "0" + day.toString();

  return date.getFullYear() + "-" + monthStr + "-" + dayStr;
};
