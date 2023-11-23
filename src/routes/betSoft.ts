import express, { Router, Request, Response } from "express";
import performRequest from "../utils/customRequest";
const router = Router();
const API_KEY = "eaff83b9fbb746de62cf31341e756278";

const sportsList = [
  { name: "Football", id: 1 },
  { name: "Cricket", id: 66 },
  { name: "Basketball", id: 3 },
  { name: "Tennis", id: 4 },
  { name: "Volleyball", id: 6 },
  { name: "Baseball", id: 5 },
  { name: "Boxing", id: 9 },
  { name: "American Football", id: 13 },
  { name: "Handball", id: 8 },
  { name: "Rugby League", id: 7 },
  { name: "Table Tennis", id: 10 },
  { name: "Badminton", id: 16 },
  { name: "Ice Hockey", id: 2 },
  { name: "Snooker", id: 30 },
];

/* 
params: 1. sportId = number ==> 1.

This endpoints daily summaries of soccer events.

"http://localhost:3000/leagues?sportId=1"
*/
router.get("/leagues", async (req: Request, res: Response) => {
  try {
    const { sportId } = req.query;

    if (!sportId) {
      return res.status(400).json({ error: "Missing sportId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/leagues?apikey=${API_KEY}&sportId=${sportId}`
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
});

/* 
params: 1. sportId = number ==> 1.
        1. leagueId = number ==> 118587.

This endpoints daily summaries of soccer events.

"http://localhost:3000/prematch?sportId=1&leagueId=118587"
*/
router.get("/prematch", async (req: Request, res: Response) => {
  try {
    const { sportId, leagueId } = req.query;

    if (!sportId || !leagueId) {
      return res
        .status(400)
        .json({ error: "Missing sportId or leagueId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/prematch?apikey=${API_KEY}&sportId=${sportId}&leagueId=${leagueId}`
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
});

/* 
params: 1. eventId = number ==> 465778281.

This endpoints daily summaries of soccer events.

"http://localhost:3000/prematch/event?eventId=465778281"
*/
router.get("/prematch/event", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/prematchEvent?apikey=${API_KEY}&eventId=${eventId}`
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
});

/* 
params: 1. sportId = number ==> 1.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live?sportId=1"
*/
router.get("/live", async (req: Request, res: Response) => {
  try {
    const { sportId } = req.query;

    if (!sportId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/inplay?apikey=${API_KEY}&sportId=${sportId}`
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
});

/* 
params: 1. eventId = number ==> 466136290.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?eventId=466136290"
*/
router.get("/live/event", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/inplayEvent?apikey=${API_KEY}&eventId=${eventId}`
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
});

/* 
params: 1. match = {"live" | "upcoming"} ==> live.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/topMatch", async (req: Request, res: Response) => {
  try {
    const { match } = req.query;

    if (!match) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/topMatch?apikey=${API_KEY}&match=${match}`
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
});

/* 
params: 1. match = {"live" | "upcoming"} ==> live.
        2. text = string ==> nadrid

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live&text=madrid"
*/
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { match, text } = req.query;

    if (!match || !text) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/search?apikey=${API_KEY}&match=${match}&text=${text}`
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
});

/* 
params: 1. sportId = number ==> 1.
        2. fromDate = Date ==> 2023-12-11
        3. toDate = Date ==> 2023-12-12

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/resultBySport", async (req: Request, res: Response) => {
  try {
    const { sportId, fromDate, toDate } = req.query;

    if (!sportId || !fromDate || !toDate) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/resultBySport?apikey=${API_KEY}&sportId=${sportId}&fromDate=${fromDate}&toDate=${toDate}`
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
});

/* 
params: 1. leagueId = number ==> 1.
        2. fromDate = Date ==> 2023-12-11
        3. toDate = Date ==> 2023-12-12

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/resultByLeague", async (req: Request, res: Response) => {
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
});

/* 
params: 1. eventId = number ==> 1.

This endpoints daily summaries of soccer events.

"http://localhost:3000/live/event?match=live"
*/
router.get("/resultByLeague", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://bet365soft.com/api/v3/resultByEvent?apikey=${API_KEY}&eventId=${eventId}`
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
});

export default router;
