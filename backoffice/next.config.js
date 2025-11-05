/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
    images: {
    domains: ['edumatch.s3.ap-southeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
