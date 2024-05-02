import React, { useState, useRef, useEffect } from "react";
import PageContent from "./pageView";
import { CoverI } from "@/libs/interfaces/books.interface";

interface FlipBookProps {
  pages: {
    numberPage: number;
    template: string;
    content: string;
    image: string | null;
    audio: string | null;
    video: string | null;
  }[];
  coverInfo: CoverI;
  startPage?: number;
}

const FlipBook: React.FC<FlipBookProps> = ({
  pages,
  startPage = 0,
  coverInfo,
}) => {
  const [currentPage, setCurrentPage] = useState(startPage);
  const [viewCover, setViewCover] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("");
  const [formatDate, setFormatDate] = useState("");
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const date = new Date(coverInfo.publicationDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setFormatDate(`${day}-${month}-${year}`);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
    } else {
      setFlipDirection("prev");
      setIsFlipping(true);
      setViewCover(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setFlipDirection("next");
      setIsFlipping(true);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isFlipping) {
      const offsetX = e.nativeEvent.offsetX;
      const bookWidth = bookRef.current?.offsetWidth ?? 0;

      if (offsetX < bookWidth / 3 && currentPage > 0) {
        setFlipDirection("prev");
        setIsFlipping(true);
      } else if (
        offsetX > (bookWidth * 2) / 3 &&
        currentPage < pages.length - 1
      ) {
        setFlipDirection("next");
        setIsFlipping(true);
      }
    }
  };

  useEffect(() => {
    if (isFlipping) {
      const bookElement = bookRef.current;
      if (bookElement) {
        bookElement.classList.add("flipping");
        if (flipDirection === "prev") {
          bookElement.classList.add("flip-prev");
        } else {
          bookElement.classList.add("flip-next");
        }

        const resetFlip = () => {
          bookElement.classList.remove("flipping");
          bookElement.classList.remove("flip-prev");
          bookElement.classList.remove("flip-next");
          setIsFlipping(false);
          if (flipDirection === "prev") {
            if (!viewCover) {
              setCurrentPage(currentPage - 1);
            }
          } else {
            if (viewCover) {
              setViewCover(false);
              setCurrentPage(0);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }
        };

        const flipTimer = setTimeout(resetFlip, 600);

        return () => clearTimeout(flipTimer);
      }
    }
  }, [isFlipping, flipDirection, currentPage, pages.length]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className="flip-book"
        ref={bookRef}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="mr-5 my-2 z-30">
          <button
            className="bg-gray-300 p-2 rounded-full focus:outline-none"
            onClick={handlePrevPage}
            disabled={currentPage == 0 && viewCover}
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
        <div className="pages">
          {viewCover && coverInfo && (
            <div>
              <div className="page front cover flex items-center justify-center rounded-lg">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-poppins font-bold pb-5">
                    {coverInfo.bookName}
                  </h1>
                  <p className="text-lg font-poppins font-light pb-5">Autor: {coverInfo.author}</p>
                  <img
                    className="w-[250px] rounded-md"
                    src={coverInfo.coverPhoto}
                    alt="Portada del libro"
                  />
                  <p className="text-lg font-poppins font-light pt-5">
                    Publicado: {formatDate}
                  </p>
                </div>
              </div>
              <div className="page back">
                <PageContent page={pages[0]} />
              </div>
            </div>
          )}
          {!viewCover && (
            <div>
              <div className={`page front no-cover`}>
                <PageContent page={pages[currentPage]} />
              </div>
              <div className="page back">
                {flipDirection === "next" && currentPage < pages.length - 1 && (
                  <PageContent page={pages[currentPage + 1]} />
                )}
                {flipDirection === "prev" && currentPage > 0 && (
                  <PageContent page={pages[currentPage - 1]} />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="ml-5 my-2 z-40">
          <button
            className="bg-gray-300 p-2 rounded-full focus:outline-none"
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
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
      </div>
    </div>
  );
};

export default FlipBook;
