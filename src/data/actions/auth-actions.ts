"use server"
import { z } from "zod"
import { cookies } from "next/headers"
import { registerUserService } from "../../services/authService"
import { createUserDetailsService } from "../../services/authService"
import { loginUserService } from "../../services/authService"
import { StrapiErrors } from "@/components/forms/StrapiErrors"
import { redirect } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  secure: process.env.NODE_ENV === "production",
}

function validarCUIT(cuit: string): boolean {
  // Eliminar guiones del CUIT
  const cleanCUIT = cuit.replace(/-/g, "")

  // Verificar que el CUIT tenga exactamente 11 dígitos después de eliminar guiones
  if (!/^\d{11}$/.test(cleanCUIT)) return false

  const digits = cleanCUIT.split("").map(Number)
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]

  let sum = 0
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i]
  }

  let checkDigit = 11 - (sum % 11)
  if (checkDigit === 11) checkDigit = 0
  if (checkDigit === 10) checkDigit = 9

  return checkDigit === digits[10]
}

const schemaRegister = z.object({
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(20, {
      message: "El nombre de usuario no debe exceder los 20 caracteres",
    }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(100, {
      message: "La contraseña no debe exceder los 100 caracteres",
    }),
  email: z.string().email({
    message: "Por favor, ingresa una dirección de correo válida",
  }),
  razonSocial: z.string().min(3, {
    message: "La razón social debe tener al menos 3 caracteres",
  }),
  telefono: z
    .string()
    .regex(
      /^\+?\d{1,4}?[ -]?\(?\d{1,5}\)?[ -]?\d{1,5}[ -]?\d{1,5}[ -]?\d{1,5}$/,
      {
        message:
          "El teléfono debe ser válido y puede incluir prefijos internacionales, espacios, guiones o paréntesis",
      }
    ),
  cuit: z
    .string()
    .regex(/^\d{2}-?\d{8}-?\d{1}$/, {
      message:
        "El CUIT debe tener el formato correcto, por ejemplo: 27-23326545-8",
    })
    .refine((cuit) => validarCUIT(cuit.replace(/-/g, "")), {
      message: "El CUIT ingresado no es válido",
    }),
  tipoUsuario: z
    .enum(
      ["Persona Física (Monotributo)", "Responsable Inscripto", "Sociedad"],
      {
        message: "Selecciona un tipo de usuario válido",
      }
    )
    .refine((value) => value !== undefined && value !== null, {
      message: "Debes seleccionar un tipo de usuario",
    }),
  confirmPassword: z.string().min(6, {
    message: "La confirmación de contraseña debe tener al menos 6 caracteres",
  }),
})

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 characters",
    })
    .max(100, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
})

export async function registerUserAction(prevState: any, formData: FormData) {
  const strapiFields = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  }

  const additionalFields = {
    razonSocial: (formData.get("razonSocial") as string) ?? "",
    telefono: (formData.get("telefono") as string) ?? "",
    cuit: (formData.get("cuit") as string) ?? "",
    tipoUsuario: (formData.get("tipoUsuario") as string) ?? "",
    confirmPassword: (formData.get("confirmPassword") as string) ?? "",
  }

  const validatedFields = schemaRegister
    .pick({ username: true, password: true, email: true })
    .safeParse(strapiFields)

  const validatedAdditionalFields = schemaRegister
    .pick({
      razonSocial: true,
      telefono: true,
      cuit: true,
      tipoUsuario: true,
      confirmPassword: true,
    })
    .safeParse(additionalFields)

  if (!validatedFields.success || !validatedAdditionalFields.success) {
    return {
      ...prevState,
      zodErrors: {
        ...validatedFields.error?.flatten().fieldErrors,
        ...validatedAdditionalFields.error?.flatten().fieldErrors,
      },
      strapiErrors: null,
      data: { ...strapiFields, ...additionalFields },
      message: "Missing Fields. Failed to Register.",
    }
  }

  if (strapiFields.password !== additionalFields.confirmPassword) {
    return {
      ...prevState,
      zodErrors: {
        confirmPassword: ["Las contraseñas no coinciden"],
      },
      strapiErrors: null,
      data: { ...strapiFields, ...additionalFields },
      message: "Las contraseñas no coinciden.",
    }
  }

  const responseData = await registerUserService(validatedFields.data)

  if (!responseData || responseData.error) {
    return {
      ...prevState,
      strapiErrors: {
        message: responseData?.error?.message || "Unknown Error",
        name: responseData?.error?.name || "Error",
        status: responseData?.error?.status?.toString() || null,
      },
      zodErrors: null,
      data: { ...strapiFields, ...additionalFields },
      message: "Hubo un fallo en el registro",
    }
  }

  // Crear el registro en userDetails con el ID del usuario
  await createUserDetailsService({
    user: responseData.user.id,
    razonSocial: additionalFields.razonSocial,
    telefono: additionalFields.telefono,
    CUIT: additionalFields.cuit,
    tipoUsuario: additionalFields.tipoUsuario,
  })

  redirect("/signin")
}

export async function loginUserAction(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string
  const password = formData.get("password") as string

  const validatedFields = schemaLogin.safeParse({ identifier, password })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    }
  }

  const responseData = await loginUserService(validatedFields.data)

  if (!responseData || responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData?.error || { message: "Failed to Login." },
      message: "Failed to Login.",
    }
  }

  const cookieStore = await cookies()
  const expiresAt = Date.now() + 60 * 60 * 24 * 7 * 1000 // Expira en 1 semana

  cookieStore.set("jwt", responseData.jwt, {
    ...config,
  })

  return {
    success: true,
    username: responseData.user.username,
    expiresAt,
  }
}
