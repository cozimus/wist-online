import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="Homepage">
      <button id="info-button" onClick={() => navigate("/info")}>
        Info
      </button>
      <button id="records-button" onClick={() => navigate("/records")}>
        Records
      </button>
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
