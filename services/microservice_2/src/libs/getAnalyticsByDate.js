import analyticsModel from "../Schemas/analyticsModel.js";

export const getAnalyticsByDate = (date, id) => {
  return new Promise(async (resolve, reject) => {
    const found = await analyticsModel.find({ urlId: id, date });
    if (found.length === 0) {
      resolve({
        date,
        count: 0,
      });
    } else {
      resolve({
        date,
        count: found.length,
      });
    }
  });
};
