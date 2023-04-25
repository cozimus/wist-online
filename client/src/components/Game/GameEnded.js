import TablePopup from "./TablePopup";
import { socket } from "../../socket";

const GameEnded = ({ pointsTable, setGameStarted, setGameEnded, users }) => {
  return (
    <div className="GameEnded">
      <TablePopup
        trigger={true}
        pointsTable={pointsTable}
        gameEnded={true}
        setGameStarted={setGameStarted}
        setGameEnded={setGameEnded}
        users={users}
      ></TablePopup>
    </div>
  );
};

export default GameEnded;
