/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
