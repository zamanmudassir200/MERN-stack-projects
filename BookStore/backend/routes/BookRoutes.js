import express from "express";
import { authenticationToken } from "../middlewares/authValidation.js";
import {
  createBook,
  readBooks,
  updateBook,
  deleteBook,
  readBookByID,
} from "../controllers/bookController.js";
const router = express.Router();

// route for saving/creating a book into database
router.post("/", authenticationToken, createBook);
// route for getting all books from database
router.get("/", authenticationToken, readBooks);
// route for get one book from database by id
router.get("/:id", authenticationToken, readBookByID);
// route to update a book
router.patch("/:id", authenticationToken, updateBook);
// route to delete a book from database by id
router.delete("/:id", authenticationToken, deleteBook);

export default router;
