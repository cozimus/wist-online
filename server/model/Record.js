import { Schema, model } from "mongoose";

const recordSchema = new Schema({
  playerName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  players: {
    type: Number,
    required: true,
  },
});

export default model("Record", recordSchema);
