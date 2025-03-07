import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    ],
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&s",
    },
  },
  {
    timeStamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
