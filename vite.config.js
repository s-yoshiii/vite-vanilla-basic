import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
const { resolve } = require("path");
const root = "src";
export default defineConfig({
  root: root,
  base: "/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, root, "index.html"),
        page: resolve(__dirname, root, "page/index.html"),
      },
    },
  },
  sourcemap: process.env.NODE_ENV !== "production",
  server: {
    port: 8000,
    open: true,
  },
  plugins: [
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    },
  },
});
