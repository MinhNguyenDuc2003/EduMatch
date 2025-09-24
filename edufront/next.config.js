// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
     outputFileTracingRoot: __dirname,
};

console.log("👉 Next.js đang chạy ở thư mục:", process.cwd());

module.exports = withNextIntl(nextConfig);
