import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {router} from "./routes/empRoute.js"
import connectDB from "./config/db.js"

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/emp", router);

export default app