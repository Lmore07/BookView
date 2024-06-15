import {
  AddBookBodyRequest,
  bookSchema,
  parsePagesField,
} from "@/libs/dtos/books/booksDTOS";
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
  const idBook = parseInt(url.searchParams.get("id") ?? "0", 10);

  if (idBook == 0) {
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
        status: true,
        editorial: true,
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
  } else {
    const categoriesIds = await prisma.bookCategory.findMany({
      where: {
        idBook: idBook,
      },
      select: {
        idCategory: true,
      },
    });
    const book = await prisma.books.findUnique({
      where: {
        idBook: idBook,
      },
      select: {
        idBook: true,
        authors: true,
        bookName: true,
        coverPhoto: true,
        illustrator: true,
        editorial: true,
        status: true,
        publicationDate: true,
        Pages: {
          where: {
            idBook: idBook,
            status: true,
          },
          select: {
            idPage: true,
            numberPage: true,
            template: true,
            content: true,
            image: true,
            audio: true,
            video: true,
          },
          orderBy: {
            numberPage: "asc",
          },
        },
      },
    });

    const bookInfo = {
      ...book,
      categoriesIds: categoriesIds.map((category) => category.idCategory),
    };
    return NextResponse.json(
      {
        data: bookInfo,
        message: "Libro encontrado",
      },
      { status: 200 }
    );
  }
});

export const POST = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const formData = await request.formData();
  const parsedPages = parsePagesField(formData);
  const parsedEntries: AddBookBodyRequest = { pages: [], publicationDate: "" };
  Object.assign(parsedEntries, Object.fromEntries(formData.entries()));
  if (typeof parsedEntries.categoriesIds === "string") {
    parsedEntries.categoriesIds = JSON.parse(parsedEntries.categoriesIds);
  }
  if (typeof parsedEntries.authors === "string") {
    parsedEntries.authors = JSON.parse(parsedEntries.authors);
  }
  for (const key of Object.keys(parsedEntries)) {
    if (key.startsWith("pages")) {
      delete parsedEntries[key];
    }
  }
  parsedEntries.pages = [];
  parsedEntries.pages.push({
    template: "Cover",
    numberPage: 0,
    content: `Hola, el nombre del libro es: ${
      parsedEntries.bookName
    } los autores son: ${parsedEntries.authors?.join(", ")}  y lo publicó el: ${
      parsedEntries.publicationDate
    }`,
  });
  parsedEntries.pages.push(...parsedPages.pages);
  const validatedFields = bookSchema.safeParse(parsedEntries);
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        message: "Campos inválidos",
        errors: validatedFields.error.errors,
      },
      { status: 400 }
    );
  }
  const book = await prisma.books.create({
    select: {
      idBook: true,
      authors: true,
      bookName: true,
      publicationDate: true,
      coverPhoto: true,
      Pages: true,
    },
    data: {
      authors: parsedEntries.authors,
      bookName: parsedEntries.bookName!,
      publicationDate: new Date(parsedEntries.publicationDate).toISOString(),
      createdBy: authResult.userId,
      illustrator: parsedEntries.illustrator,
      editorial: parsedEntries.editorial,
      coverPhoto: await saveImage(parsedEntries.bookCover),
      BookCategories: {
        create: parsedEntries.categoriesIds?.map((idCategory: any) => ({
          Categories: { connect: { idCategory } },
        })),
      },
      Pages: {
        createMany: {
          data: await Promise.all(
            parsedEntries.pages
              .filter((page: any) => !page.idPage)
              .map(async (page: any) => ({
                numberPage: page.numberPage,
                createdBy: authResult.userId,
                content: page.content,
                template: page.template,
                image: await saveImage(page.image, "create"),
                audio: await saveAudio(page.audio),
                video: await saveVideo(page.video),
              }))
          ),
        },
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

export const PUT = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const formData = await request.formData();
  const parsedPages = parsePagesField(formData);
  const parsedEntries: AddBookBodyRequest = { pages: [], publicationDate: "" };
  Object.assign(parsedEntries, Object.fromEntries(formData.entries()));

  if (typeof parsedEntries.categoriesIds === "string") {
    parsedEntries.categoriesIds = JSON.parse(parsedEntries.categoriesIds);
  }
  if (typeof parsedEntries.authors === "string") {
    parsedEntries.authors = JSON.parse(parsedEntries.authors);
  }

  for (const key of Object.keys(parsedEntries)) {
    if (key.startsWith("pages")) {
      delete parsedEntries[key];
    }
  }

  parsedEntries.pages = [];
  parsedEntries.pages.push({
    template: "Cover",
    numberPage: 0,
    content: `Hola, el nombre del libro es: ${
      parsedEntries.bookName
    } los autores son: ${parsedEntries.authors?.join(", ")}  y lo publicó el: ${
      parsedEntries.publicationDate
    }`,
  });
  parsedEntries.pages.push(...parsedPages.pages);
  const validatedFields = bookSchema.safeParse(parsedEntries);
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        message: "Campos inválidos",
        errors: validatedFields.error.errors,
      },
      { status: 400 }
    );
  }
  const url = new URL(request.url);
  const idBook = parseInt(url.searchParams.get("id") ?? "0", 10);
  if (idBook == 0) {
    throw new Error("El id del libro es requerido");
  }

  const pagesBook = await prisma.pages.findMany({
    where: {
      idBook,
    },
    select: {
      idPage: true,
      numberPage: true,
      status: true,
    },
  });

  //ACTUALIZAR PORTADA
  await prisma.pages.update({
    where: {
      idBook_numberPage: {
        idBook,
        numberPage: 0,
      },
    },
    data: {
      content: `Hola, el nombre del libro es: ${
        parsedEntries.bookName
      } los autores son: ${parsedEntries.authors?.join(
        ", "
      )} y lo publicó el: ${parsedEntries.publicationDate}`,
    },
  });

  try {
    const pagesToUpdate = pagesBook.filter(
      (page) =>
        !parsedEntries.pages.some((p) => p.numberPage === page.numberPage)
    );

    const isToUpdate = pagesToUpdate
      .filter((page) => page.numberPage !== 0)
      .map((page) => page.idPage);
    await prisma.pages.updateMany({
      where: {
        idPage: {
          in: isToUpdate,
        },
      },
      data: {
        status: false,
      },
    });

    const book = await prisma.books.update({
      where: { idBook },
      select: {
        idBook: true,
        authors: true,
        bookName: true,
        publicationDate: true,
        coverPhoto: true,
        editorial: true,
        illustrator: true,
        Pages: true,
      },
      data: {
        authors: parsedEntries.authors,
        editorial: parsedEntries.editorial,
        illustrator: parsedEntries.illustrator,
        bookName: parsedEntries.bookName,
        publicationDate: new Date(parsedEntries.publicationDate).toISOString(),
        updatedBy: authResult.userId,
        coverPhoto: await saveImage(parsedEntries.bookCover),
        BookCategories: {
          deleteMany: {
            idBook: idBook,
          },
          create: [
            ...parsedEntries.categoriesIds!.map((idCategory: any) => ({
              Categories: { connect: { idCategory } },
            })),
          ],
        },
        Pages: {
          updateMany: await Promise.all(
            parsedEntries.pages
              .filter((page: any) => page.idPage)
              .map(async (page: any) => ({
                where: { idPage: page.idPage },
                data: {
                  numberPage: page.numberPage,
                  status: true,
                  content: page.content,
                  template: page.template,
                  updatedBy: authResult.userId,
                  image: await saveImage(page.image, "update"),
                  audio: await saveAudio(page.audio),
                  video: await saveVideo(page.video),
                },
              }))
          ),
          createMany: {
            data: await Promise.all(
              parsedEntries.pages
                .filter((page: any) => {
                  return !page.idPage && page.numberPage != 0;
                })
                .map(async (page: any) => ({
                  numberPage: page.numberPage,
                  createdBy: authResult.userId,
                  content: page.content,
                  template: page.template,
                  image: await saveImage(page.image, "create"),
                  audio: await saveAudio(page.audio),
                  video: await saveVideo(page.video),
                }))
            ),
          },
        },
      },
    });
    return NextResponse.json(
      {
        data: book,
        message: `Libro: ${book.bookName} actualizado correctamente`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: `El libro no se logró actualizar`,
      },
      { status: 400 }
    );
  }
});
