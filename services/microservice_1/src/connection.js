import mongoose from "mongoose";

export const connection = async () => {
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  try {
    const dbConnection = await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.8uoiccy.mongodb.net/?retryWrites=true&w=majority`
    );
    if (dbConnection) {
      console.log("Conectado a la base de datos");
    }
  } catch (er) {
    console.log(er);
  }
};
