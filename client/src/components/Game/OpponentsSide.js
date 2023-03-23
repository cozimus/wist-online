import OpponentHand from "./OpponentHand";
import PlayedCards from "./PlayedCards";

const OpponentsSide = ({ gameInfo, playerId }) => {
  let myComponentStyle;
  let rotated;
  switch (gameInfo.players.length) {
    case 2:
      myComponentStyle = [
        {
          gridArea: "top-hand",
          justifyContent: "center",
          flexDirection: "row",
        },
      ];
      rotated = [false];
      break;
    case 3:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          flexDirection: "column",
        },
        {
          gridArea: "right-hand",
          flexDirection: "column",
        },
      ];
      rotated = [true, true];
      break;
    case 4:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          flexDirection: "column",
        },
        {
          gridArea: "top-hand",
          justifyContent: "center",
          flexDirection: "row",
        },
        {
          gridArea: "right-hand",
          flexDirection: "column",
        },
      ];
      rotated = [true, false, true];
      break;
    case 5:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          flexDirection: "column",
        },
        {
          gridArea: "top-hand",
          gridColumn: "1 / span 3",
          justifyContent: "center",
          flexDirection: "row",
        },
        {
          gridArea: "top-hand",
          gridColumn: "4 / span 3",
          justifyContent: "center",
          flexDirection: "row",
        },
        {
          gridArea: "right-hand",
          flexDirection: "column",
        },
      ];
      rotated = [true, false, false, true];

      break;
    case 6:
      myComponentStyle = [
        {
          gridArea: "left-hand",
          flexDirection: "column",
        },
        {
          gridArea: "top-hand",
          gridColumn: "1 / span 2",
          justifyContent: "center",
          flexDirection: "row",
        },
        {
          gridArea: "top-hand",
          gridColumn: "3 / span 2",
          justifyContent: "center",
          flexDirection: "row",
        },
        {
          gridArea: "top-hand",
          gridColumn: "5 / span 2",
          justifyContent: "center",
          flexDirection: "row",
        },
        {
          gridArea: "right-hand",
          flexDirection: "column",
        },
      ];
      rotated = [true, false, false, false, true];
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
        <OpponentHand
          playerHandLength={
            gameInfo.players[(playerIndex + i + 1) % gameInfo.players.length]
              .playerHand.length
          }
          style={myComponentStyle[i]}
          key={i}
          rotated={rotated[i]}
        ></OpponentHand>
      ))}
      <PlayedCards playedCards={gameInfo.playedCards}></PlayedCards>
    </div>
  );
};

export default OpponentsSide;
