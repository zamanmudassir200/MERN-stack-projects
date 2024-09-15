import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { name, email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const response = await fetch(
        "https://mern-stack-projects-ten.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container mx-auto h-screen p-10">
      <h1 className="text-center text-3xl font-bold p-4">Login</h1>
      <form
        onSubmit={handleLogin}
        method="post"
        action=""
        className="max-w-[700px] border-2 mx-auto p-5 rounded-lg border-sky-700"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-lg mb-2">
            Email
          </label>
          <input
            className="outline-none p-3 mb-4 rounded-md text-black font-semibold text-lg"
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email..."
            onChange={handleChange}
            value={loginInfo.email}
          />
          <label htmlFor="name" className="font-bold text-lg mb-2">
            Password
          </label>
          <input
            className="outline-none p-3 mb-4 rounded-md text-black font-semibold text-lg"
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your password..."
            onChange={handleChange}
            value={loginInfo.password}
          />
          <button className="bg-sky-600 p-3 my-4 hover:bg-sky-400 transition-all rounded-md font-semibold text-lg">
            Login
          </button>
          <span className="text-center text-lg">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:text-blue-200 transition-all text-blue-400 font-bold underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
