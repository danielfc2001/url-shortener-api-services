import analyticsModel from "../schemas/analyticsModel.js";

export const getAnalyticsByDate = (date, id) => {
  return new Promise(async (resolve, reject) => {
    const found = await analyticsModel.find({ urlId: id, date });
    if (found.length === 0) {
      resolve({
        time: date,
        value: 0,
      });
    } else {
      resolve({
        time: date,
        value: found.length,
      });
    }
  });
};
