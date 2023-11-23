import express, { Router, Request, Response } from "express";
import performRequest from "../utils/customRequest";
const router = Router();
const API_KEY = "xhkhnncnzzpseseb84t9ct74";
const API_MODE = "trial";

/* 
This endpoints fetches all the competitions available it returns relevant information about each competition like competitionId, gender, etc.
*/
router.get("/competitions", async (req: Request, res: Response) => {
  try {
    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/competitions.json?api_key=${API_KEY}`
    );

    console.log(response);

    if (response) {
      res.status(200).json({ data: response.data });
    } else {
      res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    console.error("Error while getting competitions endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* 
params: 1. competitionId = string ==> "sr:competition:7". 
Note that the id is returned from the endpoint above.

This endpoints fetches competition season.

"http://localhost:3000/competition/seasons?competitionId=sr:competition:7"
*/
router.get("/competition/seasons", async (req: Request, res: Response) => {
  try {
    const { competitionId } = req.query;

    if (!competitionId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }

    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/competitions/${competitionId}/seasons.json?api_key=${API_KEY}`
    );

    if (response) {
      res.json({ data: response.data });
    } else {
      res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    console.error("Error in competitions-seasons endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* 
params: 1. competitionId = string ==> "sr:competition:7". 
Note that the id is returned from the endpoint above.

This endpoints fetches competition info.

"http://localhost:3000/competition/info?competitionId=sr:competition:7"
*/
router.get("/competition/info", async (req: Request, res: Response) => {
  try {
    const { competitionId } = req.query;

    if (!competitionId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }

    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/competitions/${competitionId}/info.json?api_key=${API_KEY}`
    );

    if (response) {
      res.status(response.status).json({ data: response.data });
    } else {
      res.status(400).send("Failed to fetch competitions");
    }
  } catch (error) {
    console.error("Error in competitions-info endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* 
params: 1. competitorId = string ==> "sr:competitor:44". 

This endpoints fetches competitor information.

"http://localhost:3000/competitor/info?competitorId=sr:competitor:44"
*/
router.get("/competitor/info", async (req: Request, res: Response) => {
  try {
    const { competitorId } = req.query;

    if (!competitorId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }

    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/competitors/${competitorId}/profile.json?api_key=${API_KEY}`
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
params: 1. competitorId = string ==> "sr:competitor:44". 

This endpoints fetches competitor summary.

"http://localhost:3000/competitor/summary?competitorId=sr:competitor:44"
*/
router.get("/competitor/summary", async (req: Request, res: Response) => {
  try {
    const { competitorId } = req.query;

    if (!competitorId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }

    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/competitors/${competitorId}/summaries.json?api_key=${API_KEY}`
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
params: 1. competitorId = string ==> "sr:competitor:44". 
        2. competitorId2 = string ==> "sr:competitor:50"

This endpoints fetches competitor versus competitor info.

"http://localhost:3000/competitor/versus/competitor?competitorId=sr:competitor:44&competitorId2=sr:competitor:50"
*/
router.get(
  "/competitor/versus/competitor",
  async (req: Request, res: Response) => {
    try {
      const { competitorId, competitorId2 } = req.query;

      if (!competitorId) {
        return res
          .status(400)
          .json({ error: "Missing competitionId parameter" });
      }
      const response = await performRequest(
        `https://api.sportradar.us/soccer/${API_MODE}/v4/en/competitors/${competitorId}/versus/${competitorId2}/summaries.json?api_key=${API_KEY}`
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
  }
);

/* 
params: 1. date = yyy-mm-dd ==> "2023-11-18". 

This endpoints daily summaries of soccer events.

"http://localhost:3000/daily/summaries?date=2023-11-18"
*/
router.get("/daily/summaries", async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/schedules/${date}/summaries.json?api_key=${API_KEY}`
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
params: 1. date = yyy-mm-dd ==> "2023-11-18". 

This endpoints daily summaries of soccer events.

"http://localhost:3000/daily/summaries?date=2023-11-18"
*/
router.get("/daily/summaries", async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/schedules/${date}/summaries.json?api_key=${API_KEY}`
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
This endpoints daily summaries of soccer events.

"http://localhost:3000/live/summaries?date=2023-11-18"
*/
router.get("/live/summaries", async (req: Request, res: Response) => {
  try {
    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/schedules/live/summaries.json?api_key=${API_KEY}`
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
params: 1. date = playerId ==> "sr:player:159665". 

This endpoints daily summaries of soccer events.

"http://localhost:3000/daily/summaries?date=2023-11-18"
*/
router.get("/players", async (req: Request, res: Response) => {
  try {
    const { playerId } = req.query;

    if (!playerId) {
      return res.status(400).json({ error: "Missing competitionId parameter" });
    }
    const response = await performRequest(
      `https://api.sportradar.us/soccer/${API_MODE}/v4/en/players/${playerId}/profile.json?api_key=${API_KEY}`
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
