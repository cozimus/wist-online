import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import Infopage from "./Infopage";
import { socket } from "../../socket";
import { useState } from "react";
const Homepage = () => {
  const [infoTrigger, setInfoTrigger] = useState(false);
  return (
    <div className="Homepage">
      {infoTrigger && <Infopage></Infopage>}
      <button id="info-button" onClick={() => setInfoTrigger(!infoTrigger)}>
        Info
      </button>
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
