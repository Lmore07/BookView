import { z } from "zod";

export const folderSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre de la carpeta es necesario",
  }),
  description: z.string().min(1, {
    message: "La descripción de la carpeta es necesaria",
  }),
});
