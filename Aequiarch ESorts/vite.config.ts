import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
export default defineConfig({
  base: "/aarya890/Aequarch-Esports/blob/main/Aequiarch%20ESorts", // Replace with your repo name
});
