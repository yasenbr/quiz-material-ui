// server.js
const express = require("express");
const app = express();
const port = 5000; // You can choose any available port

app.use(express.static("public")); // Serve files from the 'public' folder

// Define an API endpoint to serve the JSON data
app.get("/api/data", (req, res) => {
  const data = require("./public/question.json");
  res.json(data);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
