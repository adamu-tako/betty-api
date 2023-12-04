import { Request, Response } from "express";
import performRequest, { sportsList } from "../utils/customRequest";
import PrematchEvent from "../model/prematchEvent";
import dontenv from "dotenv";
dontenv.config();
const API_KEY = process.env.BET_SOFT_API_KEY;

let lastFetchTime: Date | null = null;

export const prematchEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ error: "Missing eventId parameter" });
    }

    const dbData = await PrematchEvent.findOne({ eventId });

    if (dbData && dbData.eventId === Number(eventId)) {
      const currentTime = new Date();
      const lastFetchTimeInMemory = lastFetchTime || new Date();
      const timeDiffInSeconds =
        (currentTime.getTime() - lastFetchTimeInMemory.getTime()) / 1000;
      if (timeDiffInSeconds < 10) {
        return res.status(200).json({ data: dbData.data });
      }
    }

    const response = await performRequest(
      `https://bet365soft.com/api/v3/prematchEvent?apikey=${API_KEY}&eventId=${eventId}`
    );
    if (response) {
      const fprematchData = await PrematchEvent.findOneAndUpdate(
        { eventId },
        {
          $set: {
            data: response.data,
            lastFetchTime: new Date(),
          },
        },
        { upsert: true }
      );
      return res.status(response.status).json({ data: fprematchData });
    } else {
      return res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    res.status(500).send(`Internal Server Error ${error}`);
  }
};
