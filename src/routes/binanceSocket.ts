import { client } from "../binance";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { coinPairs } from "../controllers/binanceControllers";
import { Ticker } from "binance-api-node";

const httpServer = createServer({ keepAlive: true });

export const serverIO = new Server(httpServer);

async function getTickers() {
  return new Promise((resolve, reject) => {
    const tickers: Ticker[] = [];

    const unsubscribe = client.ws.ticker(coinPairs, (ticker) => {
      console.log(ticker);
      tickers.push(ticker);

      const threshold = 8;
      if (tickers.length >= threshold) {
        unsubscribe();
        resolve(tickers);
      }
    });
  });
}

serverIO.on("connection", (socket: Socket) => {
  console.log(`Client ${socket.id} connected`);
  socket.send("succed=sfully connected to the socket");

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });

  socket.on("ticker", (data: { symbol: string }) => {
    const { symbol } = data;
    console.log(
      `Client ${socket.id} subscribed to ticker updates for symbol: ${symbol}`
    );

    const unsubscribe = client.ws.ticker(symbol, (ticker) => {
      console.log(ticker);
      socket.send(ticker);
    });

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} unsubscribed from ticker updates`);
      unsubscribe();
    });
  });

  socket.on("topCoinTickers", () => {
    const interval = setInterval(async () => {
      try {
        const tickers = await getTickers();
        socket.emit(JSON.stringify(tickers));
      } catch (error) {
        console.error("Error fetching tickers:", error);
      }
    }, 10000);

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} unsubscribed from ticker updates`);
      clearInterval(interval);
    });
  });
});
