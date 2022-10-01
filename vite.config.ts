import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  publicDir: './src/ui/public',
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    sourcemap: 'inline',
    rollupOptions: {
      inlineDynamicImports: false,
      input: {
        ui: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  }
})
