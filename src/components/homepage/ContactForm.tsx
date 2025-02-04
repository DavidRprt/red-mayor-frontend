"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import contactFormSchema from "@/schemas/contactFormSchema"
import { useState } from "react"

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  )

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/formularios/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        throw new Error("Error al enviar el formulario")
      }

      setSubmitStatus("success")
      form.reset()
    } catch (error) {
      console.error("Error enviando el formulario:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex-col flex sm:flex-row py-4 sm:py-8 sm:px-24 w-full items-start justify-between">
      {/* Información de contacto */}
      <div className="flex flex-col px-6 space-y-4 p-6 max-w-1/2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          ¿Tienes alguna pregunta?
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Contáctanos con tus dudas o inquietudes. Nuestro equipo estará
          encantado de ayudarte.
        </p>
        <p className="text-gray-600 leading-relaxed hidden sm:block">
          Completa el formulario o comunícate con nosotros directamente:
        </p>

        {/* Correo electrónico y teléfono */}
        <div className="text-gray-800 text-lg space-y-2 mt-4">
          <p className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-700" />
            <span>contacto@redxmayor.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-gray-700" />
            <span>+54 9 341 671 2802</span>
          </p>
        </div>
      </div>

      {/* Formulario de contacto */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full px-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Nombre
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Correo Electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                    className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Mensaje
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe tu mensaje aquí"
                    {...field}
                    className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Teléfono{" "}
                  <span className="text-sm text-gray-500">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123-456-7890"
                    {...field}
                    className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="w-full py-4 dark text-white hover:text-gray-200 sm:h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
          {submitStatus === "success" && (
            <p className="text-green-500 text-sm mt-2">
              ¡Formulario enviado correctamente! Nos pondremos en contacto
              contigo pronto.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-500 text-sm mt-2">
              Hubo un error al enviar el formulario. Por favor, intenta de
              nuevo.
            </p>
          )}
        </form>
      </Form>
    </section>
  )
}
