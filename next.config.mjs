import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
