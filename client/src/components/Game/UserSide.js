import Card from "../../utils/Card";
import "../../styles/Card.css";

const UserSide = ({
  playerInfo,
  socket,
  playerTurn,
  firstPlayedSuit,
  isLaLeoOver,
  isBuio,
}) => {
  return (
    <div className="UserSide">
      <div className="UserCards">
        {!isBuio &&
          playerInfo.playerHand.map((card, index) => (
            <Card
              key={index}
              value={card.value}
              suit={card.suit}
              color={card.suit === "♣" || card.suit === "♠" ? "black" : "red"}
              socket={socket}
              isPlayerTurn={
                playerTurn === playerInfo.roundPosition && isLaLeoOver
              }
              isValidCard={
                playerInfo.playerHand.filter(
                  (handCard) => handCard.suit === firstPlayedSuit
                ).length === 0 || card.suit === firstPlayedSuit
              }
            ></Card>
          ))}
      </div>
      <div className="user-turn-text">
        {playerTurn === playerInfo.roundPosition && "Your turn"}
      </div>
    </div>
  );
};

export default UserSide;
