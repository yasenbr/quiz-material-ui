const express = require("express");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 5000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// Endpoint to serve the JSON data
app.get("/api/data", (req, res) => {
  const data = require("./public/question.json");
  res.json(data);
});

// New endpoint to handle POST requests
app.post("/api/data", (req, res) => {
  const newData = req.body;
  console.log("Received POST request with data:", newData);

  const filePath = "./public/question.json";
  const existingData = require(filePath);
  const updatedData = { ...existingData, ...newData };

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

  // Notify connected clients about the update
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedData));
    }
  });

  // Send a response back to the client
  res.json({ message: "Data received successfully!" });
});

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send initial data to the newly connected client
  const initialData = require("./public/question.json");
  ws.send(JSON.stringify(initialData));

  // Handle WebSocket messages from clients (if needed)
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle WebSocket closure
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
