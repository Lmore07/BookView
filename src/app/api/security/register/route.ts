import { CreateUserDTO } from "@/libs/dtos/security/createUserDTO";
import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import prisma from "@/libs/services/prisma";
import { withValidation } from "@/libs/utils/validation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export const POST = apiMiddleware(async (request: NextRequest) => {
  try {
    //const body = (await request.json()) as UserRegister;

    const body = await withValidation(CreateUserDTO, request);
    if (body instanceof NextResponse) {
      return body;
    }

    const email = await prisma.users.findUnique({
      where: { mail: body.email },
    });

    if (email) {
      return NextResponse.json(
        { error: "El correo ingresado ya existe en el sistema" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (prisma) => {
      const { idPerson } = await prisma.persons.create({
        data: {
          names: body.names,
          birthday: new Date(body.birthday),
          lastNames: body.lastNames,
        },
      });
      await prisma.users.create({
        data: {
          mail: body.email,
          password: await bcrypt.hash(body.password, 10),
          idPerson: idPerson,
          rol: body.role,
        },
      });
    });
    return NextResponse.json(
      { message: "Usuario creado con éxito" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Los datos ingresados no estan correctos" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "Error en el servidor" },
        { status: 500 }
      );
    }
  }
});
