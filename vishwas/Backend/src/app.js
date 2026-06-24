const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ FRONTEND URLS (IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://vishwas-project-final.vercel.app",
  "https://vishwas-six.vercel.app"
];

// ✅ CORS CONFIG (PRODUCTION SAFE)
app.use(cors({
  origin: function (origin, callback) {
    // allow mobile apps / postman / server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ preflight requests fix
app.options("*", cors());

// Routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;