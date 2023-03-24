import { createServer } from "http";
import { Server } from "socket.io";
import {
  addUser,
  removeUser,
  removeUserBySocket,
  getRoom,
  playersInRoom,
  setNotReady,
  updateUsers,
  getRoomBySocket,
  getUsers,
} from "./utils/users.js";
import {
  gameSetup,
  updateTurn,
  updateCall,
  checkCurrentGame,
  endTurn,
  handleLaLeo,
  clearRoom,
} from "./game-logics.js";
const PORT = process.env.PORT || 4000;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://wist-online.onrender.com"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
});

io.on("connection", (socket) => {
  if (socket.recovered) {
    // recovery was successful: socket.id, socket.rooms and socket.data were restored
    // console.log("reconnected    ", socket.id);
  } else {
    // console.log(socket.id);
    socket.on("disconnect", () => {
      const roomId = getRoomBySocket(socket.id);
      const users = removeUserBySocket(socket.id);
      // if (playersInRoom(roomId) == null) {
      //   clearRoom(roomId);
      // }
      console.log(getUsers());
      console.log(roomId, socket.id);
      console.log(users);
      io.in(roomId).emit("allUsers", users);
    });
    socket.on("create-room", (userData) => {
      //leave all possible rooms
      // console.log(socket.rooms);
      // socket.rooms.forEach((room) => {
      //   if (socket.id !== room) {
      //     socket.leave(room);
      //     const usersInLeavedRoom = removeUser(socket.id);
      //     io.in(room).emit("allUsers", usersInLeavedRoom);
      //   }
      // });
      socket.join(userData.roomId);
      const usersInRoom = addUser(userData);
      console.log(getUsers());
      io.in(userData.roomId).emit("allUsers", usersInRoom);
    });
    socket.on("join-request", (userData) => {
      if (
        (playersInRoom(userData.roomId).length > 0) &
        (playersInRoom(userData.roomId).length < 6) &
        !checkCurrentGame(userData.roomId)
      ) {
        //leave all possible rooms
        // socket.rooms.forEach((room) => {
        //   if (socket.id !== room) {
        //     socket.leave(room);
        //     const usersInLeavedRoom = removeUser(socket.id);
        //     io.in(room).emit("allUsers", usersInLeavedRoom);
        //   }
        // });
        socket.join(userData.roomId);
        const usersInRoom = addUser(userData);
        console.log(getUsers());
        socket.emit("room-is-valid", true);
        io.in(userData.roomId).emit("allUsers", usersInRoom);
      } else {
        socket.emit("room-is-valid", false);
      }
    });
    socket.on("start-game", (usersData) => {
      const gameInfo = gameSetup(usersData);
      // const socketsInRoom = io.sockets.adapter.rooms.get(usersData[0].roomId);
      // // Emit a message to each socket in the room, containing their info
      // [...socketsInRoom].forEach((socketId) => {
      //   io.sockets.sockets.get(socketId).emit("starting-game", gameInfo);
      // });
      io.in(usersData[0].roomId).emit("starting-game", gameInfo);
      const usersInRoom = setNotReady(usersData[0].roomId);
      io.in(usersData[0].roomId).emit("allUsers", usersInRoom);
    });
    socket.on("played-card", async (playedCard, userId) => {
      const gameInfo = updateTurn(playedCard, userId, getRoom(userId));
      io.in(gameInfo.roomId).emit("update-info", gameInfo);
      if (gameInfo.playedCards.length === gameInfo.players.length) {
        //if the turn is over, check who is the winner
        gameInfo.gameReady = false;
        io.in(gameInfo.roomId).emit("update-info", gameInfo);
        const round = await endTurn(gameInfo);
        io.in(gameInfo.roomId).emit("update-info", gameInfo);
        io.in(gameInfo.roomId).emit("write-table-prese", gameInfo);
      }
      if (
        gameInfo.players.reduce((partialSum, a) => partialSum + a.call, 0) ===
        "0"
      ) {
        io.in(gameInfo.roomId).emit("update-table-points", gameInfo);
      }
    });
    socket.on("call-selected", (call, userId) => {
      const { gameInfo, valid } = updateCall(call, userId, getRoom(userId));
      if (valid) {
        io.in(gameInfo.roomId).emit("update-info", gameInfo);
        io.in(gameInfo.roomId).emit("update-table-call", {
          gameInfo: gameInfo,
          playerId: userId,
        });
      }
    });
    socket.on("update-users", (newUsers) => {
      const usersInRoom = updateUsers(newUsers);
      const roomId = newUsers[0].roomId;
      io.in(roomId).emit("allUsers", usersInRoom);
    });
    socket.on("laleo-change", (cards, userId) => {
      const gameInfo = handleLaLeo(cards, userId, getRoom(userId));
      io.in(gameInfo.roomId).emit("update-info", gameInfo);
    });
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
