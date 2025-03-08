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
import url from "../url.js";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndUser = async () => {
      try {
        setLoading(true);

        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login"); // Redirect to login if no token
          return;
        }

        // Decode the JWT to get user information (like _id or email)
        const decodedToken = jwtDecode(token);

        const userId = decodedToken._id; // Assuming '_id' is present in the token payload

        // Fetch the full user details from the server using the user's _id or email
        const userResponse = await fetch(`${url}/auth/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
          credentials: "include", // This ensures cookies are sent with the request
        });

        if (!userResponse.ok) {
          throw new Error(
            `Error fetching user details: ${userResponse.statusText}`
          );
        }

        const userData = await userResponse.json();
        const { user } = userData;
        // Now set the full user info in state or use it as needed
        setLoggedInUser(user.name); // You can also store the full userData
        setImg(user.profilePic);
        // Fetch books data (existing logic)
        const bookResponse = await fetch(`${url}/books`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
          credentials: "include", // This ensures cookies are sent with the request
        });

        if (!bookResponse.ok) {
          throw new Error(`Error fetching books: ${bookResponse.statusText}`);
        }

        const bookData = await bookResponse.json();
        setBooks(bookData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err.message);
        setLoading(false);
      }
    };

    fetchBooksAndUser(); // Call the async function inside useEffect
  }, []);

  return (
    <main className="p-5 sm:p-7">
      <div className="flex justify-between items-center my-2 p-2">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center object-cover">
            <img className="w-14 h-14 rounded-[50%]" src={img} alt="" />
          </div>
          <h1 className="text-xl font-bold">
            Welcome{" "}
            <span className="text-sky-500">{loggedInUser.toUpperCase()} !</span>
          </h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/logout")}
            className="bg-sky-600 p-2 rounded-lg font-semibold border-2"
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
        <h1 className="text-3xl font-bold underline text-center py-4">
          Books List
        </h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : books && books.length > 0 ? (
        showType === "table" ? (
          <BookTable books={books} />
        ) : (
          <BookCard books={books} />
        )
      ) : (
        <h1 className="text-center">
          {" "}
          <span className="text-red-500 inline-block">
            {" "}
            No books created yet.
          </span>
          <br />
          To create books, please go to the ➕ icon
        </h1>
      )}
    </main>
  );
};

export default Home;
