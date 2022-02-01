export const dateToArray = (date: Date): Array<number> => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
};

export const arrayToDate = (array: any): Date => {
  const birth = array.value;
  return new Date(birth[0], birth[1], birth[2], birth[3], birth[4], birth[5]);
};
