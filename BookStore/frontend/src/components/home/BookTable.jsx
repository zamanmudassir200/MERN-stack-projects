import React from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
const BookTable = ({ books }) => {
  return (
    <table className="w-full border-spacing-2 overflow-x-scroll">
      <thead>
        <tr>
          <th className="border border-slate-400 rounded-md">No</th>
          <th className="border border-slate-400 rounded-md">Title</th>
          <th className="border border-slate-400 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-400 rounded-md max-md:hidden">
            PublishYear
          </th>
          <th className="border border-slate-400 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          return (
            <tr key={book._id} className="h-10 hover:bg-gray-700  ">
              <td className="border p-1 border-slate-500  text-center ">
                {index + 1}
              </td>
              <td className="border border-slate-500  text-center ">
                {book.title}
              </td>
              <td className="border border-slate-500  text-center max-md:hidden ">
                {book.author}
              </td>
              <td className="border border-slate-500 text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="border border-slate-500  text-center ">
                <div className="flex gap-4 items-center justify-center">
                  <Link to={`/books/showBook/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-500 cursor-pointer" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <FaEdit className="text-2xl text-yellow-400 cursor-pointer" />
                  </Link>{" "}
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 cursor-pointer" />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookTable;
