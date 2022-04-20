import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
export default defineConfig({
  root: "src",
  base: "/",
  build: {
    outDir: "../dist",
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
