/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ui/auth', 
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
