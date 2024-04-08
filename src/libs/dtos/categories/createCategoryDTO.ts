import { IsNotEmpty, IsString, Length } from "class-validator";

export class createCategoryDTO {
  @IsString({ message: "El nombre de la categoría solo puede contener letras" })
  @IsNotEmpty({ message: "El nombre de la categoría es requerido" })
  @Length(1, 50, {
    message: "El nombre de la categoría debe tener entre 1 y 50 caracteres",
  })
  name!: string;

  @Length(1, 255, {
    message: "La descripción de la categoría debe tener entre 1 y 255 caracteres",
  })
  @IsNotEmpty({ message: "La descripción de la categoría es requerida" })
  description!: string;
}
