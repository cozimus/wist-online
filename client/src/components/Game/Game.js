import UserSide from "./UserSide";
import OpponentsSide from "./OpponentsSide";
import TablePopup from "./TablePopup";
import CallPopup from "./CallPopup";
import LastTurnPopup from "./LastTurnPopup";
import LaLeoPopup from "./LaLeoPopup";
import { useState, useEffect } from "react";
const Game = ({ socket, gameInfo, pointsTable }) => {
  const [tableButtonPopup, setTableButtonPopup] = useState(false);
  const [lastTurnButtonPopup, setLastTurnButtonPopup] = useState(false);
  const [laLeoTrigger, setLaLeoTrigger] = useState(false);
  const [isBuio, setIsBuio] = useState(false);
  const [isWistTurn, setIsWistTurn] = useState(false);

  useEffect(() => {
    if (gameInfo.round === 5) {
      setLaLeoTrigger(true);
    }
    if (gameInfo.round === 6) {
      setIsBuio(true);
    }
    if (gameInfo.round === 7) {
      setIsWistTurn(true);
      socket.emit("call-selected", 0);
    }
  }, [gameInfo.round]);

  return (
    <div className="Game">
      <button
        className="table-button"
        onClick={() => setTableButtonPopup(!tableButtonPopup)}
      >
        T
      </button>
      <button
        className="last-turn-button"
        onClick={() => setLastTurnButtonPopup(!lastTurnButtonPopup)}
      >
        P
      </button>
      <TablePopup
        trigger={tableButtonPopup}
        pointsTable={pointsTable}
        gameEnded={false}
      ></TablePopup>
      <LastTurnPopup
        trigger={lastTurnButtonPopup}
        lastTurnCards={gameInfo.lastPlayedCards}
      ></LastTurnPopup>
      <LaLeoPopup
        trigger={
          laLeoTrigger && !gameInfo.players.find((player) => player.call === "")
        }
        handCards={
          gameInfo.players.find((player) => player.id === socket.id).playerHand
        }
        socket={socket}
        setTrigger={setLaLeoTrigger}
      ></LaLeoPopup>
      <CallPopup
        trigger={
          gameInfo.players.find((player) => player.id === socket.id).call ===
            "" &&
          gameInfo.playerTurn ===
            gameInfo.players.find((player) => player.id === socket.id)
              .roundPosition &&
          !isWistTurn
        }
        socket={socket}
        setIsBuio={setIsBuio}
        maxCall={gameInfo.players.length === 4 ? 12 : 8}
      ></CallPopup>
      <OpponentsSide gameInfo={gameInfo} playerId={socket.id}></OpponentsSide>
      <UserSide
        playerInfo={gameInfo.players.find((player) => player.id === socket.id)}
        socket={socket}
        playerTurn={gameInfo.playerTurn}
        isLaLeoOver={(gameInfo.laLeoCards = [])}
        firstPlayedSuit={gameInfo.firstPlayedSuit}
        isBuio={isBuio} //------------------------------------------------------------------------------------------ da cambiare
      ></UserSide>
    </div>
  );
};

export default Game;
