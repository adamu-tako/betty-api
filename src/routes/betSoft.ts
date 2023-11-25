import express, { Router, Request, Response } from "express";
import performRequest, { sportsList } from "../utils/customRequest";
import { fetchLeagues } from "../controllers/leagues";
import dontenv from "dotenv";
import { prematch } from "../controllers/prematch";
import { prematchEvent } from "../controllers/prematchEvent";
import { liveGames } from "../controllers/live";
import { liveEvent } from "../controllers/liveEvent";
import { topMatch } from "../controllers/topMatch";
import { handleSearch } from "../controllers/search";
import { resultBySport } from "../controllers/resultBySport";
import { resultByLeague } from "../controllers/resultByLeague";
import { resultByEvent } from "../controllers/resultByEvent";
const router = Router();
dontenv.config();

const API_KEY = process.env.BET_SOFT_API_KEY;

router.get("/allSports", (req, res) => {
  try {
    res.status(200).send({ data: sportsList, message: "success" });
  } catch (error) {
    res.status(500).send({ data: null, message: "Something went wrong" });
  }
});

/* 
params: 1. sportId = number ==> 1.

This endpoints daily summaries of soccer events.

"http://localhost:3000/leagues?sportId=1"
*/
router.get("/leagues", fetchLeagues);

/* 
params: 1. sportId = number ==> 1.
        1. leagueId = number ==> 118587.

This endpoints daily summaries of soccer events.

"http://localhost:3000/prematch?sportId=1&leagueId=118587"
*/
router.get("/prematch", prematch);

/* 
params: 1. eventId = number ==> 465778281.

This endpoints daily summaries of soccer events.

"http://localhost:3000/prematch/event?eventId=465778281"
*/
router.get("/prematch/event", prematchEvent);

/* 
params: 1. sportId = number ==> 1.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live?sportId=1"
*/
router.get("/live", liveGames);

/* 
params: 1. eventId = number ==> 466136290.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?eventId=466136290"
*/
router.get("/live/event", liveEvent);

/* 
params: 1. match = {"live" | "upcoming"} ==> live.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/topMatch", topMatch);

/* 
params: 1. match = {"live" | "upcoming"} ==> live.
        2. text = string ==> nadrid

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live&text=madrid"
*/
router.get("/search", handleSearch);

/* 
params: 1. sportId = number ==> 1.
        2. fromDate = Date ==> 2023-12-11
        3. toDate = Date ==> 2023-12-12

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/resultBySport", resultBySport);

/* 
params: 1. leagueId = number ==> 1.
        2. fromDate = Date ==> 2023-12-11
        3. toDate = Date ==> 2023-12-12

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/resultByLeague", resultByLeague);

/* 
params: 1. eventId = number ==> 1.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/resultByEvent", resultByEvent);

export default router;
