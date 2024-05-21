import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const body = await request.json();

  const lastBook = await prisma.viewBooks.findFirst({
    where: {
      idUser: authResult.userId,
      idBook: body.idBook,
    },
    orderBy: {
      dateView: "desc",
    },
  });

  const bookView = await prisma.viewBooks.create({
    select: {
      idViewBook: true,
      lastPage: true,
    },
    data: {
      idBook: body.idBook,
      idUser: authResult.userId,
      lastPage: lastBook?.lastPage,
    },
  });
  return NextResponse.json(
    {
      data: bookView,
      message: `Libro abierto correctamente`,
    },
    { status: 200 }
  );
});

type UpdateData = {
  lastPage: any;
  dateView: Date;
  countViews?: number;
};

export const PUT = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const body = await request.json();

  const updateData: UpdateData = {
    lastPage: body.lastPage,
    dateView: new Date(),
  };

  const lastBookView = await prisma.viewBooks.findFirst({
    select: {
      idViewBook: true,
      idBook: true,
      lastPage: true,
    },
    where: {
      idUser: authResult.userId,
      idBook: body.idBook,
    },
    orderBy: {
      dateView: "desc",
    },
  });

  const bookView = await prisma.viewBooks.update({
    select: {
      idViewBook: true,
      lastPage: true,
    },
    data: updateData,
    where: {
      idViewBook: lastBookView?.idViewBook,
    },
  });

  return NextResponse.json(
    {
      data: bookView,
      message: `Libro actualizado correctamente`,
    },
    { status: 200 }
  );
});
