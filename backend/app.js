import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authRoute.js"
import empRouter from "./routes/empRoute.js"
import connectDB from "./config/db.js"
import { rateLimiter } from "./middleware/rateLimiter.js"
import { routeAnalytics } from "./middleware/analytics.js"
// import { logAnalytics } from "./utils/logger.js"
// setInterval(logAnalytics, 60 * 1000); // Logs every minute
import { subscribeToChannel, logMessages } from "./utils/subscriber.js"
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

subscribeToChannel();
logMessages();

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routeAnalytics);
app.use(rateLimiter(100, 60));

const redisClient = createClient();
await redisClient.connect();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 },
  })
);

app.use("/api/v1/emp", authRouter); 
app.use("/api/v1/emp", empRouter);

export default app