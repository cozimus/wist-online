import TablePopup from "./TablePopup";

const GameEnded = ({
  pointsTable,
  setGameStarted,
  setGameEnded,
  users,
  socket,
}) => {
  return (
    <div className="GameEnded">
      <TablePopup
        trigger={true}
        pointsTable={pointsTable}
        gameEnded={true}
        setGameStarted={setGameStarted}
        setGameEnded={setGameEnded}
        users={users}
        socket={socket}
      ></TablePopup>
    </div>
  );
};

export default GameEnded;
