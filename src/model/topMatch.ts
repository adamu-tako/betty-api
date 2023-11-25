import mongoose from "mongoose";

const TopMatchSchema = new mongoose.Schema({
  match: { type: String, required: true },
  data: { type: String },
});

export default mongoose.model("TopMatch", TopMatchSchema);
