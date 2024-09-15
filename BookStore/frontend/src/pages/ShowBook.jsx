import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useParams } from "react-router-dom";
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://backend-three-sandy.vercel.app/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-2xl">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-400 ">Id: </span>
            <span>"{book._id}"</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-400 ">Title: </span>
            <span>"{book.title}"</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-400 ">Author: </span>
            <span>"{book.author}"</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-400 ">Publish Year: </span>
            <span>"{book.publishYear}"</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-400 ">Created At: </span>
            <span>"{new Date(book.createdAt).toString()}"</span>
          </div>{" "}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-400 ">Updated At: </span>
            <span>"{new Date(book.updatedAt).toString()}"</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
