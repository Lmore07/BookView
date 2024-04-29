import { PageI } from "@/libs/interfaces/books.interface";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import PageContent from "./pageView";

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
  const bookRef = useRef<any>(null);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      console.log("Pagina atras");
      if (bookRef.current) {
        bookRef.current.pageFlip().flipPrev();
      }
    }
  };

  const updateLastPage = async () => {
    await fetch("../api/books/views?firstOpen=false", {
      method: "PUT",
      body: JSON.stringify({ idBook: bookId, lastPage: currentPage }),
    });
  };

  const initView = async () => {
    await fetch("../api/books/views?firstOpen=true", {
      method: "PUT",
      body: JSON.stringify({ idBook: bookId, lastPage: currentPage }),
    });
  };

  const handleNextPage = () => {
    if (currentPage < content.length) {
      setCurrentPage(currentPage + 1);
      if (bookRef.current) {
        bookRef.current.pageFlip().flipNext();
      }
    }
  };

  useEffect(() => {
    initView();
  }, []);

  useEffect(() => {
    updateLastPage();
  }, [currentPage]);

  return (
    <div className="">
      <div className="w-full">
        <HTMLFlipBook
          width={500}
          autoSize={false}
          usePortrait={true}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={1000}
          className="flex items-center justify-center shadow-lg rounded-lg"
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          ref={bookRef}
          useMouseEvents={true}
          clickEventForward={true}
          flippingTime={600}
          disableFlipByClick={true}
          showPageCorners={false}
          swipeDistance={0.5}
          startZIndex={0}
          style={{
            width: "100%",
            padding: "10px",
            display: "flex",
            justifyItems: "center",
            gap: "10px",
            alignItems: "center",
            cursor: "default",
          }}
          mobileScrollSupport={true}
          height={1000}
          startPage={currentPage}
          onFlip={(e) => {
            setCurrentPage(e.data);
          }}
          drawShadow={false}
        >
          <div>Portada</div>
          {content.map((item, index) => (
            <div key={index} className="demoPage">
              <PageContent page={item} />
            </div>
          ))}
        </HTMLFlipBook>
        <div className="flex items-center justify-center gap-4">
          <div className="absolute bottom-0 right-1/2 mr-2 my-2 z-30">
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
          <div className="absolute bottom-0 left-1/2 ml-2 my-2 z-40">
            <button
              className="bg-gray-300 p-2 rounded-full focus:outline-none"
              onClick={handleNextPage}
              disabled={currentPage === content.length}
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
    </div>
  );
};

export default BookViewer;
