import React from "react";
import { useNavigate } from "react-router";
import { handleSuccess } from "../utils";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };
  return (
    <div className="px-3 min-h-screen mx-auto w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold ">Logout</h1>
      <div className="border-2 rounded-md mx-auto mt-6 p-3 text-center max-w-[600px] ">
        <h1> Are you sure? You want to logout?</h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-white text-black p-2  mx-2 rounded-lg my-3"
        >
          No
        </button>
        <button
          onClick={() => handleLogout()}
          className="bg-sky-700 text-white p-2  mx-2 rounded-lg my-3"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Logout;
