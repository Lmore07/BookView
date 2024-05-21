import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const books = await prisma.books.findMany({
      select: {
        idBook: true,
        authors: true,
        bookName: true,
        coverPhoto: true,
        illustrator: true,
        publicationDate: true,
        status: true,
        View_Books: {
          select: {
            idViewBook: true,
          },
        },
      },
      orderBy: {
        publicationDate: "desc",
      },
      take: 5,
    });

    const booksWithCountViews = books.map((book) => {
      const countViews = book.View_Books.length;
      const { View_Books, ...otherBookProps } = book;
      return {
        ...otherBookProps,
        countViews,
      };
    });

    return NextResponse.json(
      {
        data: booksWithCountViews,
        message: "Libros encontrado",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "No se encontraron libros",
      },
      { status: 404 }
    );
  }
});
