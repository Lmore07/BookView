import { z } from "zod";

const isTemplate5 = (obj: { template: string }) => obj.template === "Template5";

export const bookSchema = z.object({
  bookName: z.string().min(1, "El nombre del libro es requerido"),
  authors: z.array(z.string()).min(1, "Al menos un autor es requerido"),
  illustrator: z.string().min(1, "El ilustrador es requerido"),
  publicationDate: z.string(),
  editorial: z.string().min(1, "La editorial es requerida"),
  bookCover: z.instanceof(Blob, {
    message: "La portada del libro es requerida",
  }),
  pages: z.array(
    z.object({
      template: z.string(),
      content: z.string(),
      numberPage: z.number(),
      image: z.instanceof(Blob).optional(),
      audio: z.instanceof(Blob).optional(),
      video: z.instanceof(Blob).optional(),
    })
  ),
  categoriesIds: z.array(z.number()),
});

export interface AddBookBodyRequest {
  bookName?: string;
  authors?: string[];
  illustrator?: string;
  publicationDate?: Date;
  editorial?: string;
  bookCover?: Blob;
  pages: {
    template?: string;
    content?: string;
    numberPage?: number;
    image?: Blob;
    audio?: Blob;
    video?: Blob;
  }[];
  categoriesIds?: number[];
  [key: string]: any;
}

export function parsePagesField<T>(formData: FormData): Record<
  string,
  {
    template: string;
    content: string;
    numberPage: number;
    image?: Blob;
    audio?: Blob;
    video?: Blob;
  }[]
> {
  const result: Record<
    string,
    {
      template: string;
      content: string;
      numberPage: number;
      image?: Blob;
      audio?: Blob;
      video?: Blob;
    }[]
  > = { pages: [] };

  for (const [key, value] of formData.entries()) {
    const match = key.match(/^pages\[(\d+)\]\[([\w]+)\]$/);
    if (match) {
      const [, index, field] = match;
      const pageIndex = parseInt(index, 10);

      if (!result.pages[pageIndex]) {
        result.pages[pageIndex] = { template: "", content: "", numberPage: 0 };
      }

      if (field === "template" || field === "content") {
        (result.pages[pageIndex] as any)[field] = value as string;
      } else if (field === "numberPage") {
        (result.pages[pageIndex] as any)[field] = parseInt(value as string, 10);
      } else {
        (result.pages[pageIndex] as any)[field] = value as Blob;
      }
    }
  }

  return result;
}
