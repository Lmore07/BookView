import { z } from "zod";
import { zfd } from "zod-form-data";

const pageSchema = z.object({
  template: z.string(),
  content: z.string(),
  numberPage: z.number(),
  image: z.instanceof(Blob).optional(),
  audio: z.instanceof(Blob).optional(),
  video: z.instanceof(Blob).optional(),
});

const formDataSchema = z.object({
  bookName: z.string(),
  author: z.string(),
  publicationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de publicación inválida",
  }),
  pages: z.array(pageSchema),
  categoriesIds: z.array(z.number()),
});

export default formDataSchema;
