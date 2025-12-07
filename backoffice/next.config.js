const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['edumatch.s3.ap-southeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
