import { RolEnum } from "@/libs/interfaces/user.interface";
import { Transform } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class CreateUserDTO {
  @IsString({ message: "Los nombres solo pueden contener letras" })
  @IsNotEmpty({ message: "Los nombres son requeridos" })
  @Length(3, 60, {
    message: "Los nombres deben tener entre 3 y 60 caracteres",
  })
  names!: string;

  @IsString({ message: "Los apellidos solo pueden contener letras" })
  @Length(3, 60, {
    message: "Los apellidos deben tener entre 3 y 60 caracteres",
  })
  @IsNotEmpty({ message: "Los apellidos son requeridos" })
  lastNames!: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: "La fecha de nacimiento no es válida" })
  birthday!: Date;

  @IsEmail({}, { message: "El email ingresado no es válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email!: string;

  @IsEnum(RolEnum, {
    message: "El tipo ingresado no corresponde a los admitidos",
  })
  @IsNotEmpty({ message: "El tipo de usuario es requerido" })
  role!: string;

  @IsNotEmpty({ message: "La contraseña es requerida" })
  password!: string;
}
