/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env : {
    "BASE_URL" : "https://chatapp-alighdeveloper.vercel.app/api"
  }
}

module.exports = nextConfig
