import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { toBoolean } from "@/libs/pipes/toBoolean";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const body = await request.json();

  const existBookView = await prisma.viewBooks.findFirst({
    where: {
      AND: [
        {
          idUser: authResult.userId,
        },
        {
          idBook: body.idBook,
        },
      ],
    },
    select: {
      lastPage: true,
    },
  });

  if (existBookView) {
    return NextResponse.json(
      {
        data: [{ lastPage: existBookView.lastPage }],
        message: `Quiere continuar donde lo dejo la última vez o desea volver al principio`,
      },
      { status: 400 }
    );
  }

  const bookView = await prisma.viewBooks.create({
    select: {
      idViewBook: true,
    },
    data: {
      idBook: body.idBook,
      idUser: authResult.userId,
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

  const url = new URL(request.url);
  const firstOpen = toBoolean(url.searchParams.get("firstOpen"));

  const updateData: UpdateData = {
    lastPage: body.lastPage,
    dateView: new Date(),
  };

  if (firstOpen) {
    const countViews = await prisma.viewBooks.findUnique({
      select: {
        countViews: true,
      },
      where: {
        idUser_idBook: {
          idUser: authResult.userId,
          idBook: body.idBook,
        },
      },
    });

    updateData.countViews = countViews!.countViews + 1;
  }

  const bookView = await prisma.viewBooks.update({
    select: {
      idViewBook: true,
      lastPage: true,
    },
    data: updateData,
    where: {
      idUser_idBook: {
        idUser: authResult.userId,
        idBook: body.idBook,
      },
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
