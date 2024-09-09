import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiInfoCircle, BiShow } from "react-icons/bi";
import BookModal from "./BookModal.jsx";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
      key={book._id}
    >
      <h2 className="absolute top-1 right-1 px-4 py-1 bg-red-300 rounded-lg">
        {book.publishYear}
      </h2>
      <h4 className="mt-7 text-gray-500 ">{book._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <span>
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
        </span>
        <h2 className="my-1"> {book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <span>
          <BiUserCircle className="text-red-300 text-2xl" />
        </span>
        <h2 className="my-1"> {book.author}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4 ">
        <BiShow
          className="text-2xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/showBook/${book._id}`}>
          <BiInfoCircle className="text-2xl text-green-400 hover:text-black" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <FaEdit className="text-2xl text-yellow-400 hover:text-black" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl  text-red-400 hover:text-black" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
