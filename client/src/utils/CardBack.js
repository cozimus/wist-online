import React from "react";

const CardBack = ({ position, rotated }) => {
  return rotated ? (
    <div className="CardBack rotated" style={Style(position, rotated)}>
      <img src={require("./cards_back_rotated.jpg")} alt="CardBack" />
    </div>
  ) : (
    <div className="CardBack" style={Style(position, rotated)}>
      <img src={require("./cards_back.jpg")} alt="CardBack" />
    </div>
  );
};

const Style = (position, rotated) =>
  rotated
    ? {
        position: "relative",
        bottom: ` ${1.7 * position}vw`,
      }
    : {
        position: "relative",
        left: ` ${-1.7 * position}vw`,
      };

export default CardBack;
