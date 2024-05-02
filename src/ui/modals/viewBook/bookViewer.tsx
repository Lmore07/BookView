import { BooksAll, PageI } from "@/libs/interfaces/books.interface";
import React, { useEffect, useState } from "react";
import FlipBook from "./flipBook";

interface BookViewerProps {
  content: PageI[];
  book: BooksAll;
  lastPage: number;
}

const BookViewer: React.FC<BookViewerProps> = ({ content, book, lastPage }) => {
  const [currentPage, setCurrentPage] = useState(lastPage);

  const updateLastPage = async () => {
    await fetch("../api/books/views?firstOpen=false", {
      method: "PUT",
      body: JSON.stringify({ idBook: book.idBook, lastPage: currentPage }),
    });
  };

  const initView = async () => {
    await fetch("../api/books/views?firstOpen=true", {
      method: "PUT",
      body: JSON.stringify({ idBook: book.idBook, lastPage: currentPage }),
    });
  };

  useEffect(() => {
    console.log("Book", book);
    initView();
  }, []);

  useEffect(() => {
    updateLastPage();
  }, [currentPage]);

  return (
    <div className="overflow-y-auto overflow-x-hidden pb-10">
      <div className="w-full">
        <FlipBook
          pages={content}
          startPage={currentPage}
          coverInfo={{
            author: book.author,
            bookName: book.bookName,
            coverPhoto: book.coverPhoto!,
            publicationDate: book.publicationDate,
          }}
        />
      </div>
    </div>
  );
};

export default BookViewer;
