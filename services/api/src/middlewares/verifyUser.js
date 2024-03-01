import jwt from "jsonwebtoken";
import { userModel } from "../schemas/userModel.js";

export const verifyUser = async (req, res, next) => {
  const { token } = req.query;
  try {
    if (!token) {
      req.body = {
        user: undefined,
        data: req.body,
      };
      next();
    } else {
      const decoded = jwt.decode(token);
      if (!decoded)
        throw new Error("Debe acceder para obtener la informacion.");
      console.log(decoded);
      const found = await userModel.findById(decoded.id);
      if (!found) throw new Error("Debe acceder para obtener la informacion.");
      req.body = {
        data: req.body,
        user: found,
      };
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
