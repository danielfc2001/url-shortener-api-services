import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { connection } from "./database.js";
import { userModel } from "./Schemas/userModel.js";
import analyticsModel from "./Schemas/analyticsModel.js";

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

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  socket.on("get_service_stats_accounts", async () => {
    try {
      const result = await userModel.find({});
      if (result) {
        socket.emit("result_service_stats_accounts", result.length);
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("get_service_stats_traffic", async () => {
    try {
      const getTodayTraffic = await analyticsModel.find({
        date: new Date().toLocaleDateString(),
      });
      if (getTodayTraffic) {
        socket.emit("result_service_stats_traffic", getTodayTraffic.length);
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("get_url_traffic", async (id) => {
    try {
      console.log(id);
      const result = await analyticsModel.find({
        urlId: id,
        date: new Date().toLocaleDateString(),
      });
      console.log(result);
      if (result) {
        socket.emit("result_url_traffic", result.length);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("Server on port ", PORT);
});
