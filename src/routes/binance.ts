import { Router, Request, Response } from "express";
import { client } from "../binance";
const router = Router();

router.get("/ping", async (req, res) => {
  try {
    const ping = await client.ping();

    res.status(200).send(ping);
  } catch (error) {
    res.send("SOmething Went wrong");
  }
});

export default router;
