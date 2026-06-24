const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// FRONTEND URLS
const allowedOrigins = [
  "http://localhost:5173",
  "https://vishwas-project-final.vercel.app",
  "https://vishwas-six.vercel.app",
  "https://vishwas-project-final-git-main-vishaws.vercel.app" // ← add this
];

// CORS — must be FIRST
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options("/*", cors(corsOptions)); // ← use "/*" not "*"// ← let cors() handle preflight, not your manual handler

app.use(express.json());
app.use(cookieParser());

// ROUTES
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;