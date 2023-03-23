import { useParams } from "react-router-dom";

const WaitingRoom = ({ users, socket }) => {
  function isHost({ users, socket }) {
    let result;
    try {
      result = users.find((users) => users.userId === socket.id).host;
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
            {socket.id === user.userId && "(you)"}
            {user.ready ? "✔️" : "❌"}
          </li>
        ))}
      </ul>
      {isHost({ users, socket }) && allReady(users) && users.length >= 3 && (
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
