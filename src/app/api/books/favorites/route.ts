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

  const body = await request.json();

  const userFavoriteFolder = await prisma.favorite_Folders.findFirst({
    where: {
      idUser: authResult.userId,
      Favorite_Books: {
        some: {
          idBook: body.idBook,
        },
      },
    },
    select: {
      idFolder: true,
    },
  });
  console.log(userFavoriteFolder);

  if (userFavoriteFolder) {
    const updatedFavoriteBook = await prisma.favorite_Books.updateMany({
      where: {
        idBook: body.idBook,
        idFolder: userFavoriteFolder.idFolder,
      },
      data: {
        status: false,
      },
    });
    console.log(updatedFavoriteBook);

    return NextResponse.json(
      {
        data: [],
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
