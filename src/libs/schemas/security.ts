import { z } from "zod";
import { RolEnum } from "../interfaces/user.interface";

export const loginSchema = z.object({
  email: z.string().email({
    message: "El email debe ser válido",
  }),
  password: z.string().min(1, {
    message: "La contraseña no puede estar vacía",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "El email debe ser válido",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
      message:
        "La contraseña debe contener al menos un número, una mayúscula, una minúscula y un carácter especial",
    }),
  birthday: z.preprocess(
    (arg) => {
      if (typeof arg === "string") {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return arg;
    },
    z
      .date({
        message: "La fecha de nacimiento es requerida",
      })
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date <= today;
        },
        {
          message:
            "La fecha de nacimiento no puede ser mayor a la fecha actual",
        }
      )
  ),
  names: z.string().min(3, {
    message: "Los nombres deben tener al menos 3 caracteres",
  }),
  lastNames: z.string().min(3, {
    message: "Los apellidos deben tener al menos 3 caracteres",
  }),
  role: z.nativeEnum(RolEnum, {
    message: "El rol es requerido",
  }),
});
