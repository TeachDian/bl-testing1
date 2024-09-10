/** @type {import("next").NextConfig} */
require("dotenv").config({
  path: "../../.env",
});

module.exports = {
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: `${process.env.API_URL}/assets/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      }
    ];
  },
  env: {
    API_URL: process.env.API_URL,
  },
};
