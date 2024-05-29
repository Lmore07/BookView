import { createCategoryDTO } from "@/libs/dtos/categories/createCategoryDTO";
import { StatusDTO } from "@/libs/dtos/general/statusDTO";
import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { toBoolean } from "@/libs/pipes/toBoolean";
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
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const status = toBoolean(url.searchParams.get("status"));

  const skip = (page - 1) * limit;
  try {
    const categories = await prisma.categories.findMany({
      select: {
        idCategory: true,
        categoryName: true,
        description: true,
        createdAt: true,
        status: true,
        updatedAt: true,
      },
      where: {
        status: status,
      },
      orderBy: {
        categoryName: "asc",
      },
      skip,
      take: limit,
    });

    const totalCategories = await prisma.categories.count({
      where: { status: status },
    });
    const totalPages = Math.ceil(totalCategories / limit);

    return NextResponse.json(
      {
        data: categories,
        message: "Libros encontrado",
        pagination: {
          total: totalCategories,
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
        error: "No se encontraron libros",
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

    const body = await withValidation(createCategoryDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    const allCategories = await prisma.categories.findMany();

    const existingCategory = allCategories.find(
      (category) =>
        category.categoryName.toLowerCase() === body.name.toLowerCase()
    );

    if (existingCategory) {
      return NextResponse.json(
        {
          error: "La categoría ya existe",
        },
        { status: 400 }
      );
    }

    const category = await prisma.categories.create({
      data: {
        categoryName: body.name,
        description: body.description,
        createdBy: authResult.userId,
      },
      select: {
        idCategory: true,
        categoryName: true,
        description: true,
      },
    });
    return NextResponse.json(
      {
        data: category,
        message: `Categoría ${body.name} creada correctamente`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error al crear la categoría",
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
    const categoryId = parseInt(url.searchParams.get("id") ?? "0");

    if (categoryId == 0) {
      return NextResponse.json(
        {
          error: "No se detalló la categoría",
        },
        { status: 400 }
      );
    }

    const body = await withValidation(createCategoryDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    const category = await prisma.categories.update({
      data: {
        categoryName: body.name,
        description: body.description,
      },
      select: {
        idCategory: true,
        categoryName: true,
        description: true,
      },
      where: {
        idCategory: categoryId,
      },
    });
    return NextResponse.json(
      {
        data: category,
        message: `Categoría actualizada correctamente`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error al actualizar la categoría",
      },
      { status: 500 }
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
    const categoryId = parseInt(url.searchParams.get("id") ?? "0");

    const body = await withValidation(StatusDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    if (categoryId == 0) {
      return NextResponse.json(
        {
          error: "No se detalló la categoría",
        },
        { status: 400 }
      );
    }

    await prisma.categories.update({
      data: {
        status: body.status,
      },
      where: {
        idCategory: categoryId,
      },
    });
    return NextResponse.json(
      {
        message: `Categoría actualizada correctamente`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error al actualizar la categoría",
      },
      { status: 500 }
    );
  }
});
