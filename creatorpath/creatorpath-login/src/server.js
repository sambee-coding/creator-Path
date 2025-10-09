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
app.use(cors({
  
 origin: "http://127.0.0.1:5501",  // or ["http://127.0.0.1:5501", "http://localhost:3000"] if multiple
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
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
