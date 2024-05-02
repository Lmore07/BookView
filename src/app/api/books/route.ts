import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { toBoolean } from "@/libs/pipes/toBoolean";
import { saveAudio, saveImage, saveVideo } from "@/libs/services/generateImage";
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

  const books = await prisma.books.findMany({
    skip,
    take: limit,
    select: {
      idBook: true,
      author: true,
      bookName: true,
      publicationDate: true,
      illustrator: true,
      coverPhoto: true,
    },
    where: {
      status: status,
      createdBy: authResult.userId,
    },
    orderBy: {
      bookName: "asc",
    },
  });
  const totalBooks = await prisma.books.count({
    where: { status: status, createdBy: authResult.userId },
  });
  const totalPages = Math.ceil(totalBooks / limit);

  if (books.length > 0) {
    return NextResponse.json(
      {
        data: books,
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
        data: books,
        message: "No hay libros disponibles",
      },
      { status: 404 }
    );
  }
});

export const POST = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const formData = await request.formData();

  const data: {
    bookName?: string;
    author?: string;
    publicationDate?: Date;
    bookCover?: Blob;
    pages: {
      template?: string;
      content?: string;
      numberPage?: number;
      image?: Blob;
      audio?: Blob;
      video?: Blob;
    }[];
    categoriesIds?: number[];
    [key: string]: any;
  } = { pages: [] };
  Object.assign(data, Object.fromEntries(formData.entries()));
  if (
    !data.bookName ||
    !data.author ||
    !data.publicationDate ||
    !data.bookCover
  ) {
    throw new Error("Faltan campos requeridos");
  }

  data.pages = [];
  data.pages.push({
    template: "Cover",
    numberPage: 0,
    content: `Hola, el nombre del libro es: ${data.bookName} el autor es: ${data.author} y lo publicó el: ${data.publicationDate}`,
  });
  for (let i = 0, j = 1; data[`pages[${i}][template]`]; i++, j++) {
    data.pages.push({
      template: data[`pages[${i}][template]`],
      content: data[`pages[${i}][content]`],
      numberPage: j,
      image: data[`pages[${i}][image]`],
      audio: data[`pages[${i}][audio]`],
      video: data[`pages[${i}][video]`],
    });
  }
  if (typeof data.categoriesIds === "string") {
    data.categoriesIds = JSON.parse(data.categoriesIds);
  }
  if (typeof data.publicationDate === "string") {
    data.publicationDate = new Date(data.publicationDate);
  }
  for (const key in data) {
    if (key.startsWith("pages[")) {
      delete data[key];
    }
  }

  const book = await prisma.books.create({
    select: {
      idBook: true,
      author: true,
      bookName: true,
      publicationDate: true,
      coverPhoto: true,
      Pages: true,
    },
    data: {
      author: data.author,
      bookName: data.bookName,
      publicationDate: data.publicationDate,
      createdBy: authResult.userId,
      coverPhoto: await saveImage(data.bookCover),
      BookCategories: {
        create: data.categoriesIds?.map((idCategory: any) => ({
          Categories: { connect: { idCategory } },
        })),
      },
      Pages: {
        create: await Promise.all(
          data.pages.map(async (page: any) => ({
            numberPage: page.numberPage,
            content: page.content,
            image: await saveImage(page.image),
            audio: await saveAudio(page.audio),
            video: await saveVideo(page.video),
            template: page.template,
          }))
        ),
      },
    },
  });

  return NextResponse.json(
    {
      data: book,
      message: `Libro: ${book.bookName} creado correctamente`,
    },
    { status: 201 }
  );
});
