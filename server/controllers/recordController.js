import Record from "../model/Record.js";

const handleNewRecord = async (data) => {
  const { playerName, callAndPoints, players } = data;

  const result = await Record.create({
    playerName: playerName,
    callAndPoints: callAndPoints,
    score: callAndPoints[7].points,
    players: players,
  });
};

const getAllRecords = async (req, res) => {
  const records = await Record.find();
  if (!records) return res.status(204).json({ messege: "No data found" });
  res.json(records);
};

export { handleNewRecord, getAllRecords };
