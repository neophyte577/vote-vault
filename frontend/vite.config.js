import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 42069,
    proxy: {
      '/download': {
      target: 'http://localhost:8008',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/download/, '/download')
      },
    },
  },
});