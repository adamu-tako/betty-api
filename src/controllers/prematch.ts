import { Request, Response } from "express";
import performRequest, { sportsList } from "../utils/customRequest";
import Prematch from "../model/prematch";
import dontenv from "dotenv";
dontenv.config();
const API_KEY = process.env.BET_SOFT_API_KEY;

let lastFetchTime: Date | null = null;

export const prematch = async (req: Request, res: Response) => {
  try {
    const { sportId, leagueId } = req.query;

    if (!sportId || !leagueId) {
      return res
        .status(400)
        .json({ error: "Missing sportId or leagueId parameter" });
    }

    const dbData = await Prematch.findOne({ sportId, leagueId });

    if (
      dbData &&
      dbData.sportId === Number(sportId) &&
      dbData.leagueId === Number(leagueId)
    ) {
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
      `https://bet365soft.com/api/v3/prematch?apikey=${API_KEY}&sportId=${sportId}&leagueId=${leagueId}`
    );
    if (response) {
      if (
        dbData?.sportId === Number(sportId) &&
        dbData.leagueId === Number(leagueId)
      ) {
        await Prematch.findOneAndUpdate(
          { sportId, leagueId },
          {
            $set: {
              data: JSON.stringify(response.data),
            },
          }
        );
      } else {
        const newLeague = new Prematch({
          sportId,
          data: JSON.stringify(response.data),
          leagueId: leagueId,
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
