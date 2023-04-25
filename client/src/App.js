// import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import Homepage from "./components/Homepage/Homepage.js";
import WaitingRoom from "./components/WaitingRoom.js";
import Game from "./components/Game/Game.js";
import GameEnded from "./components/Game/GameEnded.js";
import Records from "./components/Records.js";
import Infopage from "./components/Infopage";
import NoMatch from "./components/NoMatch";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    socket.on("allUsers", (usersInRoom) => {
      setUsers(usersInRoom); //users inside the room
    });
    socket.on("starting-game", (gameInfo) => {
      setGameInfo(gameInfo);
      setGameStarted(true);
    });
    socket.on("update-info", (gameInfo) => {
      setGameInfo(gameInfo);
      if (gameInfo.round === 8) {
        setGameEnded(true);
      }
    });
    socket.on("update-table-call", ({ gameInfo, valid }) => {
      if (valid) {
        setGameInfo(gameInfo);
      }
    });
    socket.on("disconnect", () => {
      console.log("Connection lost with a socket");
    });
    socket.on("connect", () => {
      console.log("Connection established with socket  ", socket.id);
    });
    return () => {
      socket.off("allUsers");
      socket.off("starting-game");
      socket.off("update-info");
      socket.off("update-table-call");
      socket.off("connect");
      socket.off("disconnect");
    };
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/records" element={<Records />}></Route>
          <Route path="/info" element={<Infopage />}></Route>
          <Route
            path="/room/:roomId"
            element={
              !gameStarted ? (
                <WaitingRoom users={users} />
              ) : gameEnded ? (
                <GameEnded
                  users={users}
                  pointsTable={gameInfo.pointsTable}
                  setGameStarted={setGameStarted}
                  setGameEnded={setGameEnded}
                />
              ) : (
                <Game gameInfo={gameInfo} />
              )
            }
          ></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
