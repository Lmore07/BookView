import prisma from "@/libs/services/prisma";

export async function seedInitialUser() {
  try {
    const existingUser = await prisma.users.findFirst({
      where: { rol: "ADMIN" },
    });

    console.log("Usuario inicial:", existingUser);

    if (!existingUser) {
      const newUser = await prisma.users.create({
        data: {
          mail: "",
          password: "",
          Person: {
            create: {
              names: "Admin",
              birthday: new Date(),
              lastNames: "Admin",
            },
          },
          rol: "ADMIN",
        },
      });

      console.log("Usuario inicial creado:", newUser);
    }
  } catch (error) {
    console.error("Error al crear el usuario inicial:", error);
  } finally {
    await prisma.$disconnect();
  }
}
