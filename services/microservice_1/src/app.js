import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import shortenerRoutes from "./routes/shortener.routes.js";
import { connection } from "./connection.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 4000;

app.use(cors());
app.use(json());
app.use(morgan("combined"));
connection();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static(path.resolve(__dirname + "/public")));

app.use("/", shortenerRoutes);

app.listen(port, () => {
  console.log("Server on port %s", port);
});
