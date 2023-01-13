const resources = ['users'];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      ...resources.map(resource => ({
        source: `/dashboard/${resource}`,
        destination: `/dashboard/${resource}/list`,
        permanent: true,
      })),
    ];
  },
};
