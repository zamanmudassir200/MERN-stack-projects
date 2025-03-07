import Joi from "joi";
import jwt from "jsonwebtoken";

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

export const authenticationToken = (req, res, next) => {
  // Get the token from cookies
  const { token } = req.cookies;
  console.log("Token", token);

  // If token doesn't exist, send an error response
  if (!token) {
    return res.status(403).json({ message: "Token not found. Access denied." });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded data (you'll have access to the data you signed in the token, such as email and _id)

    // Optionally, store the decoded user data in the request object for use in later routes
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, send an error response
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
