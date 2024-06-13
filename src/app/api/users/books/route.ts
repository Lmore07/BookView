import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type OrderByOptions =
  | "bookName_asc"
  | "bookName_desc"
  | "author_asc"
  | "author_desc"
  | "publicationDate_asc"
  | "publicationDate_desc";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }


  const books = await prisma.books.findMany({
    take: 4,
    select: {
      idBook: true,
      authors: true,
      bookName: true,
      publicationDate: true,
      illustrator: true,
      Favorite_Books: {
        include: {
          Favorite_Folders: true,
        },
      },
      coverPhoto: true,
    },
    where: {
      status: true,
    },
    orderBy: {
      createdBy: "desc",
    },
  });
  const userFavoriteFolders = await prisma.favorite_Folders.findMany({
    where: {
      idUser: authResult.userId,
      status: true,
    },
    select: {
      idFolder: true,
    },
  });
  const userFavoriteBooks = await prisma.favorite_Books.findMany({
    where: {
      idFolder: {
        in: userFavoriteFolders.map((folder) => folder.idFolder),
      },
    },
    select: {
      idBook: true,
    },
  });

  const userViewedBooks = await prisma.viewBooks.findMany({
    where: {
      idUser: authResult.userId,
    },
    select: {
      idBook: true,
    },
  });

  const booksWithIsFavorite = books.map((book) => ({
    ...book,
    isFavorite: userFavoriteBooks.some(
      (favoriteBook) => favoriteBook.idBook === book.idBook
    ),
    isViewed: userViewedBooks.some(
      (viewedBook) => viewedBook.idBook === book.idBook
    ),
  }));

  if (booksWithIsFavorite.length > 0) {
    return NextResponse.json(
      {
        data: booksWithIsFavorite,
        message: "Libros encontrados",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        data: booksWithIsFavorite,
        message: "No se encontraron libros para tu busqueda",
      },
      { status: 404 }
    );
  }
});
