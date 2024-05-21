import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { toBoolean } from "@/libs/pipes/toBoolean";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const status = toBoolean(url.searchParams.get("status"));

  const skip = (page - 1) * limit;
  try {
    const books = await prisma.books.findMany({
      select: {
        idBook: true,
        authors: true,
        bookName: true,
        createdAt: true,
        status: true,
        coverPhoto: true,
        illustrator: true,
        publicationDate: true,
        View_Books: {
          select: {
            idViewBook: true,
          },
        },
        BookCategories: {
          select: {
            Categories: {
              select: {
                categoryName: true,
              },
            },
          },
        },
      },
      where: {
        status: status,
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalBooks = await prisma.books.count({
      where: {
        status: status,
      },
    });
    const totalPages = Math.ceil(totalBooks / limit);

    const booksFinal = books.map((book) => {
      const countViews = book.View_Books.length;
      const { View_Books, BookCategories, ...otherBookProps } = book;
      const categoryNames = BookCategories.map(
        (category) => category.Categories.categoryName
      );
      return {
        ...otherBookProps,
        countViews,
        categoryNames,
      };
    });

    return NextResponse.json(
      {
        data: booksFinal,
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

export const PATCH = apiMiddleware(async (request: NextRequest) => {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") ?? "", 10);
    const body = await request.json();
    await prisma.books.update({
      where: {
        idBook: id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(
      {
        message: `Libro ${body.status ? "activado" : "desactivado"} con éxito`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `La acción no se pudo completar, intente nuevamente`,
      },
      { status: 500 }
    );
  }
});
