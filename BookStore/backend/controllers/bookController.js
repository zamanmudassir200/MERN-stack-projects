import { userModel } from "../models/user.js";
import { bookModel } from "../models/BookModel.js";

export const createBook = async (req, res) => {
  const { title, author, publishYear, isbn } = req.body;

  // Extract the user ID from req.user (decoded token)
  const { _id } = req.user;

  try {
    // Check if the required fields are provided
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user in the database by their ID
    const user = await userModel.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new book document with user reference
    const newBook = {
      title,
      author,
      publishYear,
      isbn,
    };

    const book = await bookModel.create(newBook);

    // Push the newly created book into the user's books array
    user.books.push(book._id); // Use the book's ObjectId
    book.user.push(_id);

    // Save the updated user document with the new book
    await user.save();
    await book.save();

    // Respond with the newly created book
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const readBooks = async (req, res) => {
  try {
    const { _id } = req.user; // Get the logged-in user's ID
    const user = await userModel.findOne({ _id }).populate("books"); // Populate the 'books' array

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      count: user.books.length,
      data: user.books,
    });
  } catch (error) {
    console.log("hello", error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { title, author, publishYear, isbn, coverPage } = req.body;
  try {
    if (!title || !author || !publishYear || !isbn || coverPage) {
      return res.status(400).send("All fields are required");
    }
    const { id } = req.params;
    const result = await bookModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const readBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
