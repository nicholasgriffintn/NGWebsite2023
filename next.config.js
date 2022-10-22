/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    domains: [
      'localhost',
      'nicholasgriffin.dev',
      'api.nicholasgriffin.dev',
      'cdn.nicholasgriffin.dev',
      'images.nicholasgriffin.dev',
      'media.giphy.com',
      'media0.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com',
      'media5.giphy.com',
      'lastfm.freetls.fastly.net',
      'i.ibb.co',
      'via.placeholder.com',
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
