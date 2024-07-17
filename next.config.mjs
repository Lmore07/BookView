import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config({
  path: `${
    process.env.NODE_ENV == "development" ? "./.env.development" : "./.env"
  }`,
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
        protocol: "https",
      },
    ],
  },
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "vacio",
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY || "vacio",
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID || "vacio",
    REACT_APP_MESSAGING_SENDER_ID:
      process.env.REACT_APP_MESSAGING_SENDER_ID || "vacio",
    REACT_APP_APP_ID: process.env.REACT_APP_APP_ID || "vacio",
    HG_API_KEY: process.env.HG_API_KEY || "vacio",
    E_LABS_API_KEY: process.env.E_LABS_API_KEY || "vacio",
    E_LABS_VOICE: process.env.E_LABS_VOICE || "vacio",
    API_KEY_GEMINI: process.env.API_KEY_GEMINI || "vacio",
    MODEL_GEMINI: process.env.MODEL_GEMINI || "gemini-1.5-flash",
    ADMIN_MAIL: process.env.ADMIN_MAIL || "vacio",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "vacio",
    ADMIN_NAME: process.env.ADMIN_NAME || "vacio",
    ADMIN_LASTNAME: process.env.ADMIN_LASTNAME || "vacio",
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
};

export default nextConfig;
