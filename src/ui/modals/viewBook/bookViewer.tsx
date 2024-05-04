import { BooksAll, PageI } from "@/libs/interfaces/books.interface";
import React, { useEffect, useState } from "react";
import FlipBook from "./flipBook";

interface BookViewerProps {
  content: PageI[];
  book: BooksAll;
  lastPage: number;
  isViewed?: boolean;
}

const BookViewer: React.FC<BookViewerProps> = ({ content, book, lastPage, isViewed }) => {
  const [currentPage, setCurrentPage] = useState(lastPage);

  const initView = async () => {
    if(!isViewed){
      await fetch("../api/books/views?firstOpen=true", {
        method: "PUT",
        body: JSON.stringify({ idBook: book.idBook, lastPage: currentPage }),
      });
    }
  };

  useEffect(() => {
    console.log("Book", book);
    initView();
  }, []);

  return (
    <div className="overflow-y-auto overflow-x-hidden pb-10">
      <div className="w-full">
        <FlipBook
          pages={content}
          startPage={lastPage}
          isViewed={isViewed}
          coverInfo={{
            author: book.author,
            bookName: book.bookName,
            coverPhoto: book.coverPhoto!,
            publicationDate: book.publicationDate,
            idBook: book.idBook,
          }}
        />
      </div>
    </div>
  );
};

export default BookViewer;
