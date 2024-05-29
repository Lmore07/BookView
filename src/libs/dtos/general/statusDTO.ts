import { IsBoolean, IsNotEmpty } from "class-validator";

export class StatusDTO {
  @IsNotEmpty({ message: "El estado requerido" })
  @IsBoolean({ message: "El estado debe ser un booleano" })
  status!: boolean;
}
