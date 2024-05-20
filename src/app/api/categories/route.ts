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
          total: totalCategories,
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
