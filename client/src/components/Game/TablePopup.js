import TableRow from "../../utils/TableRow";
import "../../styles/popups.css";
import "../../styles/Table.css";
const TablePopup = ({
  pointsTable,
  trigger,
  gameEnded,
  setGameStarted,
  setGameEnded,
  users,
  socket,
}) => {
  return trigger ? (
    <div className="table-popup popup">
      <div className="popup-inner">
        <div className="table-container">
          <table className="table" cellSpacing="0">
            <thead>
              <tr>
                <th>Nomi</th>
                <th className="suit red">♥</th>
                <th className="suit red">♦</th>
                <th className="suit black">♣</th>
                <th className="suit black">♠</th>
                <th>Libera</th>
                <th>LaLeo</th>
                <th>Buio</th>
                <th>Wist</th>
              </tr>
            </thead>
            <tbody>
              {pointsTable.map((player) => (
                <TableRow
                  key={player.playerId}
                  data={player.callAndPoints}
                  name={player.playerName}
                ></TableRow>
              ))}
            </tbody>
          </table>
        </div>
        {gameEnded && (
          <button
            className="new-game-button"
            onClick={() => {
              setGameStarted(false);
              setGameEnded(false);

              socket.emit(
                "update-users",
                users.map((user) =>
                  user.userId === socket.id
                    ? {
                        ...user,
                        ready: true,
                      }
                    : { ...user }
                )
              );
            }}
          >
            Start a new game
          </button>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default TablePopup;
