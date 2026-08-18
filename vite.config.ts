import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path is configurable so the same source deploys to either GitHub Pages layout:
//   USERNAME.github.io          -> base '/'            (default, no env needed)
//   USERNAME/<repo>             -> base '/<repo>/'     (set VITE_BASE=/<repo>/)
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['motion'],
        },
      },
    },
  },
})
