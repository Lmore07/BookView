import { AddBookToFolder } from "@/libs/dtos/folders/createFolderDTO";
import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { withValidation } from "@/libs/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const body = await withValidation(AddBookToFolder, request);
  if (body instanceof NextResponse) {
    return body;
  }

  const favorite = await prisma.favorite_Books.create({
    data: {
      idBook: body.idBook,
      idFolder: body.idFolder,
    },
    select: {
      idBook_favorite: true,
      idFolder: true,
      idBook: true,
    },
  });

  return NextResponse.json(
    {
      data: favorite,
      message: `Libro agregado a favoritos correctamente`,
    },
    { status: 201 }
  );
});

export const DELETE = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const url = new URL(request.url);
  const idBook = parseInt(url.searchParams.get("idBook") ?? "");

  if (!idBook) {
    return NextResponse.json(
      { error: "Se requiere id del libro" },
      { status: 400 }
    );
  }

  const userFavoriteFolder = await prisma.favorite_Folders.findFirst({
    where: {
      idUser: authResult.userId,
      Favorite_Books: {
        some: {
          idBook: idBook,
        },
      },
    },
    select: {
      idFolder: true,
    },
  });

  if (userFavoriteFolder) {
    await prisma.favorite_Books.deleteMany({
      where: {
        idBook: idBook,
        idFolder: userFavoriteFolder.idFolder,
      },
    });

    return NextResponse.json(
      {
        message: `Libro eliminado de favoritos correctamente`,
      },
      { status: 200 }
    );
  } else {
    // El libro no está en los favoritos del usuario
    return NextResponse.json(
      {
        message: `El libro no se encuentra agregado en tus favoritos`,
      },
      { status: 400 }
    );
  }
});

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "8", 10);
    const folderId = parseInt(url.searchParams.get("folder") ?? "0", 10);
    const skip = (page - 1) * limit;

    const books = await prisma.books.findMany({
      skip,
      take: limit,
      select: {
        idBook: true,
        authors: true,
        bookName: true,
        publicationDate: true,
        illustrator: true,
        coverPhoto: true,
        Favorite_Books: true,
      },
      where: {
        status: true,
        Favorite_Books: {
          some: {
            idFolder: folderId,
          },
        },
      },
    });

    const totalBooks = await prisma.books.count({
      where: {
        status: true,
        Favorite_Books: {
          some: {
            idFolder: folderId,
          },
        },
      },
    });

    const folder = await prisma.favorite_Folders.findUnique({
      where: {
        idFolder: folderId,
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

    const totalPages = Math.ceil(totalBooks / limit);

    const booksWithIsFavorite = books.map((book) => ({
      ...book,
      isFavorite: book.Favorite_Books.some(
        (favoriteBook) => favoriteBook.idBook === book.idBook
      ),
      isViewed: userViewedBooks.some(
        (viewedBook) => viewedBook.idBook === book.idBook
      ),
      nameFolder: folder?.folderName,
    }));
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
          message: "No se encontraron libros para tu carpeta",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "No se encontraron libros para tu carpeta",
      },
      { status: 404 }
    );
  }
});
