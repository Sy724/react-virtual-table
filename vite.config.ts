import {defineConfig, normalizePath} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/table',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      additionalData: '@import "@/style/global.scss";',
    }
  },
  resolve: {
    alias: {
      // normalizePath 踊跃解决 windows 下的路径问题
      '@/': normalizePath(path.resolve(__dirname, '/src'))
    }
  }
})
