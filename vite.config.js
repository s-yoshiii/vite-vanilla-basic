import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  root: "src",
  build: {
    outDir: "/dist",
  },

  server: {
    port: 8000,
    open: true,
  },
});
