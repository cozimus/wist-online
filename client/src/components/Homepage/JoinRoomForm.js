import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ socket }) => {
  const [joinName, setJoinName] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();
  function handleJoinSubmit(e) {
    e.preventDefault();

    const userData = {
      userName: joinName,
      userId: socket.id,
      roomId: roomId,
      host: false,
      ready: true,
    };
    socket.emit("join-request", userData);
    socket.on("room-is-valid", (isValid) => {
      if (isValid) {
        navigate(`/${roomId}`);
      } else {
        alert(
          "The selected room is not valid. Maybe it's full (max 6 players), it's not created yet or the game is already started"
        );
      }
    });
  }

  return (
    <form onSubmit={handleJoinSubmit}>
      <h1>Join a game</h1>
      <label htmlFor="joinName">Player Name</label> <br />
      <input
        type="text"
        placeholder="Player Name"
        id="joinName"
        name="joinName"
        maxLength="20"
        value={joinName}
        onChange={(event) => setJoinName(event.target.value)}
        required
      />
      <br />
      <label htmlFor="roomId">Room Id</label>
      <br />
      <input
        type="text"
        placeholder="Room Id"
        id="roomId"
        name="roomId"
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
        required
      />
      <br />
      <button type="submit" id="joinButton">
        Join a game
      </button>
    </form>
  );
};

export default JoinRoomForm;
