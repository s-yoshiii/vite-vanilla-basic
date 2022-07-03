import { defineConfig } from "vite";
import glob from "glob";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";
const root = "src";
export default defineConfig({
  root: root,
  base: "/",
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      // JS,CSSのみコンパイルする場合
      // input: Object.fromEntries(
      //   glob
      //     .sync("**/*.{js,scss}", {
      //       ignore: "**/_**/**/*.{js,scss}",
      //       cwd: root,
      //     })
      //     .map((file) => {
      //       const { dir, name, ext } = path.parse(file);
      //       return [`${dir}/${name}`, path.resolve(root, file)];
      //     })
      // ),
      // HTMLベースに考える場合
      input: {
        index: path.resolve(__dirname, root, "index.html"),
        page: path.resolve(__dirname, root, "page/index.html"),
      },
      output: {
        // JS,CSSのみコンパイルする場合
        // assetFileNames: "[name][extname]",
        // HTMLベースに考える場合
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
        entryFileNames: "[name].js",
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
