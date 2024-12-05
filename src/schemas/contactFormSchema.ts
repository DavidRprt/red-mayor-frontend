"use client"

import { z } from "zod"

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
  email: z
    .string()
    .email({ message: "Por favor, introduce un correo válido." }),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." })
    .max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
  phone: z
    .string()
    .regex(/^[0-9\-+() ]*$/, {
      message: "El teléfono debe ser un formato válido.",
    })
    .optional(),
})

export default contactFormSchema