import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            '/api': { // Passe den Proxy-Pfad spezifischer an
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Entferne '/api'
            },
        },
        watch: {
            usePolling: true, // Falls das Dateisystem Probleme macht
        },
    },
    plugins: [react()],
});
