import { IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateFolderDTO {
  @IsNotEmpty({ message: "El nombre de la carpeta es requerido" })
  @Length(1, 100, {
    message: "El nombre de la carpeta debe tener entre 1 y 100 caracteres",
  })
  name!: string;

  @Length(1, 255, {
    message: "La descripción de la carpeta debe tener entre 1 y 255 caracteres",
  })
  @IsNotEmpty({ message: "La descripción de la carpeta es requerida" })
  description!: string;
}

export class AddBookToFolder {
  @IsNotEmpty({ message: "El nombre de la carpeta es requerido" })
  @Length(1, 100, {
    message: "El nombre de la carpeta debe tener entre 1 y 100 caracteres",
  })
  @IsNumber({}, { message: "El id del libro debe ser un número" })
  idBook!: string;

  @Length(1, 255, {
    message: "La descripción de la carpeta debe tener entre 1 y 255 caracteres",
  })
  @IsNotEmpty({ message: "La descripción de la carpeta es requerida" })
  @IsNumber({}, { message: "El id del libro debe ser un número" })
  idFolder!: string;
}
