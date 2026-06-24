const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser());

// ================= FRONTEND ORIGINS =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://vishwas-project-final.vercel.app",
  "https://vishwas-six.vercel.app"
];

// ================= CORS CONFIG =================
const corsOptions = {
  origin: function (origin, callback) {
    // Allow Postman / server-to-server
    if (!origin) return callback(null, true);

    // Allow known origins + all Vercel preview domains
    const allowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app");

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ================= APPLY CORS =================
app.use(cors(corsOptions));

// ✅ FIX PRE-FLIGHT REQUESTS (IMPORTANT)
app.options("/*", cors(corsOptions));

// ================= ROUTES =================
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// ================= EXPORT =================
module.exports = app;