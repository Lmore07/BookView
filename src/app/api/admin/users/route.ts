import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { toBoolean, toRolEnum } from "@/libs/pipes/toBoolean";
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
  const role = toRolEnum(url.searchParams.get("role"));

  const skip = (page - 1) * limit;
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
        updatedAt: true,
      },
      where: {
        NOT: {
          rol: "ADMIN",
        },
        status: status,
        rol: role ? role : undefined,
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersWithFullName = users.map(({ Person, ...user }) => ({
      ...user,
      names: `${Person.names} ${Person.lastNames}`,
    }));

    const totalUsers = await prisma.users.count({
      where: {
        status: status,
        NOT: {
          rol: "ADMIN",
        },
      },
    });
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json(
      {
        data: usersWithFullName,
        message: "Usuarios encontrados",
        pagination: {
          total: totalUsers,
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
        error: "No se encontraron usuarios",
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
    await prisma.users.update({
      where: {
        idUser: id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(
      {
        message: `Usuario ${
          body.status ? "activado" : "desactivado"
        } con éxito`,
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
