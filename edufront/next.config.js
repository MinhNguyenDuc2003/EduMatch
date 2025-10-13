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
    ],
  },
};

module.exports = withNextIntl(nextConfig);
