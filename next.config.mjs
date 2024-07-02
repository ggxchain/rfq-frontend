/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, {isServer}) => {
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
            layers: true
        };

        // Add wasm as an asset type
        config.module.rules.push({
            test: /\.wasm$/,
            type: "asset/resource"
        });

        return config;
    },
};

export default nextConfig;
