import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    coverPage: {
      type: String,
      default:
        "https://webneel.com/sites/default/files/images/download/thumb/old-book-with-blank-cover%201_0.jpg",
    },
    isbn: {
      // International Standard Book Number
      type: String,
      unique: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timeStamps: true,
  }
);

export const bookModel = mongoose.model("book", bookSchema);
