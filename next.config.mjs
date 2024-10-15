/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.dubai.com',
          },
        ],
    },
};

export default nextConfig;
