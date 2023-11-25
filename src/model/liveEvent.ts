import mongoose from "mongoose";

const LiveEventSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  data: { type: String },
});

export default mongoose.model("LiveEvent", LiveEventSchema);
