import "../../styles/Records.css";

import { useState, useEffect } from "react";
import createTables from "../../utils/getRecordTables";

const Records = () => {
  const [active, setActive] = useState("best-two-players");
  const [tables, setTables] = useState();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch("http://localhost:4000/records", {
          method: "GET",
        })
      ).json();
      // set state when the data received
      setTables(createTables(data));
    };

    dataFetch();
  }, []);

  return (
    <div className="Records">
      <div className="records-container">
        <ul>
          <li className="list-title">Best scores</li>
          <li>
            <a
              className={active === "best-two-players" ? "active" : ""}
              href="#best-two-players"
              onClick={() => setActive("best-two-players")}
            >
              2 Players
            </a>
          </li>
          <li>
            <a
              className={active === "best-three-players" ? "active" : ""}
              href="#best-three-players"
              onClick={() => setActive("best-three-players")}
            >
              3 Players
            </a>
          </li>
          <li>
            <a
              className={active === "best-four-players" ? "active" : ""}
              href="#best-four-players"
              onClick={() => setActive("best-four-players")}
            >
              4 Players
            </a>
          </li>
          <li>
            <a
              className={active === "best-five-players" ? "active" : ""}
              href="#best-five-players"
              onClick={() => setActive("best-five-players")}
            >
              5 Players
            </a>
          </li>
          <li>
            <a
              className={active === "best-six-players" ? "active" : ""}
              href="#best-six-players"
              onClick={() => setActive("best-six-players")}
            >
              6 Players
            </a>
          </li>
          <li className="list-title">Worst scores</li>
          <li>
            <a
              className={active === "worst-two-players" ? "active" : ""}
              href="#worst-two-players"
              onClick={() => setActive("worst-two-players")}
            >
              2 Players
            </a>
          </li>
          <li>
            <a
              className={active === "worst-three-players" ? "active" : ""}
              href="#worst-three-players"
              onClick={() => setActive("worst-three-players")}
            >
              3 Players
            </a>
          </li>
          <li>
            <a
              className={active === "worst-four-players" ? "active" : ""}
              href="#worst-four-players"
              onClick={() => setActive("worst-four-players")}
            >
              4 Players
            </a>
          </li>
          <li>
            <a
              className={active === "worst-five-players" ? "active" : ""}
              href="#worst-five-players"
              onClick={() => setActive("worst-five-players")}
            >
              5 Players
            </a>
          </li>
          <li>
            <a
              className={active === "worst-six-players" ? "active" : ""}
              href="#worst-six-players"
              onClick={() => setActive("worst-six-players")}
            >
              6 Players
            </a>
          </li>
          <li className="link-to-homepage">
            <a href="/">Home page</a>
          </li>
        </ul>
        {tables && (
          <div>
            <div className="records-page" id="best-two-players">
              <h2>Two Players game best scores:</h2>
              <div className="table-container">{tables.best2PTable}</div>
            </div>
            <div className="records-page" id="best-three-players">
              <h2>Three Players game best scores:</h2>
              <div className="table-container">{tables.best3PTable}</div>
            </div>
            <div className="records-page" id="best-four-players">
              <h2>Four Players game best scores:</h2>
              <div className="table-container">{tables.best4PTable}</div>
            </div>
            <div className="records-page" id="best-five-players">
              <h2>Five Players game best scores:</h2>
              <div className="table-container">{tables.best5PTable}</div>
            </div>
            <div className="records-page" id="best-six-players">
              <h2>Six Players game best scores:</h2>
              <div className="table-container">{tables.best6PTable}</div>
            </div>
            <div className="records-page" id="worst-two-players">
              <h2>Two Players game worst scores:</h2>
              <div className="table-container">{tables.worst2PTable}</div>
            </div>
            <div className="records-page" id="worst-three-players">
              <h2>Three Players game worst scores:</h2>
              <div className="table-container">{tables.worst3PTable}</div>
            </div>
            <div className="records-page" id="worst-four-players">
              <h2>Four Players game worst scores:</h2>
              <div className="table-container">{tables.worst4PTable}</div>
            </div>
            <div className="records-page" id="worst-five-players">
              <h2>Five Players game worst scores:</h2>
              <div className="table-container">{tables.worst5PTable}</div>
            </div>
            <div className="records-page" id="worst-six-players">
              <h2>Six Players game worst scores:</h2>
              <div className="table-container">{tables.worst6PTable}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
