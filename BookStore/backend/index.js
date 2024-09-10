import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();

// CORS Middleware
app.use(
  cors({
    origin: "https://mern-stack-projects-q2j2.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Preflight handling
// app.options("*", cors());

// Middleware for parsing request body
app.use(express.json());

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

export default app;
