import Record from "../model/Record.js";

const handleNewRecord = async (data) => {
  const { playerName, score, players } = data;

  const result = await Record.create({
    playerName: playerName,
    score: score,
    players: players,
  });
};

const getAllRecords = async (req, res) => {
  const records = await Record.find();
  if (!records) return res.status(204).json({ messege: "No employees found" });
  res.json(records);
};

export { handleNewRecord, getAllRecords };
