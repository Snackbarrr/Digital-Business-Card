import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // cache optimized variants for a long time
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/spurofthemoment/**',
      },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      
    ],
  },
  experimental: {
    turbopackScopeHoisting: false,
  },
};

export default nextConfig;
