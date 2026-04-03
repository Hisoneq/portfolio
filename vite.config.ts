import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Локально: /portfolio/ (или задайте VITE_BASE_PATH).
// CI: в GitHub Actions передаётся VITE_BASE_PATH=/имя-репозитория/
function appBase(): string {
  const fromEnv = process.env.VITE_BASE_PATH?.trim()
  if (fromEnv) {
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`
  }
  return '/portfolio/'
}

// https://vitejs.dev/config/
export default defineConfig({
  base: appBase(),
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion'
        },
      },
    },
  },
})
