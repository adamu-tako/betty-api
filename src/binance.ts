import Binance from "binance-api-node";

const apiKey =
  "q0cu9VvvwTAlejtrS6VdD3JuHzNzkG23MtmvK9b20xsRiKozEy1zPRXmEspldAmd";
const apiSecret =
  "Xmqh33oFw8n7vo1UCkM6OxQyLvavCX56wmZWcfsgt5Sv5DdUoDzhRMHHclNnFZuQ";

// Authenticated client, can make signed calls
export const client = Binance({
  apiKey: apiKey,
  apiSecret: apiSecret,
  getTime: () => Date.now(),
});
