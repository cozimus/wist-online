import {
  addUser,
  removeUser,
  getRoom,
  playersInRoom,
  setNotReady,
  updateUsers,
  getUsers,
} from "./users.js";
import {
  gameSetup,
  updateTurn,
  updateCall,
  checkCurrentGame,
  endTurn,
  handleLaLeo,
  clearRoom,
} from "./game-logics.js";

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("CONNECT socket", socket.id);

    socket.on("disconnect", (reason) => {
      console.log(reason);
      const roomId = getRoom(socket.id);
      const users = removeUser(socket.id);
      if (playersInRoom(roomId) == null) {
        clearRoom(roomId);
      }
      io.in(roomId).emit("allUsers", users);
    });
    socket.on("create-room", (userData) => {
      // leave all possible rooms
      socket.rooms.forEach((room) => {
        if (socket.id !== room) {
          socket.leave(room);
          const usersInLeavedRoom = removeUser(socket.id);
          io.in(room).emit("allUsers", usersInLeavedRoom);
        }
      });
      socket.join(userData.roomId);
      const usersInRoom = addUser(userData);
      io.in(userData.roomId).emit("allUsers", usersInRoom);
    });
    socket.on("join-request", (userData) => {
      if (
        (playersInRoom(userData.roomId).length > 0) &
        (playersInRoom(userData.roomId).length < 6) &
        !checkCurrentGame(userData.roomId)
      ) {
        //leave all possible rooms
        socket.rooms.forEach((room) => {
          if (socket.id !== room) {
            socket.leave(room);
            const usersInLeavedRoom = removeUser(socket.id);
            io.in(room).emit("allUsers", usersInLeavedRoom);
          }
        });
        socket.join(userData.roomId);
        const usersInRoom = addUser(userData);
        socket.emit("room-is-valid", true);
        io.in(userData.roomId).emit("allUsers", usersInRoom);
      } else {
        socket.emit("room-is-valid", false);
      }
    });
    socket.on("start-game", (usersData) => {
      const gameInfo = gameSetup(usersData);
      io.in(usersData[0].roomId).emit("starting-game", gameInfo);
      const usersInRoom = setNotReady(usersData[0].roomId);
      io.in(usersData[0].roomId).emit("allUsers", usersInRoom);
    });
    socket.on("played-card", async (playedCard) => {
      const gameInfo = updateTurn(playedCard, socket.id, getRoom(socket.id));
      io.in(gameInfo.roomId).emit("update-info", gameInfo);
      if (gameInfo.playedCards.length === gameInfo.players.length) {
        //if the turn is over, check who is the winner
        gameInfo.gameReady = false;
        io.in(gameInfo.roomId).emit("update-info", gameInfo);
        await endTurn(gameInfo);
        io.in(gameInfo.roomId).emit("update-info", gameInfo);
      }
    });
    socket.on("call-selected", (call) => {
      const { gameInfo, valid } = updateCall(
        call,
        socket.id,
        getRoom(socket.id)
      );
      if (valid) {
        io.in(gameInfo.roomId).emit("update-info", gameInfo);
        io.in(gameInfo.roomId).emit("update-table-call", {
          gameInfo: gameInfo,
          valid: true,
        });
      } else {
        //the call is invalid
        socket.emit("update-table-call", {
          gameInfo: gameInfo,
          valid: false,
        });
      }
    });
    socket.on("update-users", (newUsers) => {
      const usersInRoom = updateUsers(newUsers);
      const roomId = newUsers[0].roomId;
      io.in(roomId).emit("allUsers", usersInRoom);
    });
    socket.on("laleo-change", (cards) => {
      const gameInfo = handleLaLeo(cards, socket.id, getRoom(socket.id));
      io.in(gameInfo.roomId).emit("update-info", gameInfo);
    });
  });
};

export default socketConnection;
