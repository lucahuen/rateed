import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://rateed.onrender.com:10000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Entferne '/api'
            },
        },
        watch: {
            usePolling: true,
        },
    },
    plugins: [react()],
});
