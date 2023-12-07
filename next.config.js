/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/darek-or-not",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
