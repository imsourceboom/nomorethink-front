/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // 프로덕션 빌드 시 타입 체크를 비활성화합니다.
        // 개발 중에는 타입 체크가 여전히 작동합니다.
        ignoreBuildErrors: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'Cache-Control', value: 'no-store, must-revalidate' },
                    { key: 'Pragma', value: 'no-cache' },
                    { key: 'Expires', value: '0' }
                ]
            }
        ];
    }
}

module.exports = nextConfig 