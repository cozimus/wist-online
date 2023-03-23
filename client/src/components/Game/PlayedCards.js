import Card from "../../utils/Card";
const PlayedCards = ({ playedCards }) => {
  return (
    <div className="PlayedCards">
      {playedCards.map((card, index) => (
        <Card
          key={index}
          value={card.value}
          suit={card.suit}
          color={card.suit === "♣" || card.suit === "♠" ? "black" : "red"}
          isPlayerTurn={false}
          position={index}
        ></Card>
      ))}
    </div>
  );
};

export default PlayedCards;
