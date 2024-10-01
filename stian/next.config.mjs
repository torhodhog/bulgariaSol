/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['nb', 'en'], // Norsk (bokmål) og engelsk
    defaultLocale: 'nb',    // Setter norsk som standard lokalisering
  },
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com'],
  },
  reactStrictMode: true, // Dette kan hjelpe deg med å fange opp feil under utvikling
};

export default nextConfig;
