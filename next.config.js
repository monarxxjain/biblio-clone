// import {withNextIntl} from 'next-intl/plugin'
// import {withPWA} from 'next-pwa'
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();



const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
/** @type {import('next').NextConfig} */

const nextConfig = withPWA({
  reactStrictMode:
   true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // i18n: {
  //   locales: ['en', 'ja'],
  //   defaultLocale: 'en'
  // },
  async rewrites () {
    return [
      {
        source: '/img',
        destination: 'https://wsrv.nl/'
      }
    ]
  }
})
module.exports = withNextIntl(nextConfig);
// export default nextintlconfig(nextConfig)
