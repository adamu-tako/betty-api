import { Request, Response } from "express";
import performRequest, { sportsList } from "../utils/customRequest";
import Topmatch from "../model/topMatch";
import dontenv from "dotenv";
dontenv.config();
const API_KEY = process.env.BET_SOFT_API_KEY;

let lastFetchTime: Date | null = null;

export const topMatch = async (req: Request, res: Response) => {
  try {
    const { match } = req.query;

    if (!match) {
      return res.status(400).json({ error: "Missing match parameter" });
    }

    const dbData = await Topmatch.findOne({ match });

    if (dbData && dbData.match === match) {
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
      `https://bet365soft.com/api/v3/topMatch?apikey=${API_KEY}&match=${match}`
    );
    if (response) {
      if (dbData?.match === match) {
        await Topmatch.findOneAndUpdate(
          { match },
          {
            $set: {
              data: JSON.stringify(response.data),
            },
          }
        );
      } else {
        const newEvent = new Topmatch({
          match,
          data: JSON.stringify(response.data),
        });
        await newEvent.save();
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
