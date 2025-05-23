import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 5174,
    proxy: {
      '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          secure: false,      
          rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  preview: {
    host: true,
    port: 3000,
    proxy: {
        '/api': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ''),
        },
    },
  }
})
