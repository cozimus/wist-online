import Card from "../../utils/Card";

const LastTurnPopup = ({ trigger, lastTurnCards }) => {
  return trigger ? (
    <div className="last-turn-popup popup">
      <div className="popup-inner">
        <div className="last-turn-popup-container">
          {lastTurnCards.map((element, index) => (
            <Card
              key={index}
              value={element.card.value}
              suit={element.card.suit}
              color={
                element.card.suit === "♣" || element.card.suit === "♠"
                  ? "black"
                  : "red"
              }
              socket={null}
              isPlayerTurn={false}
              isValidCard={false}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default LastTurnPopup;
