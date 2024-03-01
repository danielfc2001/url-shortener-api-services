export const getLastWeekDates = (numbsDates) => {
  return new Promise((resolve, reject) => {
    const dayMilliseconds = 86400000;
    let dateArray = [];
    for (let iterator = 1; iterator <= numbsDates; iterator++) {
      const lastDay = new Date().getTime() - dayMilliseconds * iterator;
      dateArray.push(new Date(lastDay).toLocaleDateString());
    }
    resolve(dateArray);
  });
};
