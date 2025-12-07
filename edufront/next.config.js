// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  basePath: '/edufront',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'es5urvh1np.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'cl2h8yilb0.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'edumatch.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
