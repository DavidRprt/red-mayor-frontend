

export const menuConfig = {
  categories: {
    title: "Nuestros Productos",
    items: [
      {
        title: "Electrónica",
        href: "/productos/categoria/electronica",
        description: "Tecnología y accesorios",
      },
      {
        title: "Bienestar y Lifestyle",
        href: "/productos/categoria/bienestar",
        description: "Salud, fitness y hogar",
      },
      {
        title: "Electrodomésticos",
        href: "/productos/categoria/electrodomesticos",
        description: "Pequeños y grandes equipos",
      },
      {
        title: "Arte y Librería",
        href: "/productos/categoria/arte-y-libreria",
        description: "Materiales y escritura",
      },
      {
        title: "Automotor",
        href: "/productos/categoria/automotor",
        description: "Accesorios y mantenimiento",
      },
      {
        title: "Todos los productos",
        href: "/productos",
        description: "Ver catálogo completo",
      },
    ],
  },
  brands: {
    title: "Explora por Marca",
    items: [
      {
        title: "Energizer",
        href: "/productos/marca/energizer",
        description:
          "Productos confiables para mantener tus dispositivos cargados siempre.",
      },
      {
        title: "Eveready",
        href: "/productos/marca/eveready",
        description:
          "Eveready, energía confiable para iluminar cada momento de tu vida.",
      },
      {
        title: "Contigo",
        href: "/productos/marca/contigo",
        description: "Mantén tus bebidas a la temperatura ideal.",
      },
    ],
  },
  otherLinks: [
    { title: "Ofertas Destacadas", href: "/productos/ofertas" },
    { title: "Quienes Somos", href: "/quienes-somos" },
  ],
}

export const brands = [
  {
    id: 1,
    attributes: {
      name: "Energizer",
      slug: "energizer",
      image: "/logos/Energizer-logo.jpg",
    },
  },
  {
    id: 2,
    attributes: {
      name: "Eveready",
      slug: "eveready",
      image: "/logos/Eveready-logo.jpg",
    },
  },
  {
    id: 3,
    attributes: {
      name: "Contigo",
      slug: "contigo",
      image: "/logos/contigo-logo.png",
    },
  },
]

export const featuredBrands = [
    {
      slug: "energizer",
      title: "Energizer",
      image: "/energizer-header.jpg",
      description:
        "Energizer, líder en soluciones de energía portátil, ofrece baterías y productos de carga confiables para todos tus dispositivos.",
    },
  ]