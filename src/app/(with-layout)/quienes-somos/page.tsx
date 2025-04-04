import Head from "next/head"
import Image from "next/image"

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>¿Quiénes somos? | Red X Mayor</title>
        <meta
          name="description"
          content="Conoce quiénes somos: una empresa con más de 30 años de experiencia en importación, comercialización, distribución y logística de primeras marcas."
        />
      </Head>

      {/* Banner Superior con Logo */}

      <section className="bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-8">
          {/* Header */}
          <header className="text-center mb-6 md:mb-10">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/red-mayor-logo.svg"
                alt="Red X Mayor Logo"
                width={800}
                height={200}
                priority
              />
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl leading-tight text-gray-900">
              ¿Quiénes somos?
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Más de 30 años de experiencia en importación, comercialización,
              distribución y logística de primeras marcas, brindando soluciones
              eficientes y oportunidades de negocio a nuestros clientes.
            </p>
          </header>

          {/* Contenido Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Nueva Sección Reemplazando 'Nuestra Historia' */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Nuestro Compromiso
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Brindamos a nuestros clientes la mejor opción de abastecimiento
                de productos y servicios, con un enfoque en la generación de
                buenos negocios, fomentando la confianza y el desarrollo
                continuo de oportunidades.
              </p>
            </section>

            {/* ¿Por qué elegirnos? */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Contamos con un amplio catálogo de productos a precios
                competitivos, stock disponible, ofertas destacadas y envíos
                rápidos a todo el país.
              </p>
            </section>

            {/* Nuestra Misión */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Nuestra Misión
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                Ser el mejor aliado de nuestros clientes, brindando soluciones
                integrales de abastecimiento con eficiencia, confianza y
                excelencia en el servicio.
              </p>
            </section>

            {/* Nuestra Visión */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Nuestra Visión
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                Convertirnos en un referente en la comercialización mayorista,
                impulsando el crecimiento del sector a través de la innovación y
                la construcción de relaciones estratégicas a largo plazo.
              </p>
            </section>
          </div>

          {/* Nuestros Valores */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 ">
              <div className=" p-6 rounded-lg  text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confianza
                </h3>
                <p className="text-gray-700 mt-2">
                  Nos destacamos por la transparencia y el compromiso en cada
                  operación.
                </p>
              </div>

              <div className=" p-6 rounded-lg  text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Innovación
                </h3>
                <p className="text-gray-700 mt-2">
                  Buscamos nuevas formas de optimizar la experiencia de compra
                  mayorista.
                </p>
              </div>

              <div className=" p-6 rounded-lg  text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Compromiso
                </h3>
                <p className="text-gray-700 mt-2">
                  Nuestro equipo trabaja con pasión para ofrecer siempre el
                  mejor servicio.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default AboutPage
