import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  const RefreshHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setIsAuthenticated(true);
        if (
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/signup"
        ) {
          navigate("/home");
        }
      }
    }, [location, navigate, setIsAuthenticated]);
  };
  RefreshHandler();
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/showBook/:id" element={<ShowBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </div>
  );
};

export default App;
