/**
 * 因为 Figma 的 Plugin 要求 js 和 css 这一系列文件必须打包成一个大的文件，
 * 所以采用 vite 的一个单文件打包插件，但是这个插件不能支持 vite 的多入口设置
 * 所以这里分成了两个 vite config ，分两次 build ，一次 build VUE ，一次 build Figma
*/
import { defineConfig } from 'vite'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false, // 不要清空 dist 目录
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        figma: resolve(__dirname, 'src/figma/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  }
})
