import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
import { MdOutlineAddBox } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://mern-stack-projects-ten.vercel.app/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-5 sm:p-7 ">
      <div className="flex justify-between items-center  my-2 p-2">
        <h1 className="text-xl font-bold">
          Welcome <span className=" text-sky-500"> {loggedInUser}</span>
        </h1>
        <div className="">
          <button
            onClick={() => navigate("/logout")}
            className="bg-sky-600 p-2 rounded-lg font-semibold border-2 "
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-600 hover:bg-sky-900 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          <div className="flex items-center justify-center gap-2">
            <FaListAlt className="text-2xl" />
            <span className="text-xl font-bold py-3">List</span>
          </div>
        </button>
        <button
          className="bg-sky-600 hover:bg-sky-900 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          <div className="flex items-center justify-center gap-2">
            <IoGrid className="text-2xl" />
            <span className="text-xl font-bold py-3">Card</span>
          </div>
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl  font-bold underline text-center py-4">
          Books List
        </h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </main>
  );
};

export default Home;
