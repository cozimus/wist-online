import React from "react";

const CardBack = ({ position }) => {
  return (
    <div className="CardBack" style={Style(position)}>
      <img src={require("./cards_back.png")} alt="CardBack" />
    </div>
  );
};

const Style = (position) => ({
  position: "relative",
  left: ` ${-1.7 * position}vw`,
});

export default CardBack;
