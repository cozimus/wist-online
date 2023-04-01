import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import { socket } from "../../socket";
const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="homepageColumn">
        <div className="alignLeft">
          <CreateRoomForm socket={socket}></CreateRoomForm>
        </div>
      </div>
      <div className="homepageColumn">
        <div className="alignLeft">
          <JoinRoomForm socket={socket}></JoinRoomForm>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
