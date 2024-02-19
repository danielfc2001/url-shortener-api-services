import mongoose from "mongoose";

export const connection = async () => {
  try {
    const dbConnection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/urlShortener"
    );
    if (dbConnection) {
      console.log("Conectado a la base de datos");
    }
  } catch (er) {
    console.log(er);
  }
};
