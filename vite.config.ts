import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  define: {
    'import.meta.env.APPS_SCRIPT_URL': JSON.stringify(process.env.APPS_SCRIPT_URL),
  },
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
