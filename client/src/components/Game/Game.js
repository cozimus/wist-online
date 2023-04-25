import UserSide from "./UserSide";
import OpponentsSide from "./OpponentsSide";
import TablePopup from "./TablePopup";
import CallPopup from "./CallPopup";
import LastTurnPopup from "./LastTurnPopup";
import LaLeoPopup from "./LaLeoPopup";
import { socket } from "../../socket";
import { useState, useEffect } from "react";
const Game = ({ gameInfo }) => {
  const [tableButtonPopup, setTableButtonPopup] = useState(false);
  const [lastTurnButtonPopup, setLastTurnButtonPopup] = useState(false);
  const [laLeoTrigger, setLaLeoTrigger] = useState(false);
  const [isBuio, setIsBuio] = useState(false);
  const [isWistTurn, setIsWistTurn] = useState(false);

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

  useEffect(() => {
    if (gameInfo.round === 5) {
      setLaLeoTrigger(true);
    }
    if (gameInfo.round === 6) {
      setIsBuio(true);
    }
    if (gameInfo.round === 7) {
      setIsWistTurn(true);
      socket.emit("call-selected", 0, socket.id);
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

      {gameInfo.lastPlayedCards.length > 0 && (
        <button
          className="last-turn-button"
          onClick={() => setLastTurnButtonPopup(!lastTurnButtonPopup)}
        >
          P
        </button>
      )}

      <TablePopup
        trigger={tableButtonPopup}
        pointsTable={gameInfo.pointsTable}
        gameEnded={false}
        currentRound={gameInfo.round}
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
        setIsBuio={setIsBuio}
        maxCall={gameInfo.players.length === 4 ? 12 : 8}
        callSum={gameInfo.players.reduce(
          (partialSum, a) => partialSum + Number(a.call),
          0
        )}
        isLast={
          gameInfo.players.find((player) => player.id === socket.id)
            .roundPosition ===
          gameInfo.players.length - 1
        }
      ></CallPopup>
      <OpponentsSide gameInfo={gameInfo} playerId={socket.id}></OpponentsSide>
      <UserSide
        playerInfo={gameInfo.players.find((player) => player.id === socket.id)}
        playerTurn={gameInfo.playerTurn}
        isLaLeoOver={gameInfo.laLeoCards.length === 0}
        firstPlayedSuit={gameInfo.firstPlayedSuit}
        isBuio={isBuio}
        gameReady={gameInfo.gameReady}
      ></UserSide>
    </div>
  );
};

export default Game;
