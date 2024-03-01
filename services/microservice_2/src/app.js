import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { connection } from "./database.js";
import { commentsModel } from "./Schemas/commentsModel.js";
import { getAllComments } from "./controllers/comments.controller.js";

const PORT = process.env.PORT || 8070;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

connection();
app.use(cors());

app.get("/", getAllComments);

io.on("connection", (socket) => {
  socket.on("create_comment", async (comment) => {
    try {
      const newComment = new commentsModel({
        creator: comment.creator,
        comment: comment.comment,
        rate: comment.rate,
        date: new Date().getTime(),
      });
      console.log(newComment);
      const savedComment = await newComment.save();
      if (!savedComment)
        throw {
          message: "No se a podido crear la nueva entrada.",
        };
      socket.broadcast.emit("result_create_comment", {
        creator: savedComment.creator,
        comment: savedComment.comment,
        rate: savedComment.rate,
        date: savedComment.date.toString() ?? undefined,
      });
    } catch (error) {
      console.log(error);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("Server on port ", PORT);
});
