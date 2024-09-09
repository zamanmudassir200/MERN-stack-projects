import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full minh-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="mt-7 text-gray-500 ">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <span>
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
          </span>
          <h2 className="my-1 text-black"> {book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <span>
            <BiUserCircle className="text-red-300 text-2xl" />
          </span>
          <h2 className="my-1 text-black"> {book.author}</h2>
        </div>
        <div className="">
          <h1 className="text-black">Description:</h1>
          <p className="text-black text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            harum in id atque explicabo numquam. Cupiditate, aut quod
            consectetur recusandae cum quam reiciendis doloremque provident
            doloribus a! Neque fugit unde dolorum est! Reiciendis id voluptas
            inventore dignissimos. Maiores, quibusdam sequi fugiat laborum id
            dolorem asperiores atque assumenda dolorum debitis eum voluptate
            numquam, cumque facere odio nihil quae. Odio, et. Recusandae
            eligendi porro libero mollitia sequi animi possimus repudiandae
            asperiores debitis dolore, necessitatibus placeat aliquid iusto enim
            voluptas laborum? Laboriosam doloribus ullam voluptatem facilis et
            esse deserunt, beatae necessitatibus aspernatur voluptas enim,
            consectetur sint quidem doloremque suscipit quia cum quibusdam quae.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
