import { useState } from "react";
import Card from "../../utils/Card";

const LaLeoPopup = ({ trigger, setTrigger, handCards, socket }) => {
  const [laLeoSelected, setLaLeoSelected] = useState([]);

  return trigger ? (
    <div className="laleo-popup popup">
      <div className="popup-inner">
        <div className="laleo-cards">
          {handCards.map((card, index) => (
            <Card
              key={index}
              value={card.value}
              suit={card.suit}
              color={card.suit === "♣" || card.suit === "♠" ? "black" : "red"}
              socket={null}
              isPlayerTurn={false}
              isValidCard={false}
              isLaLeo={true}
              setLaLeoSelected={setLaLeoSelected}
              laLeoSelected={laLeoSelected}
            ></Card>
          ))}
        </div>
        {laLeoSelected.length === 2 && (
          <button
            className="laleo-button"
            onClick={() => {
              setTrigger(false);
              socket.emit("laleo-change", laLeoSelected);
            }}
          >
            CHANGE
          </button>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default LaLeoPopup;
