import TablePopup from "./TablePopup";

const GameEnded = ({
  pointsTable,
  setGameStarted,
  setGameEnded,
  users,
  userId,
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
        userId={userId}
      ></TablePopup>
    </div>
  );
};

export default GameEnded;
