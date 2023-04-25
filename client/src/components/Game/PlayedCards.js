import Card from "../../utils/Card";
const PlayedCards = ({ playedCards }) => {
  return (
    <div className="PlayedCards">
      {playedCards.map((element, index) => (
        <Card
          key={index}
          value={element.card.value}
          suit={element.card.suit}
          color={
            element.card.suit === "♣" || element.card.suit === "♠"
              ? "black"
              : "red"
          }
          isPlayerTurn={false}
          position={index}
        ></Card>
      ))}
    </div>
  );
};

export default PlayedCards;
