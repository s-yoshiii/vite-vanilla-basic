import { defineConfig } from "vite";
import glob from "glob";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";
const root = "src";
export default defineConfig({
  root: root,
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync("**/*.{js,scss}", {
            ignore: "**/_**/**/*.{js,scss}",
            cwd: `./src`,
          })
          .map((file) => {
            console.log(file);
            const { dir, name } = path.parse(file);
            return [`${dir}/${name}`, path.resolve("src", file)];
          })
      ),
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          } else if (/woff|woff2|s?css/.test(extType)) {
            extType = "css";
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
    },
  },
  sourcemap: process.env.NODE_ENV !== "production",
  server: {
    port: 8000,
    open: true,
  },
  plugins: [
    // legacy({
    //   targets: ["ie >= 11"],
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    //   polyfills: false,
    // }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `$injectedColor: orange;`,
  //     },
  //   },
  // },
});
