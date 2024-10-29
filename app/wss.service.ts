const WebSocketLib = require("ws");
const jwt = require("jsonwebtoken");

const setupWebSocket = (server) => {
  const wss = new WebSocketLib.Server({ server });

  const clients = new Map();

  wss.on("connection", (ws, req) => {
    const token = req.url.split("token=")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      clients.set(decoded.userId, ws);

      ws.on("close", () => {
        clients.delete(decoded.userId);
      });
    } catch (error) {
      ws.terminate();
    }
  });

  return clients;
};

module.exports = setupWebSocket;
