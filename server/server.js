import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
import getRoute from "./routes/route.js";
import { mongoose } from "mongoose";

//connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

//routes
app.use("/api", getRoute);

//server listens
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is listening to port ${process.env.PORT}`);
});
