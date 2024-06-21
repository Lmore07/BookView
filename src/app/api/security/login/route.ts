import { LoginI } from "@/libs/interfaces/user.interface";
import prisma from "@/libs/services/prisma";
import TokenService from "@/libs/services/TokenService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../../../libs/middleware/apiMiddleware";

const bcrypt = require("bcrypt");

export const POST = apiMiddleware(async (request: NextRequest) => {
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

    if (!user.status) {
      return NextResponse.json(
        {
          error:
            "El usuario no está activo, por favor comunícate con el administrador",
        },
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
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });
    cookies().set(`profile`, user.profilePicture ?? "", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });
    cookies().set(
      `userType`,
      user.rol == "CREATOR"
        ? "Creador"
        : user.rol == "READER"
        ? "Lector"
        : "Administrador",
      {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
      }
    );
    cookies().set(`email`, user.mail ?? "", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });
    cookies().set(`initials`, user.Person.names[0] + user.Person.lastNames[0], {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });
    cookies().set(`username`, user.Person.names, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
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
