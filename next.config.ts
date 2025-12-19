import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images :{
    domains:["res.cloudinary.com", "twoguysprod.s3.eu-north-1.amazonaws.com"]
  },
  reactStrictMode: true,
  trailingSlash: true,

};

export default nextConfig;
