/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PAYSTACK_KEY: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  },
};

module.exports = nextConfig;
