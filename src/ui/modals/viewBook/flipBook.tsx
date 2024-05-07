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
  isViewed?: boolean;
}

const FlipBook: React.FC<FlipBookProps> = ({
  pages,
  startPage = 0,
  coverInfo,
  isViewed = false,
}) => {
  const [currentPage, setCurrentPage] = useState(startPage);
  const [currentBook, setCurrentBook] = useState(coverInfo);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("");
  const bookRef = useRef<HTMLDivElement>(null);

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
    } else {
      setFlipDirection("prev");
      setIsFlipping(true);
    }
  };

  const initView = async () => {
    if (!isViewed) {
      await fetch("../api/books/views?firstOpen=true", {
        method: "PUT",
        body: JSON.stringify({
          idBook: coverInfo.idBook,
          lastPage: currentPage,
        }),
      });
    }
  };

  useEffect(() => {
    console.log("Book", coverInfo);
    initView();
  }, []);

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

  const updateLastPage = async () => {
    if (!isViewed) {
      await fetch("../api/books/views?firstOpen=false", {
        method: "PUT",
        body: JSON.stringify({
          idBook: coverInfo.idBook,
          lastPage: currentPage,
        }),
      });
    }
  };

  useEffect(() => {
    updateLastPage();
  }, [currentPage]);

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
            setCurrentPage(currentPage - 1);
          } else {
            setCurrentPage(currentPage + 1);
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
            disabled={currentPage == 0}
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
          <div className={`page front no-cover`}>
            {currentPage == 0 ? (
              <PageContent page={pages[currentPage]} coverInfo={currentBook} />
            ) : (
              <PageContent page={pages[currentPage]} />
            )}
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
