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
    content: `Hola, el nombre del libro es: ${parsedEntries.bookName} los autores son:  y lo publicó el: ${parsedEntries.publicationDate}`,
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

  console.log("Datos que llegan", parsedEntries);

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
  const data: {
    bookName?: string;
    authors?: string[];
    illustrator?: string;
    publicationDate?: Date;
    bookCover?: Blob;
    editorial?: string;
    pages: {
      idPage?: number;
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
    !data.publicationDate ||
    !data.editorial ||
    !data.illustrator ||
    !data.bookCover
  ) {
    throw new Error("Faltan campos requeridos");
  }

  const url = new URL(request.url);
  const idBook = parseInt(url.searchParams.get("id") ?? "0", 10);
  if (idBook == 0) {
    throw new Error("El id del libro es requerido");
  }
  if (typeof data.categoriesIds === "string") {
    data.categoriesIds = JSON.parse(data.categoriesIds);
  }
  if (typeof data.publicationDate === "string") {
    data.publicationDate = new Date(data.publicationDate);
  }

  for (let i = 0, j = 1; data[`pages[${i}][template]`]; i++, j++) {
    data.pages.push({
      idPage: parseInt(data[`pages[${i}][idPage]`]),
      template: data[`pages[${i}][template]`],
      content: data[`pages[${i}][content]`],
      numberPage: j,
      image: data[`pages[${i}][image]`],
      audio: data[`pages[${i}][audio]`],
      video: data[`pages[${i}][video]`],
    });
  }

  data.authors = [];
  for (let i = 0; data[`authors[${i}]`]; i++) {
    data.authors.push(data[`authors[${i}]`]);
  }

  for (const key in data) {
    if (key.startsWith("pages[") || key.startsWith("authors[")) {
      delete data[key];
    }
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
      content: `Hola, el nombre del libro es: ${data.bookName} el autor es: ${data.authors} y lo publicó el: ${data.publicationDate}`,
    },
  });

  try {
    const pagesToUpdate = pagesBook.filter(
      (page) => !data.pages.some((p) => p.numberPage === page.numberPage)
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
        authors: data.authors,
        editorial: data.editorial,
        illustrator: data.illustrator,
        bookName: data.bookName,
        publicationDate: data.publicationDate,
        updatedBy: authResult.userId,
        coverPhoto: await saveImage(data.bookCover),
        BookCategories: {
          deleteMany: {
            idBook: idBook,
          },
          create: [
            ...data.categoriesIds!.map((idCategory: any) => ({
              Categories: { connect: { idCategory } },
            })),
          ],
        },
        Pages: {
          updateMany: await Promise.all(
            data.pages
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
              data.pages
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
