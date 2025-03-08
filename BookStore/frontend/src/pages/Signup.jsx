import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

import { IoEye, IoEyeOff } from "react-icons/io5";

import url from "../url";
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
        credentials: "include", // Include cookies in the request
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess("Signup successful! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details =
          error?.details?.[0]?.message || error?.message || "Signup failed.";
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-3">
      <h1 className="text-center text-3xl font-bold p-4">Sign up</h1>
      <form
        onSubmit={handleSignup}
        className="max-w-[700px] border-2 mx-auto p-5 rounded-lg border-sky-700"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-lg mb-2">
            Name
          </label>
          <input
            className="outline-none p-3 mb-4 rounded-md text-black font-semibold text-lg"
            type="text"
            name="name"
            placeholder="Enter your name..."
            onChange={handleChange}
            value={signupInfo.name}
          />
          <label htmlFor="email" className="font-bold text-lg mb-2">
            Email
          </label>
          <input
            className="outline-none p-3 mb-4 rounded-md text-black font-semibold text-lg"
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            value={signupInfo.email}
          />

          <label htmlFor="password" className="font-bold text-lg mb-2">
            Password
          </label>
          <div className="w-full relative">
            <input
              className="outline-none  p-3 mb-4  w-full rounded-md text-black font-semibold text-lg"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              onChange={handleChange}
              value={signupInfo.password}
            />
            <button
              className="absolute right-2 top-1 text-black text-2xl  p-2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </button>
          </div>
          <button className="bg-sky-600 p-3 my-4 hover:bg-sky-400 transition-all rounded-md font-semibold text-lg">
            Sign up
          </button>
          <span className="text-center text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:text-blue-200 transition-all text-blue-400 font-bold underline"
            >
              Login
            </Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
