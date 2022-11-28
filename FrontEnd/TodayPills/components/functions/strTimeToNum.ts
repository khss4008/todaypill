export const strTimeToNum = (strTime: string) => {
  const temp = strTime.slice(0, 2) + strTime.slice(3, 5);
  return parseInt(temp);
};
