// server.js
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 5000; // You can choose any available port

app.use(express.static("public")); // Serve files from the 'public' folder
app.use(cors()); // Enable CORS for all requests
// Define an API endpoint to serve the JSON data
app.get("/api/data", (req, res) => {
  const data = require("./public/question.json");
  res.json(data);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
