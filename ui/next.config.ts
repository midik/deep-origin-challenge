import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // todo remove this as after fixing swagger @ApiProperty type issue
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
