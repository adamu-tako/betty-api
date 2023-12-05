import { Request, Response } from "express";
import { client } from "../binance";
import {
  CandleChartInterval_LT,
  CandlesOptions,
  OrderType,
} from "binance-api-node";

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

/*
This endpoint allows you to place a new order in the trading system. It supports various parameters to customize the order according to your requirements

Parameters
1. symbol (Type: String, Required: TRUE)
Description: Symbol to trade.
2. side (Type: String, Required: TRUE, Default: BUY)
Description: Side of the order (BUY or SELL).
3. type (Type: String, Required: FALSE, Default: LIMIT)
Description: Order type.
4. quantity (Type: String, Required: TRUE)
Description: Order quantity.
5. price (Type: String, Required: TRUE)
Description: Order price.
6. timeInForce (Type: String, Required: FALSE, Default: GTC)
Description: Time in force for the order.
7. newClientOrderId (Type: String, Required: FALSE)
Description: A unique ID for the order. Automatically generated if not sent.
8. stopPrice (Type: Number, Required: FALSE)
Description: Used with stop orders.
9. activationPrice (Type: Number, Required: FALSE)
Description: Used with TRAILING_STOP_MARKET orders.
10. callbackRate (Type: Number, Required: FALSE)
Description: Used with TRAILING_STOP_MARKET orders.
11. newOrderRespType (Type: String, Required: FALSE, Default: RESULT)
Description: Specifies the type of response to receive (ACK, RESULT, or FULL).
12. icebergQty (Type: Number, Required: FALSE)
Description: Used with iceberg orders.
13. recvWindow (Type: Number, Required: FALSE)
Description: Time window for receiving the response.

{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "1.5",
  "price": "45000.00",
  "timeInForce": "GTC",
  "newClientOrderId": "unique-id-123",
  "stopPrice": 46000.00,
  "activationPrice": 45500.00,
  "callbackRate": 1.5,
  "newOrderRespType": "RESULT",
  "icebergQty": 0.5,
  "recvWindow": 5000
}

Notes
Make sure to use proper authentication headers for this endpoint.
Check the symbol is valid and active before placing an order.
Ensure that the account has sufficient balance for the order.
Feel free to reach out if you have any questions or need further assistance.

*/

export const makeOrder = async (req: Request, res: Response) => {
  try {
    const { symbol, side, quantity, price, type } = req.query; // There are other params that can be added as specified above.

    const order = await client.order({
      symbol: "BTCUSDT",
      side: "BUY",
      quantity: "100",
      price: "0.0002",
      type: OrderType.LIMIT,
    });

    res.send(order);
  } catch (error) {
    res.status(500).send(`Something wrong: ${error}`);
  }
};

/*

Params: 
coin?: string | undefined;
    status?: number | undefined;
    startTime?: number | undefined;
    endTime?: number | undefined;
    offset?: number | undefined;
    limit?: number | undefined;
    recvWindow?: number | undefined;
*/
export const fetchDepositHistory = async (req: Request, res: Response) => {
  try {
    const depositHis = await client.depositHistory({ coin: "BTCUSDT" });
    res.send(depositHis);
  } catch (error) {
    res.status(500).send(`Something wrong: ${error}`);
  }
};

/*
Params: 

coin: string;
    network?: string | undefined;
    address: string;
    amount: number;
    name?: string | undefined;
    transactionFeeFlag?: boolean | undefined;

    note: withdrawal returns the withdrawal id.
*/
export const withdraw = async (req: Request, res: Response) => {
  try {
    const withdraw = -(await client.withdraw({
      coin: "ETH",
      address: "0xfa97c22a03d8522988c709c24283c0918a59c795",
      amount: 100,
    }));

    res.send(withdraw);
  } catch (error) {
    res.status(500).send(`Something wrong: ${error}`);
  }
};

export const accountInfo = async (req: Request, res: Response) => {
  try {
    const info = await client.accountInfo();

    res.send(info);
  } catch (error) {
    res.status(500).send(`Something wrong: ${error}`);
  }
};
