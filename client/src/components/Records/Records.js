import { useState, useEffect } from "react";

const Records = () => {
  const [records, setRecords] = useState();
  const getRecords = async () => {
    const response = await fetch("http://localhost:4000/records", {
      method: "GET",
    }).then((response) => response.json());

    setRecords(response);
  };

  useEffect(() => {
    getRecords();
  });

  return (
    <div>
      {records &&
        records.map((record, index) => (
          <div className="item-container" key={index}>
            Name:{record.playerName} Score:{record.score}
          </div>
        ))}
    </div>
  );
};

export default Records;
