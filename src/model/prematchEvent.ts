import mongoose from "mongoose";

const PrematchEventSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  data: { type: String },
});

export default mongoose.model("PrematchEvent", PrematchEventSchema);
