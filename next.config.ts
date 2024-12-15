import type { NextConfig } from "next"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""

const nextConfig: NextConfig = {
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
