import CardBack from "../../utils/CardBack";

const OpponentHand = ({ playerHandLength }) => {
  const cards = [];
  for (let i = 0; i < playerHandLength; i++) {
    cards.push(
      <CardBack key={i} position={i - (playerHandLength - 1) / 2}></CardBack>
    );
  }

  return <div className="OpponentHand">{cards}</div>;
};

export default OpponentHand;
