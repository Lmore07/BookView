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
        author: true,
        bookName: true,
        coverPhoto: true,
        illustrator: true,
        publicationDate: true,
        View_Books: {
          select: {
            countViews: true,
          },
        },
      },
      where: {
        createdBy: authResult.userId,
      },
      orderBy: {
        publicationDate: "desc",
      },
      take: 5,
    });

    const booksWithCountViewsSum = books.map((book) => {
      const { View_Books, ...otherBookProps } = book;
      const sumOfCountViews = View_Books.reduce(
        (sum, viewBook) => sum + viewBook.countViews,
        0
      );

      return {
        ...otherBookProps,
        countViews: sumOfCountViews,
      };
    });
    return NextResponse.json(
      {
        data: booksWithCountViewsSum,
        message: "Libros encontrado",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "No se encontraron libros",
      },
      { status: 404 }
    );
  }
});
