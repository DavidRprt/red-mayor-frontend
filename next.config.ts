import type { NextConfig } from "next"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
const apiHost = new URL(apiBaseUrl).hostname

const nextConfig: NextConfig = {
  images: {
    domains: [apiHost], // Permite cargar imágenes desde el dominio del backend
  },
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: `${apiBaseUrl}/admin/:path*`, // Redirige a la ruta de admin del backend
      },
    ]
  },
}

export default nextConfig
