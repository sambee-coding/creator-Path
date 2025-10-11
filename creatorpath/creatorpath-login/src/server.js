require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const joi= require("joi");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.static("frontend"));

app.use(helmet());
const allowedOrigins = [
  "http://127.0.0.1:5501", // local dev
  "http://localhost:3000",  // local dev (React/Vite)
  "https://creatorpath-login-xxxx.vercel.app" // production
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.send("CreatorPath server is alive 🐝");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
  console.log("up and running");
});