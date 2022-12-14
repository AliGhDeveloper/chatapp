/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env : {
    "BASE_URL" : "https://chatapp-alighdeveloper.vercel.app/api",
    "NEXT_PUBLIC_KEY" : "56777936e68f167c767b"
  }
}

module.exports = nextConfig
