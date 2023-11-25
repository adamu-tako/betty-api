import { Request, Response } from "express";
import performRequest, { sportsList } from "../utils/customRequest";
import Live from "../model/live";
import dontenv from "dotenv";
dontenv.config();
const API_KEY = process.env.BET_SOFT_API_KEY;

let lastFetchTime: Date | null = null;

export const liveGames = async (req: Request, res: Response) => {
  try {
    const { sportId } = req.query;

    if (!sportId) {
      return res.status(400).json({ error: "Missing sportId parameter" });
    }

    const dbData = await Live.findOne({ sportId });

    if (dbData && dbData.sportId === Number(sportId)) {
      const currentTime = new Date();
      const lastFetchTimeInMemory = lastFetchTime || new Date();
      const timeDiffInSeconds =
        (currentTime.getTime() - lastFetchTimeInMemory.getTime()) / 1000;
      if (timeDiffInSeconds < 10) {
        return res
          .status(200)
          .json({ data: JSON.parse(dbData.data as string) });
      }
    }

    const response = await performRequest(
      `https://bet365soft.com/api/v3/inplay?apikey=${API_KEY}&sportId=${sportId}`
    );
    if (response) {
      if (dbData?.sportId === Number(sportId)) {
        await Live.findOneAndUpdate(
          { sportId },
          {
            $set: {
              data: JSON.stringify(response.data),
            },
          }
        );
      } else {
        const newLeague = new Live({
          sportId,
          data: JSON.stringify(response.data),
          name: sportsList.find((sport) => sport.id === Number(sportId))?.name,
        });
        await newLeague.save();
      }
      lastFetchTime = new Date();
      return res.status(response.status).json({ data: response.data });
    } else {
      return res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
