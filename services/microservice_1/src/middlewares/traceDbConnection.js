import mongoose from "mongoose";

export const traceDbConnection = async (req, res, next) => {
  try {
    const conn = mongoose.createConnection(
      "mongodb://127.0.0.1:27017/urlShortener"
    );
    conn.on("disconnected", (stream) => {
      return res.status(503).render("pages/index", {
        typeError: 500,
      });
    });
    conn.on("reconnected", (stream) => {
      next();
    });
    conn.on("connected", (stream) => {
      next();
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).render("pages/index", {
      typeError: 500,
    });
  }
};
