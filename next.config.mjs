import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module context
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    experimental: {
        appDir: join(__dirname, 'src/app'),
    },
};

export default nextConfig;


