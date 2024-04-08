import Image from "next/image";
import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  isFavorite?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  imageUrl,
  isFavorite = false,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={`${title} book cover`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-bold">{author}</h3>
        <p className="text-gray-600">{title}</p>
        <div className="flex justify-between items-center mt-2">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Leer
          </button>
          <button
            className={`${
              isFavorite ? "text-red-500" : "text-gray-400"
            } hover:text-red-600`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
