import express from "express";
import { signup, login, getUserById } from "../controllers/authController.js";
import {
  authenticationToken,
  loginValidation,
  signupValidation,
} from "../middlewares/authValidation.js";

const router = express.Router(); // Correct way to create the router

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

router.get("/:id", authenticationToken, getUserById);

export default router; // Use export default instead of module.exports
