import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

let prisma = new PrismaClient();

async function main() {
  try {
    const existingUser = await prisma.users.findFirst({
      where: { rol: "ADMIN" },
    });

    const existingCategory = await prisma.categories.findFirst({
      where: { categoryName: "Otra" },
    });

    console.log("Categoria inicial:", existingCategory);
    console.log("Usuario inicial:", existingUser);

    if (!existingUser) {
      const newUser = await prisma.users.create({
        data: {
          mail: process.env.ADMIN_MAIL ?? "",
          password: await bcrypt.hash(process.env.PASSWORD ?? "", 10),
          Person: {
            create: {
              names: process.env.ADMIN_NAME || "",
              birthday: new Date(),
              lastNames: process.env.ADMIN_LASTNAME || "",
            },
          },
          rol: "ADMIN",
        },
      });

      console.log("Usuario inicial creado:", newUser);
    }
    if (!existingCategory) {
      const newCategory = await prisma.categories.create({
        data: {
          categoryName: "Otra",
          description: "Categoria por defecto",
        },
      });
      console.log("Categoria inicial creada:", newCategory);
    }
  } catch (error) {
    console.error("Error al crear el usuario inicial:", error);
    console.error("Error al crear la categoria inicial:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
