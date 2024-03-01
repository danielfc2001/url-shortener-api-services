import jwt from "jsonwebtoken";
import { compareHash } from "../libs/compareHash.js";
import { createHash } from "../libs/createHash.js";
import { createJwt } from "../libs/createJwt.js";
import { userModel } from "../schemas/userModel.js";

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // VALIDATING NEW USER
    const found = await userModel.find({ username });
    if (found.length != 0)
      throw {
        responseStatus: 400,
        responseMessage: "The username must be unique.",
      };
    if (!username || !password)
      throw {
        responseStatus: 400,
        responseMessage: "The username and password are required.",
      };

    // CREATING NEW USER
    const hashedPassword = await createHash(password);
    if (!hashedPassword)
      throw {
        responseStatus: 500,
        responseMessage: "Error creating a new user on the server.",
      };
    const user = new userModel({
      username,
      password: hashedPassword,
    });
    const newUser = await user.save();
    if (!newUser)
      throw {
        responseStatus: 500,
        responseMessage: "Error creating a new user on the server.",
      };
    const userToken = await createJwt({
      id: newUser._id,
      username: newUser.username,
    });
    if (!userToken)
      throw {
        responseStatus: 500,
        responseMessage:
          "Error creating a new user on the server. {AUTHORIZATION_TOKEN}",
      };

    //EMITING THE NEW USER RESPONSE
    res.status(201).json({
      message: "New user created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(error.responseStatus).send({ message: error.responseMessage });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const found = await userModel.find({ username });
    if (found.length === 0)
      throw {
        responseStatus: 400,
        responseMessage: "Error. Username or password incorrect.",
      };

    const match = await compareHash(password, found[0].password);
    if (!match)
      throw {
        responseStatus: 400,
        responseMessage: "Error. Username or password incorrect.",
      };

    const token = await createJwt({
      id: found[0]._id,
      username: found[0].username,
    });
    if (!token)
      throw {
        responseStatus: 500,
        responseMessage:
          "Error creating a new user on the server. {AUTHORIZATION_TOKEN}",
      };

    res.status(200).json({
      message: "Successfully authenticated.",
      token,
      user: { id: found[0]._id, username: found[0].username },
    });
  } catch (error) {
    console.error(error);
    res.status(error.responseStatus).send({ message: error.responseMessage });
  }
};

export const getUser = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.decode(token);
    if (!decoded)
      throw {
        responseStatus: 401,
        responseMessage: "The authentication token to be expired.",
      };
    const found = await userModel.findById(decoded.id);
    if (!found)
      throw {
        responseStatus: 401,
        responseMessage: "User not found.",
      };
    res.status(200).json({
      message: "Successfully authenticated.",
      user: { id: found._id, username: found.username },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.responseStatus)
      .send({ message: error.responseMessage });
  }
};
