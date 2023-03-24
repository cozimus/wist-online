import { useParams } from "react-router-dom";

const WaitingRoom = ({ users, socket, userId }) => {
  function isHost({ users, userId }) {
    let result;
    try {
      result = users.find((users) => users.userId === userId).host;
    } catch (e) {
      return false;
    } finally {
      return result;
    }
  }
  function allReady(users) {
    return !users.find((user) => !user.ready);
  }

  const { roomId } = useParams();

  return (
    <div className="WaitingRoom">
      <h1>WaitingRoom Id={roomId}</h1>
      <h2>List of players:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.userName} {user.host && "(host) "}
            {userId === user.userId && "(you)"}
            {user.ready ? "✔️" : "❌"}
          </li>
        ))}
      </ul>
      {isHost({ users, userId }) && allReady(users) && users.length >= 2 && (
        <button
          onClick={() => {
            socket.emit("start-game", users);
          }}
        >
          Start the Game
        </button>
      )}
    </div>
  );
};

export default WaitingRoom;
