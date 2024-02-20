export const getLastWeekDates = () => {
  return new Promise((resolve, reject) => {
    const dates = ["", "", "", "", ""];
    let iterator = 1;
    const newDates = dates.map(() => {
      const date = new Date().toLocaleDateString().split("/");
      const lastDate = date
        .map((el, index) => {
          if (index === 0) {
            return (parseInt(el) - iterator).toString();
          } else {
            return el;
          }
        })
        .join("/");
      iterator = iterator + 1;
      return lastDate;
    });
    if (newDates) {
      resolve(newDates);
    }
  });
};
