/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env : {
    "BASE_URL" : "https://chatapp-three-xi.vercel.app/api"
  }
}

module.exports = nextConfig
