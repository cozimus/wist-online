import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ socket }) => {
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
    navigate(`/${roomId}`);
    socket.emit("create-room", userData);

    //test code
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "DB/resultsData.json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch("http://localhost:4000/resultsData.json", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        maxLength="20"
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
