import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'es5urvh1np.ufs.sh' }],
  },
};

const withNextIntl = createNextIntlPlugin();
export const nextIntlConfig = withNextIntl(nextConfig);
