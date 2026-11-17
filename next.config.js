/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: isGitHubPages ? 'export' : undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? '/churrascoColombiano' : '',
  assetPrefix: isGitHubPages ? '/churrascoColombiano/' : '',
};

module.exports = nextConfig;
