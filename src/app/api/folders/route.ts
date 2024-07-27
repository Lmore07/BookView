"use server";
import { CreateFolderDTO } from "@/libs/dtos/folders/createFolderDTO";
import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { toBoolean } from "@/libs/pipes/toBoolean";
import { generateImage } from "@/libs/services/generateImage";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { withValidation } from "@/libs/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiMiddleware(async (request: NextRequest) => {
  const authResult = await withAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const status = toBoolean(url.searchParams.get("status"));
  const skip = (page - 1) * limit;
  const folders = await prisma.favorite_Folders.findMany({
    skip,
    take: limit,
    select: {
      idFolder: true,
      folderName: true,
      folderDescription: true,
      createdBy: true,
      status: true,
      urlFolder: true,
    },
    where: {
      idUser: authResult.userId,
      status: status,
    },
    orderBy: {
      folderName: "asc",
    },
  });
  const totalFolders = await prisma.favorite_Folders.count({
    where: { status: status, idUser: authResult.userId },
  });
  const totalPages = Math.ceil(totalFolders / limit);

  if (folders.length > 0) {
    return NextResponse.json(
      {
        data: folders,
        message: "Carpetas encontradas",
        pagination: {
          total: totalFolders,
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
        data: folders,
        message: "No tiene carpetas agregadas",
      },
      { status: 404 }
    );
  }
});

export const POST = apiMiddleware(async (request: NextRequest) => {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await withValidation(CreateFolderDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    const allFolders = await prisma.favorite_Folders.findMany({
      where: { idUser: authResult.userId },
    });

    const existingFolder = allFolders.find(
      (folder) =>
        folder.folderName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase() ===
        body.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
    );

    if (existingFolder) {
      return NextResponse.json(
        {
          error: `La carpeta con el nombre ${body.name} ya existe`,
        },
        { status: 400 }
      );
    }
    var urlImage: string | undefined;
    try {
      urlImage = await generateImage(body.name);
    } catch (error) {
      console.log(error);
    }
    const folder = await prisma.favorite_Folders.create({
      data: {
        folderName: body.name,
        folderDescription: body.description,
        createdBy: authResult.userId,
        idUser: authResult.userId,
        urlFolder: urlImage,
      },
      select: {
        idFolder: true,
        folderName: true,
        folderDescription: true,
        urlFolder: true,
      },
    });
    return NextResponse.json(
      {
        data: folder,
        message: `Carpeta ${body.name} creada correctamente`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error al crear la carpeta",
      },
      { status: 500 }
    );
  }
});

export const PUT = apiMiddleware(async (request: NextRequest) => {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "No se ha proporcionado el id de la carpeta",
        },
        { status: 400 }
      );
    }

    const body = await withValidation(CreateFolderDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    const folder = await prisma.favorite_Folders.findUnique({
      where: { idFolder: parseInt(id) },
    });

    if (!folder) {
      return NextResponse.json(
        { error: "No existe la carpeta" },
        { status: 404 }
      );
    }

    const folderUpdate = await prisma.favorite_Folders.update({
      data: {
        folderName: body.name,
        folderDescription: body.description,
      },
      where: { idFolder: parseInt(id) },
    });

    return NextResponse.json(
      {
        data: folderUpdate,
        message: `Carpeta ${body.name} actualizada correctamente`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error al actualizar la carpeta",
      },
      { status: 500 }
    );
  }
});

export const DELETE = apiMiddleware(async (request: NextRequest) => {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "No se ha proporcionado el id de la carpeta",
        },
        { status: 400 }
      );
    }
    const folder = await prisma.favorite_Folders.findUnique({
      where: { idFolder: parseInt(id) },
    });

    if (!folder) {
      return NextResponse.json(
        { error: "No existe la carpeta" },
        { status: 404 }
      );
    }

    await prisma.favorite_Books.deleteMany({
      where: { idFolder: folder.idFolder },
    });

    await prisma.favorite_Folders.deleteMany({
      where: { idFolder: folder.idFolder },
    });

    return NextResponse.json(
      {
        message: `Carpeta ${folder.folderName} eliminada correctamente`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error al eliminar la carpeta",
      },
      { status: 500 }
    );
  }
});
