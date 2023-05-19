import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
// const cron = require("node-cron");
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import api from "./src/routes/api.js";

// mongoose
//   .connect(process.env.MONGODB_CONNECTION_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("connected to mongodb");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", api);

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
