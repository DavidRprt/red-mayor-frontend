interface StrapiErrorsProps {
  message: string | null
  name: string
  status: string | null
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null

  const getTranslatedMessage = (message: string) => {
    if (message === "Email or Username are already taken") {
      return "El correo o el nombre de negocio ya están en uso"
    }
    return message
  }

  return (
    <div className="text-red-500 text-md py-2">
      {getTranslatedMessage(error.message)}
    </div>
  )
}
