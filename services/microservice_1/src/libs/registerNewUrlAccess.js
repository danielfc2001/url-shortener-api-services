import analyticsModel from "../schemas/analyticsModel.js";

export const registerNewUrlAccess = (id, requestObj) => {
  return new Promise((resolve, reject) => {
    const newAnalytic = new analyticsModel({
      urlId: id,
      ipDirection: requestObj._remoteAddress,
      date: new Date().toLocaleDateString(),
    });
    newAnalytic
      .save()
      .then((result) => {
        resolve(
          `Se a creado un nuevo registro para el id: ${result.urlId}. Fecha: ${result.createdAt}. Direccion IP entrante: ${result.ipDirection}`
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};
