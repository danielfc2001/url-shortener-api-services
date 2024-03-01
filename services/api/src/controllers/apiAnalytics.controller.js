import { getLastWeekDates } from "../libs/getLastWeekDates.js";
import { getAnalyticsByDate } from "../libs/getAnalyticsByDate.js";
import analyticsModel from "../schemas/analyticsModel.js";

export const getUrlShortenedAnalytics = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id)
      throw {
        errorStatus: 400,
        errorResponse: "An error occurred while processing the request.",
      };
    const lastWeekDates = await getLastWeekDates(7);
    const lastMonthDates = await getLastWeekDates(30);
    const lastWeekMatches = [];
    const lastMonthMatches = [];
    if (lastWeekDates && lastMonthDates) {
      for (let i = 0; i < lastWeekDates.length; i++) {
        const match = await getAnalyticsByDate(lastWeekDates[i], id);
        if (match) {
          lastWeekMatches.push(match);
        }
      }
      for (let i = 0; i < lastMonthDates.length; i++) {
        const match = await getAnalyticsByDate(lastMonthDates[i], id);
        if (match) {
          lastMonthMatches.push(match);
        }
      }
      const result = await analyticsModel.find({
        urlId: id,
        date: new Date().toLocaleDateString(),
      });
      if (result && lastWeekMatches.length > 1 && lastMonthMatches.length > 1) {
        res.status(200).json({
          today: result.length,
          lastWeek: lastWeekMatches,
          lastMonth: lastMonthMatches,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(error.errorStatus ?? 500).send({
      message:
        error.errorResponse ??
        "An error occurred while processing the request.",
    });
  }
};
