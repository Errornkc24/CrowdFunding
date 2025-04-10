/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:  ['ipfs.alchemy.com', 'th.bing.com', 'crowdfunding.infura-ipfs.io']
   }
}

module.exports = nextConfig
