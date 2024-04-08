'use client';

import React from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-8">
      <button
        className={`mx-1 px-3 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-300 text-gray-800"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        disabled={currentPage === 1}
        onClick={onPageChange}
      >
        {"<<"}
      </button>
      <button
        className={`mx-1 px-3 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-300 text-gray-800"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        disabled={currentPage === 1}
        onClick={onPageChange}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-2 rounded ${
            currentPage === page
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={onPageChange}
        >
          {page}
        </button>
      ))}
      <button
        className={`mx-1 px-3 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-800"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        disabled={currentPage === totalPages}
        onClick={onPageChange}
      >
        {">"}
      </button>
      <button
        className={`mx-1 px-3 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-800"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        disabled={currentPage === totalPages}
        onClick={onPageChange}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Paginator;
