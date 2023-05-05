const resources = [
  'users',
  'vehicles',
  'driver',
  'devices',
  'geofences',
  'trips-history',
  'vehicles-events',
];

const resourcesRedirects = resources.map(resource => ({
  source: `/dashboard/${resource}`,
  destination: `/dashboard/${resource}/list`,
  permanent: true,
}));

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

  redirects: () => resourcesRedirects,
};
