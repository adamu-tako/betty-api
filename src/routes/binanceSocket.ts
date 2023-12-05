import { client } from "../binance";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { coinPairs } from "../controllers/binanceControllers";

const httpServer = createServer({ keepAlive: true });

export const serverIO = new Server(httpServer);

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
    const unsubscribe = client.ws.ticker(coinPairs, (ticker) => {
      console.log(ticker);
      socket.send(ticker);
    });

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} unsubscribed from ticker updates`);
      unsubscribe();
    });
  });
});
