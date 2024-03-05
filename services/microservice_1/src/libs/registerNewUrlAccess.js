import analyticsModel from "../schemas/analyticsModel.js";

export const registerNewUrlAccess = (id, requestObj) => {
  return new Promise(async (resolve, reject) => {
    const newAnalytic = new analyticsModel({
      urlId: id,
      ipDirection: requestObj._remoteAddress,
      date: new Date().toLocaleDateString(),
    });
    const result = await newAnalytic.save();
    if (result)
      resolve(
        `Se a creado un nuevo registro para el id: ${result.urlId}. Fecha: ${result.createdAt}. Direccion IP entrante: ${result.ipDirection}`
      );
  });
};
