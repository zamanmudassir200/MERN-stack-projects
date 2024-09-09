import React from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiInfoCircle } from "react-icons/bi";
// import { BsUserCircle } from "react-icons/bs";

import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => {
        return (
          <div
            className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
            key={item._id}
          >
            <h2 className="absolute top-1 right-1 px-4 py-1 bg-red-300 rounded-lg">
              {item.publishYear}
            </h2>
            <h4 className="mt-7 text-gray-500 ">{item._id}</h4>
            <div className="flex justify-start items-center gap-x-2">
              <span>
                <PiBookOpenTextLight className="text-red-300 text-2xl" />
              </span>
              <h2 className="my-1"> {item.title}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
              <span>
                <BiUserCircle className="text-red-300 text-2xl" />
              </span>
              <h2 className="my-1"> {item.author}</h2>
            </div>
            <div className="flex justify-start items-center gap-10 mt-4 p-4 ">
              <Link to={`/books/showBook/${item._id}`}>
                <BiInfoCircle className="text-2xl text-green-800 hover:text-black" />
              </Link>
              <Link to={`/books/edit/${item._id}`}>
                <FaEdit className="text-2xl text-yellow-400 hover:text-black" />
              </Link>
              <Link to={`/books/delete/${item._id}`}>
                <MdOutlineDelete className="text-2xl  text-red-500 hover:text-black" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookCard;
