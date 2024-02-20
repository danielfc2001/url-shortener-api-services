import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { connection } from "./database.js";
import { userModel } from "./Schemas/userModel.js";
import analyticsModel from "./Schemas/analyticsModel.js";
import { getLastWeekDates } from "./libs/getLastWeekDates.js";
import { getAnalyticsByDate } from "./libs/getAnalyticsByDate.js";

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
      } else {
        throw {
          message: "Error al procesar la peticion.",
        };
      }
    } catch (error) {
      console.log(error);
      socket.emit("error_service_stats_accounts", error.message);
    }
  });
  socket.on("get_service_stats_traffic", async () => {
    try {
      const getTodayTraffic = await analyticsModel.find({
        date: new Date().toLocaleDateString(),
      });
      if (getTodayTraffic) {
        socket.emit("result_service_stats_traffic", getTodayTraffic.length);
      } else {
        throw {
          message: "Error al procesar la peticion.",
        };
      }
    } catch (error) {
      console.log(error);
      socket.emit("error_service_stats_traffic", error.message);
    }
  });
  socket.on("get_url_traffic", async (id) => {
    try {
      const lastWeekDates = await getLastWeekDates();
      const lastWeekMatches = [];
      if (lastWeekDates) {
        console.log(lastWeekDates);
        for (let i = 0; i < lastWeekDates.length; i++) {
          const match = await getAnalyticsByDate(lastWeekDates[i], id);
          if (match) {
            console.log(match);
            lastWeekMatches.push(match);
          }
        }
        /*         const matches = lastWeekDates.map(async (el) => {
        }); */
        const result = await analyticsModel.find({
          urlId: id,
          date: new Date().toLocaleDateString(),
        });
        if (result && lastWeekMatches.length === 5) {
          console.log(lastWeekMatches);
          socket.emit("result_url_traffic", {
            today: result.length,
            lastWeek: lastWeekMatches,
          });
        } else {
          throw {
            message: "Error al procesar la peticion.",
          };
        }
      }
    } catch (error) {
      console.log(error);
      socket.emit("error_url_traffic", error.message);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("Server on port ", PORT);
});
