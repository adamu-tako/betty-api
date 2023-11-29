import { Request, Response } from "express";
import performRequest, {
  processLeagueData,
  sportsList,
} from "../utils/customRequest";
import Leagues from "../model/league";
import dontenv from "dotenv";
import { it } from "node:test";
dontenv.config();
const API_KEY = process.env.BET_SOFT_API_KEY;

export const fetchLeagues = async (req: Request, res: Response) => {
  try {
    const { sportId } = req.query;

    if (!sportId) {
      return res.status(400).json({ error: "Missing sportId parameter" });
    }

    const dbData = await Leagues.findOne({ sportId });

    if (dbData && dbData.sportId === Number(sportId)) {
      const currentTime = new Date();
      const lastFetchTime = dbData.lastFetchTime || new Date();
      const timeDiffInSeconds =
        (currentTime.getTime() - lastFetchTime.getTime()) / 1000;

      if (timeDiffInSeconds < 10) {
        return res.status(200).json({ data: dbData.data });
      } else {
        await Leagues.findOneAndUpdate(
          { sportId },
          { $set: { lastFetchTime: new Date() } }
        );
      }
    }

    const response = await performRequest(
      `https://bet365soft.com/api/v3/leagues?apikey=${API_KEY}&sportId=${sportId}`
    );

    if (response) {
      const updatedData = processLeagueData(response.data.leagues);
      await Leagues.findOneAndUpdate(
        { sportId },
        {
          $set: {
            data: updatedData,
            lastFetchTime: new Date(),
          },
        },
        { upsert: true }
      );

      return res.status(response.status).json({ data: updatedData });
    } else {
      return res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    res.status(500).send(`Internal Server Error, ${error}`);
  }
};
