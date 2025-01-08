import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5173, // Entwicklungsport für Vite
        proxy: {
            '/': 'http://localhost:3000', // Leitet API-Anfragen an das Backend weiter
        },
    },
    plugins: [react()],
});
