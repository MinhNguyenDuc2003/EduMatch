const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  basePath: '/backoffice',
  images: {
    domains: ['edumatch.s3.ap-southeast-1.amazonaws.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
