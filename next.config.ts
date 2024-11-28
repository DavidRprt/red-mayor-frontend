import type { NextConfig } from "next"
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
const apiHost = new URL(apiBaseUrl).hostname

const nextConfig: NextConfig = {
  images: {
    domains: [apiHost], 
  },
}

export default nextConfig
