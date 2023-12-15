const express = require("express");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { log } = require("console");
const _ = require("lodash"); 

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 5000;

function notifyClients(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      console.log("Notified all clients about the update is done", data);
    }
  });
}

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let autoLogoutTimeout;
const jsonFile = require("./public/sessions.json");

//Login user  session

app.post("/api/session", (req, res) => {
  let id = req.body.id;
  console.log("login id recieved", id);

  if (id) {
    let user = jsonFile.find((u) => u.id === id);
    if (user) {
      // reset auto logout timeout
      clearTimeout(autoLogoutTimeout);
      autoLogoutTimeout = setTimeout(() => {
        logoutUser(id);
      }, 2 * 60 * 60 * 1000); // 2 hours

      // send success response
      res.json({
        success: true,
        message: "User logged in successfully.",
        data: user,
      });
    } else {
      // send error response
      res.json({ success: false, message: "Invalid ID.", data: null });
    }
  } else {
    // send error response
    res.json({ success: false, message: "ID is required.", data: null });
  }
});

//login Admin


app.post("/api/admin", (req, res) => {
  const { username, password } = req.body;
  console.log("login id recieved", username, password);
  // Load admin data from admin.json file
  const adminData = require("./public/admin.json");
  console.log("adminData", adminData);

  // Find the admin with the matching username
  const admin = adminData.users.find((user) => user.username === username);
  console.log("admin pass", admin.password);

  if (admin) {
    // Compare the hashed password with the password passed from the screen
    bcrypt.compare(password, admin.password, (err, result) => {
      if (err) {
        // Handle error
        res.json({ success: false, message: "Error comparing passwords.", data: null });
      } else if (result) {
        // Passwords match, authentication successful
        res.json({ success: true, message: "Authentication successful.", data: admin });
      } else {
        // Passwords do not match
        res.json({ success: false, message: "Invalid password.", data: null });
      }
    });
  } else {
    // Admin not found
    res.json({ success: false, message: "Admin not found.", data: null });
  }
});

//Logout
app.get("/logout", (req, res) => {
  let id = req.query.id;

  if (id) {
    let user = jsonFile.find((u) => u.id === id);
    if (user) {
      // clear auto logout timeout
      clearTimeout(autoLogoutTimeout);

      // send success response
      res.json({
        success: true,
        message: "User logged out successfully.",
        data: user,
      });
    } else {
      // send error response
      res.json({ success: false, message: "Invalid ID.", data: null });
    }
  } else {
    // send error response
    res.json({ success: false, message: "ID is required.", data: null });
  }
});

function logoutUser(id) {
  let user = jsonFile.find((u) => u.id === id);
  if (user) {
    // remove login status from user
    delete user.loginStatus;

    // send success response
    res.json({
      success: true,
      message: "User logged out successfully.",
      data: user,
    });
  }
}

// Endpoint to serve the JSON question data
app.get("/api/question/", (req, res) => {
  const data = require("./public/question.json");
  res.json(data);
});

app.get("/api/question/:id", (req, res) => {
  try {
    log("Received GET request for item with ID:", req.params.id);
    const itemId = req.params.id;
    // const data = require("./public/question.json");
    const filePath = "./public/question.json";
    const fileContent = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileContent);
    //  res.json(existingData);
    log("Data:", existingData);

    // Find the item with the specified ID
    const item = existingData.find((d) => d.id === itemId);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Send the item as JSON response
    console.log("Item:", JSON.stringify(item));
    res.json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/sessions/:id", (req, res) => {
  try {
    log("Received GET request for item with ID:", req.params.id);
    const itemId = req.params.id;
    const data = require("./public/sessions.json");
    log("Data:", data);

    // Find the item with the specified ID
    const item = data.find((d) => d.id === itemId);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Send the item as JSON response
    console.log("Item:", JSON.stringify(item));
    res.json(JSON.stringify(item));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/sessions/", (req, res) => {
  console.log("requesting sessions");
  // const data = require("./public/sessions.json");
  const filePath = "./public/sessions.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  existingData = JSON.parse(fileContent);
  res.json(existingData);
});

// New endpoint to handle POST requests  for questions
app.post("/api/question/", (req, res) => {
  const newData = req.body;
  console.log("Received POST request with data:", newData);

  const filePath = "./public/question.json";

  // Read existing data from the file
  let existingData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading existing data:", error);
  }

  // Append new data to the existing data
  const updatedData = [...existingData, newData];
  console.log("Updated data:", updatedData);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

  // Notify connected clients about the update
  notifyClients(newData);

  // Send a response back to the client
  res.json({ message: "Data received successfully!" });
});

// New endpoint to handle POST requests  for sessions creation
app.post("/api/sessions/", (req, res) => {
  const newData = req.body;
  console.log("Received POST request with data:", newData);

  const filePath = "./public/sessions.json";

  // Read existing data from the file
  let existingData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading existing data:", error);
  }

  // Append new data to the existing data
  const updatedData = [...existingData, newData];

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  console.log("Updated data:", updatedData);
  notifyClients(newData);
  console.log("updatedData: " + updatedData);
  console.log("updated server data");
  // Send a response back to the client
  res.json({ message: "Data received successfully!" });
});

app.put("/api/sessions/", (req, res) => {
  const newData = req.body;
  console.log("Received PUT request with data:", newData);

  const filePath = "./public/sessions.json";

  // Read existing data from the file
  let existingData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading existing data:", error);
  }

  // Append new data to the existing data
  const updatedData = existingData.map((item) => {
    if (item.id === newData.id) {
      return { ...item, ...newData };
    } else {
      return item;
    }
  });
  console.log("Updated data:", updatedData);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

  // Notify connected clients about the update
  notifyClients(newData);

  // Send a response back to the client
  try {
    res.json({ message: "Data received successfully!" });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/question/:id", (req, res) => {
  const itemId = req.params.id;
  console.log(
    "Received PUT request to update question for item with ID:",
    itemId
  );
  const updatedAnswers = req.body;

  // Read the JSON file asynchronously
  const filePath = "./public/question.json";
  fs.readFile(filePath, "utf8", (err, fileContent) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const existingData = JSON.parse(fileContent);
    const itemToUpdate = existingData.find((item) => item.id === itemId);

    if (itemToUpdate) {
      // Update the answers
      itemToUpdate.questions.forEach((question) => {
        console.log("Question:", question);
        console.log("number:", question.number);

        const updatedAnswer = updatedAnswers.localAnswersArray.find(
          (updatedAns) => updatedAns.number === question.number
        );
        console.log("Updated answer-2:", updatedAnswer);

        if (updatedAnswer) {
          // Update the answer properties (deep copy)
          console.log("UPDATING IN-PROCESS");
          _.merge(question.answers, updatedAnswer.answers);
        }
      });

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }

        res.json({ success: true, message: "Answers updated successfully" });
      });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });
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

  //Handle WebSocket closure
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
