import "../../styles/popups.css";

const CallPopup = ({ trigger, socket, setIsBuio, maxCall, userId }) => {
  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("call-selected", Number(e.target[0].value), userId);
    setIsBuio(false);
  }
  return trigger ? (
    <div className="call-popup">
      <div className="call-popup-inner">
        <form onSubmit={handleSubmit}>
          <label htmlFor="call">
            Chiamata:
            <input
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
      </div>
    </div>
  ) : (
    ""
  );
};

export default CallPopup;
