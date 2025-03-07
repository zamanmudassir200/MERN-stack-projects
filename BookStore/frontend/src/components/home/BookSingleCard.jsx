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
      className="border-2 border-gray-500 rounded-lg  m-4 relative hover:shadow-xl"
      key={book._id}
    >
      <div className="">
        <img src={book.coverPage} alt="" />
      </div>
      <div className="p-3">
        <div className="flex item-end justify-end mt-2">
          <h2 className="px-4 py-1 bg-gray-600 rounded-lg">
            Publish Year: {book.publishYear}
          </h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <span>
            <PiBookOpenTextLight className="text-red-200 text-2xl" />
          </span>
          <h2 className="my-1">
            <b>Title:</b> {book.title}
          </h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <span>
            <BiUserCircle className="text-red-300 text-2xl" />
          </span>
          <h2 className="my-1">
            <b>Author:</b> {book.author}
          </h2>
        </div>
        <div className="flex justify-between items-center gap-x-2 mt-4 p-4 ">
          <BiShow
            className="text-2xl text-blue-800 hover:text-gray-300 cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/showBook/${book._id}`}>
            <BiInfoCircle className="text-2xl text-green-400hover:text-gray-300" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <FaEdit className="text-2xl text-yellow-400 hover:text-gray-300" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl  text-red-400 hover:text-gray-300" />
          </Link>
        </div>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
