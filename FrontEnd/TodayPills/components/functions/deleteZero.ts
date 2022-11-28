export const deleteZero = (str: string) => {
  return str[0] === "0" ? str[1] : str;
};
