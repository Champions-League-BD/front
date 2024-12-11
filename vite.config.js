import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Substitua pela URL do backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove o prefixo ao enviar para o backend
      },
    },
  },
});
