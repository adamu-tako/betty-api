import express, { Router, Request, Response } from "express";
import {
  getAllActiveSports,
  getLiveAndUpcomingEvents,
} from "../utils/fetchData";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Betty" });
});

router.get("/home", async (req: Request, res: Response) => {
  const response = await getAllActiveSports();

  if (response.length > 0) {
    res.json({ data: response });
  } else {
    res.status(400).send("Failed to fetch");
  }
});

router.get("/liveEvents", async (req: Request, res: Response) => {
  const liveEvents = await getLiveAndUpcomingEvents();

  res.json({ liveEvents });
});

export default router;
