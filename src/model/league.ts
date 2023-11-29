import mongoose from "mongoose";

const LeagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportId: { type: Number, required: true },
  data: [
    {
      id: { type: Number, required: true },
      name: [
        {
          competition: { type: String, required: false },
          country: { type: String, required: false },
          division: { type: String, required: false },
          more: { type: String, required: false },
        },
      ],
      icon: { type: String, default: null },
    },
  ],
  lastFetchTime: { type: Date },
});

export default mongoose.model("Leagues", LeagueSchema);
