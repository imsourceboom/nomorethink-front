import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['via.placeholder.com'], // 허용할 도메인 추가
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), { "telegram-web-app": "window.Telegram" }];
        return config;
    },
};

export default nextConfig;
