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

export const getCommentsInformation = async (req, res) => {
  try {
    const commentsResults = await commentsModel.find({});
    if (!commentsResults)
      throw {
        responseStatus: 500,
        responseError:
          "A ocurrido un error al obtener la información solicitada.",
      };
    const recommendedComments = commentsResults.filter(
      (el) => el.rate === "recommended"
    );
    const nonRecommendedComments = commentsResults.filter(
      (el) => el.rate === "non-recommended"
    );
    res.status(200).json({
      totalComments: commentsResults.length,
      positiveComments: recommendedComments.length,
      negativeComments: nonRecommendedComments.length,
    });
  } catch (error) {
    console.log(error);
    res.status(error.responseStatus).send({ message: error.responseError });
  }
};
