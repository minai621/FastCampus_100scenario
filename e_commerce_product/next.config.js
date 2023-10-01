/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
