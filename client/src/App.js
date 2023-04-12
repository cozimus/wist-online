// import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { socket } from "./socket";
import Homepage from "./components/Homepage/Homepage.js";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom.js";
import Game from "./components/Game/Game.js";
import TableTemplate from "./utils/TableTemplate.js";
import GameEnded from "./components/Game/GameEnded.js";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [pointsTable, setPointsTable] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [userId, setUserId] = useState(uuid().slice(0, 13));

  function createPointsTable(gameInfo) {
    const pointsTableTable = [];
    gameInfo.players.forEach((player) => {
      pointsTableTable.push({
        playerName: player.playerName,
        playerId: player.id,
        callAndPoints: TableTemplate,
      });
    });
    return pointsTableTable;
  }

  function updateCallTable(pointsTable, gameInfo, playerId) {
    return pointsTable.map((playerRow) =>
      playerRow.playerId === playerId
        ? {
            ...playerRow,
            callAndPoints: playerRow.callAndPoints.map((data) =>
              data.round === gameInfo.round
                ? {
                    ...data,
                    call: gameInfo.players.find(
                      (player) => player.id === playerId
                    ).call,
                  }
                : { ...data }
            ),
          }
        : { ...playerRow }
    );
  }

  function updatePreseTable(pointsTable, gameInfo) {
    return pointsTable.map((playerRow) => ({
      ...playerRow,
      callAndPoints: playerRow.callAndPoints.map((data) =>
        data.round === gameInfo.round
          ? {
              ...data,
              prese: gameInfo.players.find(
                (player) => player.id === playerRow.playerId
              ).prese,
            }
          : { ...data }
      ),
    }));
  }

  function updatePointsTable(pointsTable, gameInfo) {
    return pointsTable.map((playerRow) => ({
      ...playerRow,
      callAndPoints: playerRow.callAndPoints.map((data) =>
        data.round === gameInfo.round - 1
          ? {
              ...data,
              points: gameInfo.players.find(
                (player) => player.id === playerRow.playerId
              ).points,
              guessed:
                gameInfo.players.find(
                  (player) => player.id === playerRow.playerId
                ).points >=
                (playerRow.callAndPoints.find(
                  (column) => column.round === data.round - 1
                )
                  ? playerRow.callAndPoints.find(
                      (column) => column.round === data.round - 1
                    ).points + 11
                  : 11),
            }
          : { ...data }
      ),
    }));
  }

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
  }, []);

  useEffect(() => {
    if (
      window.performance.getEntriesByType("navigation")[0].type === "reload"
    ) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      localStorage.setItem("userId", userId);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
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
