import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import { socket } from "../../socket";
const Homepage = ({ userId }) => {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  return (
    <div className="Homepage">
      <div className="homepageColumn">
        <div className="alignLeft">
          <CreateRoomForm socket={socket} userId={userId}></CreateRoomForm>
        </div>
      </div>
      <div className="homepageColumn">
        <div className="alignLeft">
          <JoinRoomForm socket={socket} userId={userId}></JoinRoomForm>
        </div>
      </div>
      <div>{userId}</div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
};

export default Homepage;
