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
    const users = await prisma.users.findMany({
      select: {
        Person: {
          select: {
            names: true,
            lastNames: true,
            idPerson: true,
          },
        },
        idUser: true,
        mail: true,
        rol: true,
        status: true,
        createdAt: true,
      },
      where: {
        NOT: {
          rol: "ADMIN",
        },
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersWithFullName = users.map(({ Person, ...user }) => ({
      ...user,
      names: `${Person.names} ${Person.lastNames}`,
    }));

    return NextResponse.json(
      {
        data: usersWithFullName,
        message: "Usuarios encontrados",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "No se encontraron usuarios",
      },
      { status: 404 }
    );
  }
});
