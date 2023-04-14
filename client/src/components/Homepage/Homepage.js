import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import Infopage from "./Infopage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [infoTrigger, setInfoTrigger] = useState(false);
  return (
    <div className="Homepage">
      {infoTrigger && <Infopage></Infopage>}
      <button id="info-button" onClick={() => setInfoTrigger(!infoTrigger)}>
        Info
      </button>
      {/* <button id="records-button" onClick={() => navigate("/records")}>
        Records
      </button> */}
      <div className="homepageColumn">
        <div className="alignLeft">
          <CreateRoomForm></CreateRoomForm>
        </div>
      </div>
      <div className="homepageColumn">
        <div className="alignLeft">
          <JoinRoomForm></JoinRoomForm>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
