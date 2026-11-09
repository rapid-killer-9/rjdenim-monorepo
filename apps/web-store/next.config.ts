import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@rjdenim/shared-types'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

export default nextConfig;
