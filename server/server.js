import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

import writeData from "./utils/writeData.js";
import serverOptions from "./utils/serverOptions.js";
import socketConnection from "./utils/socketConnection.js";
const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, serverOptions);

app.use(express.json());

socketConnection(io);

app.post("/resultsData.json", (req, res) => {
  writeData("pointsTable", "resultsData.json");
  let data = req.body;
  res.send("Data Received: " + JSON.stringify(data));
});

httpServer.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
  console.log(`Server has started in environment ${process.env.NODE_ENV}`);
});
