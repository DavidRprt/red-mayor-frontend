import Head from "next/head"

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>¿Quiénes somos? | Nuestra Empresa</title>
        <meta
          name="description"
          content="Conoce quiénes somos: más de 30 años de experiencia en importación, comercialización, distribución y logística de primeras marcas."
        />
      </Head>

      <section className="bg-white min-h-screen text-gray-900">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl font-semibold sm:text-5xl leading-tight">
              ¿Quiénes somos?
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 30 años de experiencia en importación, comercialización,
              distribución y logística de primeras marcas.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-16">
            {/* Nuestra Historia */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Nuestra Historia</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Somos una empresa liderada por un equipo con más de 30 años de
                experiencia en importación, comercialización, distribución y
                logística de primeras marcas. Hemos desarrollado programas de
                lanzamientos de productos, posicionamiento de marcas, servicios
                y cobertura física que impulsan los negocios a un nivel
                superior.
              </p>
            </section>

            {/* ¿Por qué elegirnos? */}
            <section>
              <h2 className="text-2xl font-medium mb-4">¿Por qué elegirnos?</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Ofrecemos buenos productos a buenos precios, contamos con
                disponibilidad de stock, mantenemos ofertas destacadas y
                contamos con la posibilidad de entrega en todo el país.
              </p>
            </section>

            {/* Nuestra Misión */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Nuestra misión</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Brindar a nuestros clientes la mejor opción de abastecimiento de
                productos y servicios, manteniendo un enfoque en la generación
                de buenos negocios, fomentando la excelencia en el servicio, la
                confianza de nuestros clientes y el desarrollo continuo de
                oportunidades.
              </p>
            </section>

            {/* Nuestra Visión */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Nuestra visión</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Ser un socio estratégico para el abastecimiento de productos y
                servicios a empresas, retails e instituciones que genere un
                crecimiento sostenido basado en la innovación, la eficiencia y
                la construcción de relaciones de largo plazo.
              </p>
            </section>

            {/* Nuestros Valores */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Nuestros valores</h2>
              <ul className="space-y-4 text-lg text-gray-700 leading-relaxed list-disc pl-6">
                <li>
                  Fomentamos un ámbito de trabajo colaborativo y eficiente, que
                  permita el desarrollo de las personas y del trabajo en equipo.
                </li>
                <li>
                  Somos confiables y respetuosos de nuestros clientes y
                  proveedores.
                </li>
                <li>
                  Actuamos con integridad para mantener una relación productiva
                  con las instituciones y la comunidad.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
