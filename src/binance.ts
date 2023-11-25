import Binance from "binance-api-node";
import dontenv from "dotenv";
dontenv.config();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;

// Authenticated client, can make signed calls
export const client = Binance({
  apiKey: apiKey,
  apiSecret: apiSecret,
  getTime: () => Date.now(),
});
