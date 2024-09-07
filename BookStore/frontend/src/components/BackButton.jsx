import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
const BackButton = () => {
  return (
    <div className="flex">
      <Link className="bg-white text-black w-fit px-4 py-1 rounded-lg" to="/">
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
