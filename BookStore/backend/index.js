import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://mern-stack-projects-ve4b.vercel.app",
      "http://localhost:5173",
    ], // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

// Preflight handling
app.options("*", cors());

// Middleware for parsing request body
app.use(express.json());
app.use(bodyParser.json()); // Ensure this is used before routes

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// Routes
app.use("/books", BookRoutes);
app.use("/auth", AuthRoutes);

export default app;
