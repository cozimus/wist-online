import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import "dotenv/config.js";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./config/dbConn.js";
import { serverOptions, corsOptions } from "./config/serverOptions.js";
import socketConnection from "./utils/socketConnection.js";
import {
  handleNewRecord,
  getAllRecords,
} from "./controllers/recordController.js";

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, serverOptions);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
connectDB();
socketConnection(io);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/records", handleNewRecord);
app.get("/records", getAllRecords);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  httpServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  );
});
