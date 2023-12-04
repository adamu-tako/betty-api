import { Request, Response } from "express";
import { client } from "../binance";
import { CandleChartInterval_LT, CandlesOptions } from "binance-api-node";

export const coinPairs = [
  "BTCUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "USTCUSDT",
  "SUPERUSDT",
  "IOTAUSDT",
  "MEMEUSDT",
];

export const pingFutures = async (req: Request, res: Response) => {
  try {
    const futurePing = await client.futuresPing();
    res.send(futurePing);
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
};

export const futuresExchangeInfo = async (req: Request, res: Response) => {
  try {
    const futuresExchange = await client.futuresExchangeInfo();
    res.send(futuresExchange);
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
};

export const topCoinPrices = async (req: Request, res: Response) => {
  try {
    // Use Promise.all to make concurrent asynchronous calls
    const coinPricesPromises = coinPairs.map(async (pair) => {
      const pairPrice = await client.dailyStats({ symbol: pair });
      return pairPrice;
    });

    // Wait for all promises to resolve
    const topCoinPriceArr = await Promise.all(coinPricesPromises);

    res.send(topCoinPriceArr);
  } catch (error) {
    console.error("Error fetching top coin prices:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const candlesController = async (req: Request, res: Response) => {
  try {
    const { symbol, interval, startTime, endTime } = req.query;

    if (!symbol || !interval) {
      return res.status(400).send("Symbol and interval are required.");
    }

    const startTimestamp = startTime
      ? parseInt(startTime as string)
      : undefined;
    const endTimestamp = endTime ? parseInt(endTime as string) : undefined;

    const candleParams: CandlesOptions = {
      symbol: symbol as string,
      interval: interval as CandleChartInterval_LT,
      limit: 500,
    };

    // Use consistent variable names for clarity
    if (startTimestamp && endTimestamp) {
      candleParams.startTime = startTimestamp;
      candleParams.endTime = endTimestamp;
    }

    const exchangeInfo = await client.candles(candleParams);

    res.send(exchangeInfo);
  } catch (error) {
    console.error("Error fetching candles:", JSON.stringify(error));
    res.status(500).send(`Something went wrong: ${error}`);
  }
};

export const dailyStatsController = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;
    let prices;

    if (symbol) {
      prices = await client.dailyStats({ symbol: symbol as string });
    } else {
      prices = await client.dailyStats();
    }

    res.send(prices);
  } catch (error) {
    res.send(`SOmething Went wrong, ${error}`);
  }
};
