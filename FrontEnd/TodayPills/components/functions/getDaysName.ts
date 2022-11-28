export const getDaysName = (daysArray: Array<string>) => {
  let finalSubmitDaysNames: string = daysArray.join(", ");
  if (daysArray.length === 7) {
    finalSubmitDaysNames = "매일";
  } else if (finalSubmitDaysNames === "월, 화, 수, 목, 금") {
    finalSubmitDaysNames = "주중";
  } else if (finalSubmitDaysNames === "토, 일") {
    finalSubmitDaysNames = "주말";
  }
  return finalSubmitDaysNames;
};
