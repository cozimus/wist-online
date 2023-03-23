import Card from "../../utils/Card";

const LastTurnPopup = ({ trigger, lastTurnCards }) => {
  return trigger ? (
    <div className="last-turn-popup popup">
      <div className="popup-inner">
        <div className="last-turn-popup-container">
          {lastTurnCards.length > 0
            ? lastTurnCards.map((card, index) => (
                <Card
                  key={index}
                  value={card.value}
                  suit={card.suit}
                  color={
                    card.suit === "♣" || card.suit === "♠" ? "black" : "red"
                  }
                  socket={null}
                  isPlayerTurn={false}
                  isValidCard={false}
                ></Card>
              ))
            : "Questo è il primo giro, NSG"}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default LastTurnPopup;
