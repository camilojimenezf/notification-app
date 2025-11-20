import path from "path";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@admin": path.resolve(__dirname, "./src/modules/admin"),
      "@dashboard": path.resolve(__dirname, "./src/modules/dashboard"),
      "@notification": path.resolve(__dirname, "./src/modules/notification"),
    },
  },
});
