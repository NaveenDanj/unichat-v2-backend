import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
// const cron = require("node-cron");
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";

const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

dotenv.config();

import api from "./src/routes/api.js";
import onConnection from "./src/routes/socket.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", api);

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("chat message", (message) => {
//     console.log("Received message:", message);
//     io.emit("chat message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// initialize socket.io connection
io.on("connection", onConnection);

let PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
