const { StatusCodes } = require('http-status-codes');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  runtimeCaching,
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
        statusCode: StatusCodes.PERMANENT_REDIRECT,
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
