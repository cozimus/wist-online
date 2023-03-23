import CardBack from "../../utils/CardBack";

const OpponentHand = ({ playerHandLength, style, rotated }) => {
  const cards = [];
  for (let i = 0; i < playerHandLength; i++) {
    cards.push(
      <CardBack
        key={i}
        position={i - (playerHandLength - 1) / 2}
        rotated={rotated}
      ></CardBack>
    );
  }

  return (
    <div className="OpponentHand" style={style}>
      {cards}
    </div>
  );
};

export default OpponentHand;
