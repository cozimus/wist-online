import { Schema, model } from "mongoose";

var callAndPointsSchema = Schema({
  call: Number,
  prese: Number,
  guessed: Boolean,
  points: Number,
  round: Number,
});

const recordSchema = new Schema({
  playerName: String,
  callAndPoints: [callAndPointsSchema],
  score: Number,
  players: Number,
});

const MODEL = process.env.NODE_ENV === "production" ? "Record" : "Example";
console.log("Modello:", MODEL);
export default model(MODEL, recordSchema);
