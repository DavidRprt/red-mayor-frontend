"use server"
import { z } from "zod"
import { cookies } from "next/headers"
import { registerUserService } from "../services/authService"
import { StrapiErrors } from "@/components/forms/StrapiErrors"
import { redirect } from "next/navigation"

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

function validarCUIT(cuit: string): boolean {
  // Eliminar guiones del CUIT
  const cleanCUIT = cuit.replace(/-/g, "")
  console.log(cleanCUIT)

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

export async function registerUserAction(prevState: any, formData: FormData) {
  const strapiFields = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  }

  const additionalFields = {
    razonSocial: formData.get("razonSocial"),
    telefono: formData.get("telefono"),
    cuit: formData.get("cuit"),
    tipoUsuario: formData.get("tipoUsuario"),
    confirmPassword: formData.get("confirmPassword"),
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


  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      data: { ...strapiFields, ...additionalFields }, 
      message: "Ha habido un problema",
    }
  }

  if (responseData.error) {
  console.log(responseData.error);
  return {
    ...prevState,
    strapiErrors: {
      message: responseData.error.message,
      name: responseData.error.name || "Error",
      status: responseData.error.status?.toString() || null,
    },
    zodErrors: null,
    data: { ...strapiFields, ...additionalFields },
    message: "Hubo un fallo en el registro",
  };
}


  const cookieStore = await cookies()
  cookieStore.set("jwt", responseData.jwt, config)

  redirect("/")
}

