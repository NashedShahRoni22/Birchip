/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "birchip.nsrdev.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
