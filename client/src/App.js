// import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import Homepage from "./components/Homepage/Homepage.js";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom.js";
import Game from "./components/Game/Game.js";
import GameEnded from "./components/Game/GameEnded.js";
import Records from "./components/Records/Records.js";
import {
  createPointsTable,
  updateCallTable,
  updatePreseTable,
  updatePointsTable,
} from "./utils/TableUpdate";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [pointsTable, setPointsTable] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    socket.on("allUsers", (usersInRoom) => {
      setUsers(usersInRoom); //users inside the room
    });
    socket.on("starting-game", (info) => {
      setGameInfo(info);
      setGameStarted(true);
      setPointsTable(createPointsTable(info));
    });
    socket.on("update-info", (info) => {
      setGameInfo(info);
    });
    socket.on("update-table-call", ({ gameInfo, playerId, valid }) => {
      if (valid) {
        setPointsTable((pointsTable) =>
          updateCallTable(pointsTable, gameInfo, playerId)
        );
      }
    });
    socket.on("write-table-prese", (gameInfo) => {
      setPointsTable((pointsTable) => updatePreseTable(pointsTable, gameInfo));
      if (gameInfo.round === 8) {
        setGameEnded(true);
        if (users.find((user) => socket.id === user.userId).host) {
          // socket.emit(
          //   "save-points-table",
          //   updatePreseTable(pointsTable, gameInfo)
          // );
        }
      }
    });
    socket.on("update-table-points", (gameInfo) => {
      setPointsTable((pointsTable) => updatePointsTable(pointsTable, gameInfo));
    });
    socket.on("disconnect", () => {
      console.log("Connection lost with socket  ", socket.id);
    });
    socket.on("connect", () => {
      console.log("Connection established with socket  ", socket.id);
    });
    return () => {
      socket.off("allUsers");
      socket.off("starting-game");
      socket.off("update-info");
      socket.off("update-table-call");
      socket.off("write-table-prese");
      socket.off("update-table-points");
      socket.off("connect");
      socket.off("disconnect");
    };
  });

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.returnValue = "are you sure you want to leave this page?";
      return "are you sure you want to leave this page?";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  });

  useEffect(() => {
    if (
      window.performance.getEntriesByType("navigation")[0].type === "reload"
    ) {
      window.location.href = "/";
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/records" element={<Records />}></Route>
          <Route
            path="/:roomId"
            element={
              !gameStarted ? (
                <WaitingRoom users={users} socket={socket} />
              ) : gameEnded ? (
                <GameEnded
                  users={users}
                  socket={socket}
                  pointsTable={pointsTable}
                  setGameStarted={setGameStarted}
                  setGameEnded={setGameEnded}
                />
              ) : (
                <Game
                  socket={socket}
                  gameInfo={gameInfo}
                  pointsTable={pointsTable}
                />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
