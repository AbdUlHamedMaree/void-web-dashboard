const resources = [
  'users',
  'vehicles',
  'driver',
  'devices',
  'geofences',
  'trips-history',
  'vehicles-events',
];

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

  redirects: async () =>
    resources.map(resource => ({
      source: `/dashboard/${resource}`,
      destination: `/dashboard/${resource}/list`,
      permanent: true,
    })),
};
