import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
  sportId: { type: Number, required: true },
  data: { type: String },
});

export default mongoose.model("Live", LiveSchema);
