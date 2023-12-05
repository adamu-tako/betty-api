import { Router, Request, Response } from "express";
import { client } from "../binance";
import {
  accountInfo,
  candlesController,
  dailyStatsController,
  fetchDepositHistory,
  futuresExchangeInfo,
  makeOrder,
  pingFutures,
  topCoinPrices,
  withdraw,
} from "../controllers/binanceControllers";
const router = Router();

router.get("/ping", async (_req, res) => {
  try {
    const ping = await client.ping();

    res.send(ping);
  } catch (error) {
    res.send("SOmething Went wrong");
  }
});

router.get("/exchangeInfo", async (req, res) => {
  try {
    const exchangeInfo = await client.exchangeInfo({ symbol: "BTCUSDT" });

    res.send(exchangeInfo);
  } catch (error) {
    res.send("SOmething Went wrong");
  }
});

/* 
Param	Type	Required	Default
symbol	String	true	
limit	Number	false	100
*/
router.get("/getOrderBook", async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;

    const exchangeInfo = await client.book({ symbol: symbol as string });

    res.send(exchangeInfo);
  } catch (error) {
    res.send(`SOmething Went wrong, ${error}`);
  }
});

/*
get the prices for a symbol not passing a symbol returns prices for all symbols 

params: symbol: String [e.g: "ETHBTC"]
*/
router.get("/prices", async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;
    let prices;

    if (symbol) {
      prices = await client.prices({ symbol: symbol as string });
    } else {
      prices = await client.prices();
    }

    res.send(prices);
  } catch (error) {
    res.send(`SOmething Went wrong, ${error}`);
  }
});

/*
Get recent trades of a symbol.
symbol is required
limit is not
*/
router.get("/trades", async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;
    let prices;

    prices = await client.trades({ symbol: symbol as string });

    res.send(prices);
  } catch (error) {
    res.send(`SOmething Went wrong, ${error}`);
  }
});

/*
get best price/qty on the order book for all symbols.

params: no params
*/
router.get("/allBookTickers", async (req: Request, res: Response) => {
  try {
    const bookTickers = await client.allBookTickers();

    res.send(bookTickers);
  } catch (error) {
    res.send(`SOmething Went wrong, error: ${error}`);
  }
});

/*
get the Current average price for a symbol.

params: symbol ==> not required
*/
router.get("/avgPrice", async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;
    let prices;

    prices = await client.trades({ symbol: symbol as string });

    res.send(prices);
  } catch (error) {
    res.send(`SOmething Went wrong, ${error}`);
  }
});

router.get("/futuresPing", pingFutures);
router.get("/futuresExchangeInfo", futuresExchangeInfo);
router.get("/topPrices", topCoinPrices);
/*
Params: Interval, limit, startTime, endTime ==> more description in the table below.


Param	Type	Required	Default	[Description]
symbol	String	true		
interval	String	false	5m	[1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]
limit	Number	false	500	[Max 1000]
startTime	Number	false		
endTime	Number	false	
*/
router.get("/candles", candlesController);
router.get("/makeOrder", makeOrder);
/*n THIS ENDPOINT CAN BE USED TO GET THE STAT FOR A COIN, IT DOES THE SAME THE THE `topPrices` ENDPOINT ABOVE.
get the 24 hour price change statistics, not providing a symbol will return all tickers and is resource-expensive.

params: symbol: String [e.g: "ETHBTC"]
*/
router.get("/dailyStats", dailyStatsController);
router.get("/depositHistory", fetchDepositHistory);
router.get("/withdraw", withdraw);
router.get("/accountInfo", accountInfo);

export default router;
