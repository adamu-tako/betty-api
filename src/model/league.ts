import mongoose from "mongoose";

const LeagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportId: { type: Number, required: true },
  data: { type: String },
});

export default mongoose.model("Leagues", LeagueSchema);
