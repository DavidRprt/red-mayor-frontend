"use server"
import { z } from "zod"

const schemaRegister = z
  .object({
    businessName: z.string().min(3, {
      message: "El nombre del negocio debe tener al menos 3 caracteres",
    }),
    legalName: z.string().min(3, {
      message: "La razón social debe tener al menos 3 caracteres",
    }),
    email: z.string().email({
      message: "Por favor, ingresa un correo electrónico válido",
    }),
    phone: z.string().regex(/^\d+$/, {
      message: "El teléfono debe contener solo números",
    }),
    cuit: z
      .string()
      .length(11, {
        message: "El CUIT debe tener 11 dígitos",
      })
      .regex(/^\d+$/, {
        message: "El CUIT debe contener solo números",
      }),
    userType: z.enum(["persona_fisica", "sociedad", "responsable_inscripto"], {
      message: "Selecciona un tipo de usuario válido",
    }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .max(100, {
        message: "La contraseña no puede tener más de 100 caracteres",
      }),
    confirmPassword: z.string().min(6, {
      message: "Debes repetir la contraseña correctamente",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("Hello From Register User Action")

  const fields = {
    businessName: formData.get("businessName"),
    legalName: formData.get("legalName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    cuit: formData.get("cuit"),
    userType: formData.get("userType"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  const validatedFields = schemaRegister.safeParse(fields)
  
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  return {
    ...prevState,
    data: "ok",
  }
}
