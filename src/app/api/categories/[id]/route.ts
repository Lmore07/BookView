import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const category = await prisma.categories.findUnique({
      where: { idCategory: parseInt(params.id) },
      select: {
        categoryName: true,
        idCategory: true,
        description: true,
        status: true,
      },
    });
    if (!category) {
      return NextResponse.json(
        { error: "No existe la categoría" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: category, message: "Categoría encontrada" },
      { status: 200 }
    );
  }
);


