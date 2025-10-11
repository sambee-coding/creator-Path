const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Example login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Replace this with your real login logic
  if (email === "test@example.com" && password === "1234") {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Example signup route
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Replace this with your real signup logic
  return res.json({ success: true, message: "Signup successful" });
});

// Export the app wrapped in serverless
module.exports = app;
module.exports.handler = serverless(app);
