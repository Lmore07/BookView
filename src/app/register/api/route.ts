import { UserRegister } from "@/libs/interfaces/user.interface";
import { apiMiddleware } from "@/libs/middleware/apiMiddleware";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export const POST = apiMiddleware(async (request: NextRequest) => {
  try {
    const body = (await request.json()) as UserRegister;
    console.log(body);
    const birthday = new Date(body.birthday);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const resultPrisma = await prisma.$transaction(async (prisma) => {
      const { idPerson } = await prisma.persons.create({
        data: {
          names: body.names,
          birthday: birthday,
          lastNames: body.lastNames,
        },
      });
      const result = await prisma.users.create({
        data: {
          mail: body.email,
          password: hashedPassword,
          idPerson: idPerson,
        },
      });
      return result;
    });
    return NextResponse.json(
      { message: "Usuario creado con éxito" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
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
