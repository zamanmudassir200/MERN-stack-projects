import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: `User already exist, you can login`, success: false });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const createdUser = await userModel.create({
          name,
          email,
          password: hash,
        });

        res
          .status(201)
          .json({ message: "User registered successfully", success: true });
      });
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errMsg = "Auth failed, Email or Password is incorrect";
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    // Compare passwords
    const isPassEqual = await bcrypt.compare(password, user.password); // Use await
    if (!isPassEqual) {
      return res.status(403).json({ message: errMsg, success: false });
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, profilePic: user.profilePic },
      process.env.JWT_SECRET,

      { expiresIn: "24h" }
    );

    // Set cookie with proper options
    res.cookie("token", jwtToken, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: false, // Use HTTPS in production
      sameSite: "lax", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
    });

    // Send response
    res.status(200).json({
      message: "Login Success",
      name: user.name,
      email,
      jwtToken,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await userModel.findOne({ _id });
    if (!user) {
      res.status(403).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User found", user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
