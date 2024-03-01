import jwt from "jsonwebtoken";

const SECRET_KEY = "MY_SECRET_KEY";

export const createJwt = (arg) => {
  return new Promise(async (resolve, reject) => {
    const token = await jwt.sign(arg, SECRET_KEY, { expiresIn: "1d" });
    if (!token) reject("Error al crear el token de registro");
    resolve(token);
  });
};
