"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Importa tu esquema de validación
import contactFormSchema from "@/schemas/contactFormSchema"

// Define los tipos basados en el esquema
type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  // Configuración del formulario con `useForm`
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
    },
  })

  // Manejador de envío
  const onSubmit = (values: ContactFormValues) => {
 
  }

  return (
    <section className="flex-col flex sm:flex-row py-4 sm:py-8 sm:px-24 w-full items-start justify-between ">
      <div className="flex flex-col px-6 space-y-4 p-6 max-w-1/2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          ¿Tienes alguna pregunta?
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          voluptatibus at, minima esse atque deleniti. Cumque nihil atque,
          placeat ut eaque fuga reprehenderit commodi in sit quaerat! Illum,
          laborum libero!
        </p>
        <p className="text-gray-600 leading-relaxed hidden sm:block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          voluptatibus at, minima esse atque deleniti. Cumque nihil atque,
          placeat ut eaque fuga reprehenderit commodi in sit quaerat! Illum
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full px-6 "
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
          >
            Enviar
          </Button>
        </form>
      </Form>
    </section>
  )
}
