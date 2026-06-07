import { execSync } from "child_process";
import type { NextConfig } from "next";

function getGitInfo() {
  try {
    const commitHash = execSync("git rev-parse --short HEAD")
      .toString()
      .trim();

    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();

    return {
      commitHash,
      branch,
    };
  } catch {
    return {
      commitHash: "unknown",
      branch: "unknown",
    };
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_HASH: getGitInfo().commitHash,
    NEXT_PUBLIC_GIT_BRANCH: getGitInfo().branch
  },

  images: {
    remotePatterns: [
      { hostname: "hfnzmziajwmomwiinbdn.supabase.co", protocol: "https" }
    ]
  }
};

export default nextConfig;
