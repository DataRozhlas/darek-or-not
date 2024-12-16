/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/cukrovi-or-not",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
