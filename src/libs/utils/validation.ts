import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";

export async function withValidation(DTOClass: any, request: NextRequest) {
  const body: any = plainToInstance(DTOClass, await request.json());
  const errors = await validate(body);
  const errorMessages = errors
    .filter((error) => error !== undefined)
    .map((error) => Object.values(error.constraints ?? {}))
    .flat();

  if (errors.length > 0) {
    return NextResponse.json(
      {
        message: "Campos ingresados no son correctos",
        error: errorMessages[0],
      },
      { status: 400 }
    );
  }

  return body;
}
