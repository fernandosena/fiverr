/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: "http://localhost:3001",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
};

export default nextConfig;
