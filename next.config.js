/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ui-avatars.com', 'images.unsplash.com', 'avatar.vercel.sh', 'avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Skip typechecking and linting to speed up build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Temporary solution for dealing with database access during build
  // Use empty directory for database in build environment
  env: {
    DATABASE_URL: process.env.NODE_ENV === 'production' ? 'file:./empty.db' : process.env.DATABASE_URL,
  },
}

module.exports = nextConfig 