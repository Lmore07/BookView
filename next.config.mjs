import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config({
  path: `${
    process.env.NODE_ENV == "development" ? "./.env.development" : "./.env"
  }`,
});
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
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
