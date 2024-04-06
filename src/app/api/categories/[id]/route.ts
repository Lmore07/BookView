import { UpdateCategoryDTO } from "@/libs/dtos/categories/updateCategoryDTO";
import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withAuth } from "@/libs/utils/auth";
import { withValidation } from "@/libs/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const category = await prisma.categories.findUnique({
      where: { idCategory: parseInt(params.id) },
      select: {
        categoryName: true,
        idCategory: true,
        description: true,
        status: true,
        updatedAt: true,
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

export const PUT = apiMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await withValidation(UpdateCategoryDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    const category = await prisma.categories.findUnique({
      where: { idCategory: parseInt(params.id) },
    });
    if (!category) {
      return NextResponse.json(
        { error: "No existe la categoría" },
        { status: 404 }
      );
    }

    try {
      const data = await prisma.categories.update({
        where: { idCategory: parseInt(params.id) },
        data: {
          categoryName: body.name,
          description: body.description,
        },
        select: {
          categoryName: true,
          idCategory: true,
          description: true,
          status: true,
        },
      });
      return NextResponse.json(
        { data: data, message: "Categoría actualizada" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: "Ocurrió un error" }, { status: 500 });
    }
  }
);

export const PATCH = apiMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const category = await prisma.categories.findUnique({
      where: { idCategory: parseInt(params.id) },
    });
    if (!category) {
      return NextResponse.json(
        { error: "No existe la categoría" },
        { status: 404 }
      );
    }

    try {
      const data = await prisma.categories.update({
        where: { idCategory: parseInt(params.id) },
        data: {
          status: !category.status,
        },
        select: {
          categoryName: true,
          idCategory: true,
          description: true,
          status: true,
        },
      });
      return NextResponse.json(
        { data: data, message: "Categoría actualizada" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: "Ocurrió un error" }, { status: 500 });
    }
  }
);
