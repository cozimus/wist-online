const Card = ({
  socket,
  value,
  suit,
  isPlayerTurn,
  isValidCard,
  isLaLeo,
  laLeoSelected,
  setLaLeoSelected,
  color,
  position,
}) => {
  let cardPlayed = false;

  function handleClick() {
    socket.emit("played-card", {
      value: value,
      suit: suit,
    });
    cardPlayed = true;
  }

  function isSelected() {
    if (laLeoSelected) {
      return (
        laLeoSelected.filter(
          (card) => card.value === value && card.suit === suit
        ).length > 0
      );
    } else return false;
  }

  function handleLaLeo() {
    if (
      laLeoSelected.filter((card) => card.value === value && card.suit === suit)
        .length > 0
    ) {
      setLaLeoSelected(
        laLeoSelected.filter(
          (card) => card.value !== value || card.suit !== suit
        )
      );
    } else if (laLeoSelected.length < 2) {
      setLaLeoSelected([
        ...laLeoSelected,
        {
          value: value,
          suit: suit,
        },
      ]);
    }
  }

  return (
    <div
      onClick={
        isPlayerTurn && isValidCard && !cardPlayed
          ? handleClick
          : isLaLeo
          ? handleLaLeo
          : undefined
      }
      className={`card ${color} ${isPlayerTurn && isValidCard ? "valid" : ""} ${
        isSelected() ? "selected" : ""
      }`}
      data-value={`${value} ${suit}`}
      style={Style(position)}
    >
      {suit}
    </div>
  );
};

const Style = (position) => ({
  left: ` ${-1.7 * position}vw`,
});

export default Card;
