import { Request, Response } from "express";
import performRequest from "../utils/customRequest";
import dontenv from "dotenv";
dontenv.config();
const API_KEY = process.env.BET_SOFT_API_KEY;

export const resultByLeague = async (req: Request, res: Response) => {
  try {
    const { leagueId, fromDate, toDate } = req.query;

    if (!leagueId || !fromDate || !toDate) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/resultByLeague?apikey=${API_KEY}&leagueId=${leagueId}&fromDate=${fromDate}&toDate=${toDate}`
    );

    if (response) {
      res.status(response.status).json({ data: response.data });
    } else {
      res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    console.error("Error in competitions-seasons endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
};
