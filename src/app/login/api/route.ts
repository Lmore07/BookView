import { LoginI } from "@/libs/interfaces/user.interface";
import TokenService from "@/libs/services/TokenService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../../libs/middleware/apiMiddleware";
import { cookies } from "next/headers";

const bcrypt = require("bcrypt");

export const POST = apiMiddleware(async (request: NextRequest) => {
  const prisma = new PrismaClient();
  const body = (await request.json()) as LoginI;
  try {
    const user = await prisma.users.findUnique({
      where: {
        mail: body.email,
      },
      include: {
        Person: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Contraseña ingresada no es correcta",
        },
        {
          status: 401,
        }
      );
    }

    const token = await TokenService.sign({
      email: user.mail,
      id: user.idUser,
      role: user.rol,
    });

    cookies().set(`token`, token, {
      expires: new Date(Date.now() + 1000 * 60 * 30),
    });

    return NextResponse.json(
      {
        message: `Gusto en verte de nuevo, ${user.Person.names}`,
        data: [{ token: token, role: user.rol }],
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
});
