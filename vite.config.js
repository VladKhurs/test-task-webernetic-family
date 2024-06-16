import { defineConfig } from 'vite';
import autoprefixer from "autoprefixer";
import path from "path";
import glob from "glob";
import { fileURLToPath } from "node:url";

const rootValue       = path.resolve(__dirname, 'src');
const publicDirValue  = path.resolve(__dirname, 'public');
const outDirValue     = path.resolve(__dirname, 'dist');

export default defineConfig({
  root: rootValue,
  base: './',
  publicDir: publicDirValue,
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    outDir: outDirValue,
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync(path.resolve(rootValue, "*.html")).map(file => [
          path.relative(rootValue, file.slice(0, file.length - path.extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
      },
    },
  },
  plugins:[],
  resolve: {
    alias: {
    }
  }
});