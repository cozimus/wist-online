import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import { socket } from "../../socket";
const Homepage = ({ userId }) => {
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
    </div>
  );
};

export default Homepage;
