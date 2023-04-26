import OpponentHand from "./OpponentHand";
import PlayedCards from "./PlayedCards";

const OpponentsSide = ({ gameInfo, playerId }) => {
  let myComponentStyle;
  switch (gameInfo.players.length) {
    case 2:
      myComponentStyle = [
        {
          gridArea: "top-hand",
          transform: "rotate(+0deg)",
        },
      ];
      break;
    case 3:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          transform: "rotate(-90deg)",
        },
        {
          gridArea: "right-hand",
          transform: "rotate(+90deg)",
        },
      ];
      break;
    case 4:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          transform: "rotate(-90deg)",
        },
        {
          gridArea: "top-hand",
          transform: "rotate(+0deg)",
        },
        {
          gridArea: "right-hand",
          transform: "rotate(+90deg)",
        },
      ];
      break;
    case 5:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          transform: "rotate(-90deg)",
        },
        {
          gridArea: "top-hand",
          gridColumn: "1 / span 4",
          transform: "rotate(+0deg)",
        },
        {
          gridArea: "top-hand",
          gridColumn: "5 / span 4",
          transform: "rotate(+0deg)",
        },
        {
          gridArea: "right-hand",
          transform: "rotate(+90deg)",
        },
      ];

      break;
    case 6:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          transform: "rotate(-90deg)",
        },
        {
          gridArea: "top-hand",
          gridColumn: "1 / span 3",
          transform: "rotate(+0deg)",
        },
        {
          gridArea: "top-hand",
          gridColumn: "4 / span 2",
          transform: "rotate(+0deg)",
        },
        {
          gridArea: "top-hand",
          gridColumn: "6 / span 3",
          transform: "rotate(+0deg)",
        },
        {
          gridArea: "right-hand",
          transform: "rotate(+90deg)",
        },
      ];
      break;
    default:
      break;
  }
  const playerIndex = gameInfo.players.find(
    (player) => player.id === playerId
  ).firstRoundPosition;
  return (
    <div className="OpponentsSide">
      {Array.from({ length: gameInfo.players.length - 1 }, (_, i) => (
        <div className="PlayerSpot" style={myComponentStyle[i]} key={i}>
          <span className="OpponentName">
            {gameInfo.players[(playerIndex + i + 1) % gameInfo.players.length]
              .call !== 1
              ? gameInfo.players[
                  (playerIndex + i + 1) % gameInfo.players.length
                ].playerName
              : "BF"}
            {gameInfo.players[(playerIndex + i + 1) % gameInfo.players.length]
              .roundPosition === gameInfo.playerTurn
              ? String.fromCodePoint("0x1F7E1")
              : ""}
          </span>
          <OpponentHand
            playerHandLength={
              gameInfo.players[(playerIndex + i + 1) % gameInfo.players.length]
                .playerHand.length
            }
          ></OpponentHand>
        </div>
      ))}
      <PlayedCards playedCards={gameInfo.playedCards}></PlayedCards>
    </div>
  );
};

export default OpponentsSide;
