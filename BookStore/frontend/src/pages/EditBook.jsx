import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  const handleEditBook = () => {
    const newBook = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .patch(`http://localhost:3000/books/${id}`, newBook)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-2xl my-3">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px]  p-5 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-300" htmlFor="">
            Title
          </label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className=" p-3 mt-1 font-semibold outline-pink-500 rounded-lg text-black w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-300" htmlFor="">
            Author
          </label>
          <input
            type="text"
            value={author}
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            className=" p-3 mt-1 font-semibold outline-pink-500 rounded-lg text-black w-full"
          />
        </div>{" "}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-300" htmlFor="">
            Publish Year
          </label>
          <input
            type="text"
            value={publishYear}
            placeholder="Publish Year"
            onChange={(e) => setPublishYear(e.target.value)}
            className=" p-3 mt-1 font-semibold outline-pink-500 rounded-lg text-black w-full"
          />
        </div>
        <button
          className="p-3 bg-sky-300 my-2 text-black font-bold rounded-lg w-full"
          onClick={handleEditBook}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
