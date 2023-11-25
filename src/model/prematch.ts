import mongoose from "mongoose";

const PrematchSchema = new mongoose.Schema({
  leagueId: { type: Number, required: true },
  sportId: { type: Number, required: true },
  data: { type: String },
});

export default mongoose.model("Prematch", PrematchSchema);
