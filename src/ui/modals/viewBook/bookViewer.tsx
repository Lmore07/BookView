import React, { useEffect, useState } from "react";
import PageContent from "./pageView";
import { PageI } from "@/libs/interfaces/books.interface";

interface BookViewerProps {
  content: PageI[];
  bookId: number;
  lastPage: number;
}

const BookViewer: React.FC<BookViewerProps> = ({
  content,
  bookId,
  lastPage,
}) => {
  const [currentPage, setCurrentPage] = useState(lastPage);

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      console.log("Pagina atras");
    }
  };

  const updateLastPage = async () => {
    const response = await fetch("../api/books/views", {
      method: "PUT",
      body: JSON.stringify({ idBook: bookId, lastPage: currentPage }),
    });
    const data = await response.json();
  };

  const handleNextPage = () => {
    if (currentPage < content.length - 1) {
      setCurrentPage(currentPage + 1);
      console.log("Pagina siguiente");
    }
  };

  useEffect(() => {
    console.log("Actualizando lastPage: ", currentPage);
    updateLastPage();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute top-0 left-0 mt-4 ml-4 z-40">
          <button
            className="bg-gray-300 p-2 rounded-full focus:outline-none"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4 z-40">
          <button
            className="bg-gray-300 p-2 rounded-full focus:outline-none"
            onClick={handleNextPage}
            disabled={currentPage === content.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="mx-auto max-w-xl shadow-lg rounded-lg overflow-hidden">
          <PageContent page={content[currentPage]} />
        </div>
      </div>
    </div>
  );
};

export default BookViewer;
