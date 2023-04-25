import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
const CreateRoomForm = () => {
  const [hostName, setHostName] = useState("");
  const navigate = useNavigate();
  function handleCreateSubmit(e) {
    e.preventDefault();
    const roomId = uuid().slice(0, 11);
    const userData = {
      userName: hostName,
      userId: socket.id,
      roomId: roomId,
      host: true,
      ready: true,
    };
    navigate(`/room/${roomId}`);
    socket.emit("create-room", userData);
  }

  return (
    <form onSubmit={handleCreateSubmit}>
      <h1>Host a game</h1>
      <label htmlFor="hostName">Player Name</label>
      <br />
      <input
        type="text"
        placeholder="Player Name"
        id="hostName"
        name="hostName"
        maxLength="16"
        value={hostName}
        onChange={(event) => setHostName(event.target.value)}
        required
      />
      <br />
      <button type="submit" id="hostButton">
        Create a game
      </button>
    </form>
  );
};

export default CreateRoomForm;
