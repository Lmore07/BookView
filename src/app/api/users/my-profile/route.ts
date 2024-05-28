import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { withAuth } from "@/libs/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/services/prisma";
import { saveImage } from "@/libs/services/generateImage";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const profile = await prisma.users.findUnique({
    where: {
      idUser: authResult.userId,
    },
    select: {
      profilePicture: true,
      mail: true,
      Person: {
        select: {
          birthday: true,
          names: true,
          lastNames: true,
        },
      },
    },
  });

  if (!profile) {
    return NextResponse.json(
      { error: "No se encontró el usuario especificado" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: profile }, { status: 200 });
});

export const PUT = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const formData = await request.formData();

  const data: {
    mail?: string;
    names?: string;
    lastNames?: string;
    profilePicture?: Blob | string | null;
    birthday?: Date;
  } = {};
  Object.assign(data, Object.fromEntries(formData.entries()));

  await prisma.$transaction(async (prisma) => {
    const user = await prisma.users.update({
      data: {
        mail: data.mail,
        profilePicture: await saveImage(data.profilePicture),
      },
      where: {
        idUser: authResult.userId,
      },
      select: {
        Person: {
          select: {
            idPerson: true,
          },
        },
      },
    });

    await prisma.persons.update({
      data: {
        names: data.names,
        birthday: new Date(data.birthday!),
        lastNames: data.lastNames,
      },
      where: {
        idPerson: user.Person.idPerson,
      },
    });
  });

  return NextResponse.json(
    { message: "Usuario actualizado con éxito" },
    { status: 200 }
  );
});
