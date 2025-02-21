import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalong',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/api/:path*' // 代理目标地址
            },
        ]
    }
};
export default nextConfig;
