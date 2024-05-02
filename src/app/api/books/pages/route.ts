import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const url = new URL(request.url);
  const idBook = parseInt(url.searchParams.get("book") ?? "1", 10);


  const pages = await prisma.pages.findMany({
    select: {
      idPage: true,
      numberPage: true,
      audio: true,
      video: true,
      image: true,
      template: true,
      content: true,
    },
    where: {
      status: true,
      idBook: idBook,
    },
    orderBy: {
      numberPage: "asc",
    },
  });

  if (pages.length > 0) {
    return NextResponse.json(
      {
        data: pages,
        message: "Páginas encontradas",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        message: "No hay páginas disponibles",
      },
      { status: 404 }
    );
  }
});
