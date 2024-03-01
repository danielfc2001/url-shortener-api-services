import { commentsModel } from "../Schemas/commentsModel.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentsModel.find({});
    if (!comments)
      throw {
        responseStatus: 500,
        responseMessage: "No se a podido procesar la solicitud",
      };
    const fixedComments = comments
      .reverse()
      .map((item, index) => {
        if (index < 10) {
          return {
            creator: item.creator,
            comment: item.comment,
            rate: item.rate,
            date: item.date ? item.date.toString() : undefined,
          };
        } else {
          return undefined;
        }
      })
      .filter((el) => el != null);
    res.status(200).json({
      comments: fixedComments,
    });
  } catch (error) {
    console.log(error);
    res.status((error.responseStatus = 500)).json({
      message: error.responseMessage ?? "No se a podido procesar la solicitud.",
    });
  }
};
