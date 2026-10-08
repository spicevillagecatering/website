/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old multi-page site URLs → sections of the new single-page site (keeps Google rankings/bookmarks)
  async redirects() {
    return [
      { source: '/about',    destination: '/#about',     permanent: true },
      { source: '/services', destination: '/#services',  permanent: true },
      { source: '/menu',     destination: '/#menu',      permanent: true },
      { source: '/gallery',  destination: '/#gallery',   permanent: true },
      { source: '/kitchen',  destination: '/#gallery',   permanent: true },
      { source: '/contact',  destination: '/#contact',   permanent: true },
      { source: '/custom-menu', destination: '/#menu', permanent: true },
      { source: '/blog',     destination: '/',           permanent: true },
      { source: '/index.html', destination: '/',         permanent: true },
    ];
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
