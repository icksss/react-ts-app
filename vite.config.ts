import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
      '/login': {
        target: 'http://localhost:8080',
      },
      '/reissue': {
        target: 'http://localhost:8080',
      },
      '/logout': {
        target: 'http://localhost:8080',
      },
    },
  },
})
