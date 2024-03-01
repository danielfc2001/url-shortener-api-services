import jwt from "jsonwebtoken";
import { userModel } from "../schemas/userModel.js";

export const checkingUser = async (req, res, next) => {
  console.log(req._remoteAddress);
  const { token } = req.query;
  if (!token)
    return res
      .status(403)
      .json({ message: "Debe acceder para obtener la informacion." });
  try {
    const decoded = jwt.decode(token);
    if (!decoded) throw new Error("Debe acceder para obtener la informacion.");
    console.log(decoded);
    const found = await userModel.findById(decoded.id);
    if (!found) throw new Error("Debe acceder para obtener la informacion.");
    req.body = {
      data: req.body,
      user: found,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
