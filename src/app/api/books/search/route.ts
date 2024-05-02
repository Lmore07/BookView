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

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm") ?? "";
  const orderBy = url.searchParams.get("orderBy") ?? "bookName_asc";
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const skip = (page - 1) * limit;
  const categoriesIds = url.searchParams
    .get("categoriesIds")
    ?.split(",")
    .map(Number);
  const orderByOption: Prisma.BooksOrderByWithRelationInput = {};

  switch (orderBy) {
    case "bookName_asc":
      orderByOption.bookName = "asc";
      break;
    case "bookName_desc":
      orderByOption.bookName = "desc";
      break;
    case "author_asc":
      orderByOption.author = "asc";
      break;
    case "author_desc":
      orderByOption.author = "desc";
      break;
    case "publicationDate_asc":
      orderByOption.publicationDate = "asc";
      break;
    case "publicationDate_desc":
      orderByOption.publicationDate = "desc";
      break;
    default:
      break;
  }

  const books = await prisma.books.findMany({
    skip,
    take: limit,
    select: {
      idBook: true,
      author: true,
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
      OR: [
        { bookName: { contains: searchTerm, mode: "insensitive" } },
        { author: { contains: searchTerm, mode: "insensitive" } },
      ],
      BookCategories: categoriesIds
        ? {
            some: {
              idCategory: {
                in: categoriesIds,
              },
            },
          }
        : undefined,
    },
    orderBy: orderByOption,
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

  console.log("Vistos: ",userViewedBooks);

  const booksWithIsFavorite = books.map((book) => ({
    ...book,
    isFavorite: userFavoriteBooks.some(
      (favoriteBook) => favoriteBook.idBook === book.idBook
    ),
    isViewed: userViewedBooks.some(
      (viewedBook) => viewedBook.idBook === book.idBook
    ),
  }));

  const totalBooks = await prisma.books.count({
    where: {
      status: true,
      OR: [
        { bookName: { contains: searchTerm, mode: "insensitive" } },
        { author: { contains: searchTerm, mode: "insensitive" } },
      ],
      BookCategories: categoriesIds
        ? {
            some: {
              idCategory: {
                in: categoriesIds,
              },
            },
          }
        : undefined,
    },
  });
  const totalPages = Math.ceil(totalBooks / limit);

  if (booksWithIsFavorite.length > 0) {
    return NextResponse.json(
      {
        data: booksWithIsFavorite,
        message: "Libros encontrados",
        pagination: {
          total: totalBooks,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
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
