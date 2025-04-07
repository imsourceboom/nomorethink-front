import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/**',
            },
        ],
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), { "telegram-web-app": "window.Telegram" }];
        return config;
    },
};

export default nextConfig;
