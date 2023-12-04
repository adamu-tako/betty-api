import mongoose from "mongoose";

const marketSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  status: { type: String },
  rate: { type: String },
});

const oddsSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  markets: [marketSchema],
});

const PrematchEventSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  lastFetchTime: { type: Date },
  data: {
    success: { type: Boolean },
    event: {
      eventId: { type: String },
      sportId: { type: Number },
      sportName: { type: String },
      leagueId: { type: Number },
      leagueName: { type: String },
      country: { type: String },
      match: { type: String },
      home: { type: String },
      away: { type: String },
      homeIcon: { type: String },
      awayIcon: { type: String },
      venue: { type: String },
      eventStart: { type: Number },
    },
    group: [
      {
        id: { type: Number },
        name: { type: String },
      },
    ],
    odds: [oddsSchema],
  },
});

export default mongoose.model("PrematchEvent", PrematchEventSchema);
