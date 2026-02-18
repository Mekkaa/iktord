const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.svenskalag.se",
      },
      {
        protocol: "https",
        hostname: "datocms-assets.com",
      },
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
    ],
  },
};

module.exports = nextConfig;
