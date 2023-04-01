import "../../styles/popups.css";
import { socket } from "../../socket";
import { useState } from "react";

const CallPopup = ({ trigger, setIsBuio, maxCall, callSum, isLast }) => {
  const [isValidCall, setIsValidCall] = useState(true);
  function handleSubmit(e) {
    e.preventDefault();
    if (callSum + Number(e.target[0].value) === maxCall && isLast) {
      setIsValidCall(false);
    } else {
      socket.emit("call-selected", Number(e.target[0].value));
      setIsBuio(false);
      setIsValidCall(true);
    }
  }
  return trigger ? (
    <div className="call-popup">
      <div className="call-popup-inner">
        <form onSubmit={handleSubmit}>
          <label htmlFor="call">
            Chiamata:
            <input
              className="call-popup-input"
              autoFocus
              required
              type="number"
              id="call"
              name="call"
              min="0"
              max={`${maxCall}`}
            />
          </label>
          <input type="submit" value="&#10004;" />
        </form>
        {!isValidCall && (
          <span className="invalid-call-text">Invalid call</span>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default CallPopup;
