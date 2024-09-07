import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
const App = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/showBook/:id" element={<ShowBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </div>
  );
};

export default App;
