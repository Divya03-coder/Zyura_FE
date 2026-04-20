import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/biodigital-oauth": {
        target: "https://apis.biodigital.com/oauth2/v2",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/biodigital-oauth/, ""),
      },
      "/biodigital-v2": {
        target: "https://apis.biodigital.com/services/v2",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/biodigital-v2/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
