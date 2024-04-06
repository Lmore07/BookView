import { createCategoryDTO } from "@/libs/dtos/categories/createCategoryDTO";
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
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const status = toBoolean(url.searchParams.get("status"));
  const skip = (page - 1) * limit;
  const categories = await prisma.categories.findMany({
    skip,
    take: limit,
    select: {
      idCategory: true,
      categoryName: true,
      description: true,
      createdBy: true,
      status: true,
    },
    where: {
      status: status,
    },
    orderBy: {
      categoryName: "asc",
    },
  });
  const totalCategories = await prisma.categories.count({
    where: { status: status },
  });
  const totalPages = Math.ceil(totalCategories / limit);

  if (categories.length > 0) {
    return NextResponse.json(
      {
        data: categories,
        message: "Categorías encontradas",
        pagination: {
          totalCategories,
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
        data: categories,
        message: "No hay categorías disponibles",
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
